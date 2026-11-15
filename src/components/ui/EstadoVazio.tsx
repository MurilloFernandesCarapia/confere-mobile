import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props = {
  icone: ComponentProps<typeof Ionicons>["name"];
  titulo: string;
  descricao: string;
};

const EstadoVazio = ({ icone, titulo, descricao }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  return (
    <View style={styles.container}>
      <Ionicons name={icone} size={56} color={colors.textLight} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      gap: 8,
      paddingVertical: 40,
      paddingHorizontal: 16,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
      textAlign: "center",
    },
    descricao: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      lineHeight: tamanho(23),
      color: colors.textSecondary,
      textAlign: "center",
    },
  });

export default EstadoVazio;
