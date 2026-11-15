import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props = {
  tipo: "erro" | "sucesso";
  mensagem: string;
};

const Aviso = ({ tipo, mensagem }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  return (
    <View
      style={[styles.container, tipo === "erro" ? styles.erro : styles.sucesso]}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      <Ionicons
        name={tipo === "erro" ? "alert-circle" : "checkmark-circle"}
        size={24}
        color={tipo === "erro" ? colors.error : colors.secondary}
      />
      <Text
        style={[
          styles.texto,
          { color: tipo === "erro" ? colors.error : colors.secondary },
        ]}
      >
        {mensagem}
      </Text>
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 14,
      padding: 14,
    },
    erro: {
      backgroundColor: colors.errorLight,
    },
    sucesso: {
      backgroundColor: colors.secondaryLight,
    },
    texto: {
      flex: 1,
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(15),
    },
  });

export default Aviso;
