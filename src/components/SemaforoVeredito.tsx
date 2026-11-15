import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { VEREDITOS } from "@/constants/Vereditos";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type { Veredito } from "@/schemas/api/verificacao.api.schema";

type Props = {
  veredito: Veredito;
  score?: number | null;
  tipoGolpe?: string | null;
};

const SemaforoVeredito = ({ veredito, score, tipoGolpe }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const info = VEREDITOS[veredito];
  const mostrarRisco =
    (veredito === "GOLPE" || veredito === "SUSPEITO") &&
    score !== null &&
    score !== undefined;

  return (
    <View
      style={[styles.cartao, { backgroundColor: colors[info.fundo] }]}
      accessibilityRole="header"
      accessibilityLabel={`Resultado: ${info.rotulo}. ${info.resumo}`}
    >
      <Ionicons name={info.icone} size={72} color={colors[info.cor]} />
      <Text style={[styles.rotulo, { color: colors[info.cor] }]}>
        {info.rotulo}
      </Text>

      {tipoGolpe && <Text style={styles.tipo}>{tipoGolpe}</Text>}

      <Text style={styles.resumo}>{info.resumo}</Text>

      {mostrarRisco && (
        <Text style={[styles.risco, { color: colors[info.cor] }]}>
          Risco {score} de 100
        </Text>
      )}
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    cartao: {
      alignItems: "center",
      gap: 6,
      borderRadius: 24,
      padding: 24,
    },
    rotulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(34),
      textAlign: "center",
    },
    tipo: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(18),
      color: colors.text,
      textAlign: "center",
    },
    resumo: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(18),
      lineHeight: tamanho(25),
      color: colors.text,
      textAlign: "center",
    },
    risco: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(16),
      marginTop: 4,
    },
  });

export default SemaforoVeredito;
