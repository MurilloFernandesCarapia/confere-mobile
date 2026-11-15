import { Pressable, StyleSheet, Text } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho } from "@/providers/ThemeProvider";

type Props = {
  rotulo: string;
  selecionado: boolean;
  onPress: () => void;
};

const Chip = ({ rotulo, selecionado, onPress }: Props) => {
  const styles = useThemedStyles(criarEstilos);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={rotulo}
      accessibilityState={{ selected: selecionado }}
      style={[styles.chip, selecionado && styles.chipSelecionado]}
      onPress={onPress}
    >
      <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>
        {rotulo}
      </Text>
    </Pressable>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    chip: {
      minHeight: 48,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 999,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
    },
    chipSelecionado: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    texto: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(15),
      color: colors.text,
    },
    textoSelecionado: {
      color: colors.textOnPrimary,
    },
  });

export default Chip;
