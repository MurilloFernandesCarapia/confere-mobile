import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props = {
  titulo: string;
  icone: ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
};

const ItemDeMenu = ({ titulo, icone, onPress }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={titulo}
      style={({ pressed }) => [styles.item, pressed && styles.pressionado]}
      onPress={onPress}
    >
      <Ionicons name={icone} size={24} color={colors.link} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Ionicons name="chevron-forward" size={22} color={colors.textLight} />
    </Pressable>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    item: {
      minHeight: 64,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: 20,
      backgroundColor: colors.surface,
      paddingHorizontal: 20,
    },
    pressionado: {
      opacity: 0.7,
    },
    titulo: {
      flex: 1,
      fontFamily: Fonts.bold,
      fontSize: tamanho(17),
      color: colors.text,
    },
  });

export default ItemDeMenu;
