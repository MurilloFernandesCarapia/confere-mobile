import { StyleSheet, Switch, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props = {
  titulo: string;
  descricao: string;
  valor: boolean;
  onAlterar: (valor: boolean) => void;
};

const OpcaoAlternavel = ({ titulo, descricao, valor, onAlterar }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  return (
    <View style={styles.container}>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>

      <Switch
        accessibilityLabel={titulo}
        accessibilityHint={descricao}
        value={valor}
        onValueChange={onAlterar}
        trackColor={{ false: colors.border, true: colors.secondary }}
        thumbColor={colors.background}
      />
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      minHeight: 64,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    textos: {
      flex: 1,
      gap: 2,
    },
    titulo: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(17),
      color: colors.text,
    },
    descricao: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(14),
      color: colors.textSecondary,
    },
  });

export default OpcaoAlternavel;
