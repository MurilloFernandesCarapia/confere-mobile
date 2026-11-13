import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props = {
  texto: string;
  marcada: boolean;
  onAlterar: (marcada: boolean) => void;
};

const CaixaDeSelecao = ({ texto, marcada, onAlterar }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={texto}
      accessibilityState={{ checked: marcada }}
      style={styles.container}
      onPress={() => onAlterar(!marcada)}
    >
      <Ionicons
        name={marcada ? "checkbox" : "square-outline"}
        size={28}
        color={marcada ? colors.secondary : colors.textSecondary}
      />
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    texto: {
      flex: 1,
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(16),
      color: colors.text,
    },
  });

export default CaixaDeSelecao;
