import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho } from "@/providers/ThemeProvider";

type Props = PropsWithChildren<{
  titulo: string;
}>;

const Secao = ({ titulo, children }: Props) => {
  const styles = useThemedStyles(criarEstilos);

  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo} accessibilityRole="header">
        {titulo}
      </Text>
      {children}
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    cartao: {
      gap: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
      padding: 20,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(18),
      color: colors.text,
    },
  });

export default Secao;
