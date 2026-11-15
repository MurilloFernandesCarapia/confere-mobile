import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props<TFormData extends FieldValues> = {
  name: FieldPath<TFormData>;
  control: Control<TFormData>;
};

function SeletorImagem<TFormData extends FieldValues>({
  name,
  control,
}: Props<TFormData>) {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const [avisoPermissao, setAvisoPermissao] = useState<string | null>(null);

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  function usarImagem(resultado: ImagePicker.ImagePickerResult) {
    if (resultado.canceled) {
      return;
    }

    const imagem = resultado.assets[0];

    onChange({
      uri: imagem.uri,
      nome: imagem.fileName ?? "mensagem.jpg",
      tipo: imagem.mimeType ?? "image/jpeg",
      tamanho: imagem.fileSize ?? 0,
    });
  }

  async function tirarFoto() {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      setAvisoPermissao(
        "Para tirar a foto, permita o uso da câmera nas configurações do celular."
      );
      return;
    }

    setAvisoPermissao(null);
    usarImagem(
      await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        quality: 0.7,
      })
    );
  }

  async function escolherDaGaleria() {
    setAvisoPermissao(null);
    usarImagem(
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 0.7,
      })
    );
  }

  return (
    <View style={styles.container}>
      {value ? (
        <View style={styles.previa}>
          <Image
            source={{ uri: value.uri }}
            style={styles.imagem}
            accessibilityLabel="Imagem escolhida para conferir"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tirar a imagem"
            style={styles.remover}
            onPress={() => onChange(null)}
          >
            <Ionicons name="close" size={24} color={colors.textOnPrimary} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.botoes}>
          <View style={styles.botao}>
            <Botao
              titulo="Tirar foto"
              icone="camera-outline"
              variante="contorno"
              onPress={tirarFoto}
            />
          </View>
          <View style={styles.botao}>
            <Botao
              titulo="Escolher print"
              icone="image-outline"
              variante="contorno"
              onPress={escolherDaGaleria}
            />
          </View>
        </View>
      )}

      {avisoPermissao !== null && (
        <Text style={styles.erro}>{avisoPermissao}</Text>
      )}

      {error?.message && <Text style={styles.erro}>{error.message}</Text>}
    </View>
  );
}

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    botoes: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    botao: {
      flexGrow: 1,
      flexBasis: 140,
    },
    previa: {
      alignSelf: "flex-start",
    },
    imagem: {
      width: 160,
      height: 220,
      borderRadius: 14,
      backgroundColor: colors.surface,
    },
    remover: {
      position: "absolute",
      top: -12,
      right: -12,
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.text,
    },
    erro: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.error,
    },
  });

export default SeletorImagem;
