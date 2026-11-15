import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useCanaisQuery } from "@/hooks/useCanaisQuery";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

const ICONES_DOS_CANAIS: Record<
  string,
  ComponentProps<typeof Ionicons>["name"]
> = {
  WHATSAPP: "logo-whatsapp",
  SMS: "chatbox-ellipses-outline",
  LIGACAO: "call-outline",
  EMAIL: "mail-outline",
  CARTA: "document-text-outline",
  REDE_SOCIAL: "people-outline",
};

type Props<TFormData extends FieldValues> = {
  name: FieldPath<TFormData>;
  control: Control<TFormData>;
};

function SeletorCanal<TFormData extends FieldValues>({
  name,
  control,
}: Props<TFormData>) {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const { data: canais, isLoading, isError, error, refetch } = useCanaisQuery();

  const {
    field: { onChange, value },
    fieldState: { error: erroDoCampo },
  } = useController({ name, control });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Por onde a mensagem chegou?</Text>

      {isLoading && <ActivityIndicator color={colors.primary} />}

      {isError && (
        <View style={styles.erroCarregar}>
          <Text style={styles.mensagem}>{traduzirErro(error)}</Text>
          <Botao
            titulo="Tentar de novo"
            variante="contorno"
            onPress={() => refetch()}
          />
        </View>
      )}

      <View style={styles.opcoes}>
        {canais?.map((canal) => {
          const selecionado = canal.codigo === value;

          return (
            <Pressable
              key={canal.codigo}
              accessibilityRole="radio"
              accessibilityLabel={canal.nome}
              accessibilityState={{ selected: selecionado }}
              style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
              onPress={() => onChange(canal.codigo)}
            >
              <Ionicons
                name={ICONES_DOS_CANAIS[canal.codigo] ?? "chatbubble-outline"}
                size={22}
                color={selecionado ? colors.textOnPrimary : colors.link}
              />
              <Text
                style={[
                  styles.opcaoTexto,
                  selecionado && styles.opcaoTextoSelecionado,
                ]}
              >
                {canal.nome}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {erroDoCampo?.message && (
        <Text style={styles.erro}>{erroDoCampo.message}</Text>
      )}
    </View>
  );
}

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    label: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(16),
      color: colors.text,
    },
    opcoes: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    opcao: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 999,
      backgroundColor: colors.surface,
      paddingHorizontal: 14,
    },
    opcaoSelecionada: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    opcaoTexto: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(15),
      color: colors.text,
    },
    opcaoTextoSelecionado: {
      color: colors.textOnPrimary,
    },
    erroCarregar: {
      gap: 8,
    },
    mensagem: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(15),
      color: colors.textSecondary,
    },
    erro: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.error,
    },
  });

export default SeletorCanal;
