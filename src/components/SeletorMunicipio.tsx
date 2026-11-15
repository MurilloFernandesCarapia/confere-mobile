import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useMunicipiosQuery } from "@/hooks/useMunicipiosQuery";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props<TFormData extends FieldValues> = {
  name: FieldPath<TFormData>;
  control: Control<TFormData>;
};

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function SeletorMunicipio<TFormData extends FieldValues>({
  name,
  control,
}: Props<TFormData>) {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");

  const {
    data: municipios,
    isLoading,
    isError,
    error,
    refetch,
  } = useMunicipiosQuery();

  const {
    field: { onChange, value },
    fieldState: { error: erroDoCampo },
  } = useController({ name, control });

  const selecionado = municipios?.find(
    (municipio) => municipio.codIbge === value
  );

  const filtrados = (municipios ?? []).filter((municipio) =>
    normalizar(`${municipio.nome} ${municipio.uf}`).includes(normalizar(busca))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cidade onde você mora</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          selecionado
            ? `Cidade: ${selecionado.nome}. Toque para trocar`
            : "Escolher a sua cidade"
        }
        style={[styles.campo, erroDoCampo && styles.campoErro]}
        onPress={() => setAberto(true)}
      >
        <Text style={selecionado ? styles.valor : styles.placeholder}>
          {selecionado
            ? `${selecionado.nome} - ${selecionado.uf}`
            : "Escolha a sua cidade"}
        </Text>
        <Ionicons name="chevron-down" size={22} color={colors.textSecondary} />
      </Pressable>

      {erroDoCampo?.message && (
        <Text style={styles.erro}>{erroDoCampo.message}</Text>
      )}

      <Modal
        visible={aberto}
        animationType="slide"
        onRequestClose={() => setAberto(false)}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.cabecalho}>
            <Text style={styles.tituloModal}>Escolha a sua cidade</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar"
              style={styles.fechar}
              onPress={() => setAberto(false)}
            >
              <Ionicons name="close" size={28} color={colors.text} />
            </Pressable>
          </View>

          <TextInput
            accessibilityLabel="Buscar cidade"
            style={styles.busca}
            placeholder="Digite o nome da cidade"
            placeholderTextColor={colors.textLight}
            value={busca}
            onChangeText={setBusca}
            autoFocus
          />

          {isLoading && (
            <ActivityIndicator
              style={styles.estado}
              size="large"
              color={colors.primary}
            />
          )}

          {isError && (
            <View style={styles.estado}>
              <Text style={styles.mensagem}>{traduzirErro(error)}</Text>
              <Botao
                titulo="Tentar de novo"
                variante="contorno"
                onPress={() => refetch()}
              />
            </View>
          )}

          <FlatList
            data={filtrados}
            keyExtractor={(municipio) => String(municipio.codIbge)}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              isLoading || isError ? undefined : (
                <Text style={[styles.mensagem, styles.estado]}>
                  Nenhuma cidade encontrada.
                </Text>
              )
            }
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${item.nome}, ${item.uf}`}
                style={styles.item}
                onPress={() => {
                  onChange(item.codIbge);
                  setBusca("");
                  setAberto(false);
                }}
              >
                <Text style={styles.itemTexto}>
                  {item.nome} - {item.uf}
                </Text>
                {item.codIbge === value && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.secondary}
                  />
                )}
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 6,
    },
    label: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(15),
      color: colors.text,
    },
    campo: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
    },
    campoErro: {
      borderColor: colors.error,
    },
    valor: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.text,
    },
    placeholder: {
      flex: 1,
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.textLight,
    },
    erro: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.error,
    },
    modal: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    cabecalho: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
    },
    tituloModal: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(22),
      color: colors.text,
    },
    fechar: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    busca: {
      minHeight: 52,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.text,
      marginBottom: 8,
    },
    estado: {
      marginTop: 24,
      gap: 12,
    },
    mensagem: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      color: colors.textSecondary,
      textAlign: "center",
    },
    item: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    itemTexto: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(17),
      color: colors.text,
    },
  });

export default SeletorMunicipio;
