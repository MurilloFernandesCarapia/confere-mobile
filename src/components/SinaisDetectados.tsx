import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { SINAIS } from "@/constants/Vereditos";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type { SinalApi } from "@/schemas/api/verificacao.api.schema";

type Props = {
  sinais: SinalApi[];
};

const SinaisDetectados = ({ sinais }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  if (sinais.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>O que chamou atenção</Text>

      {sinais.map((sinal, indice) => (
        <View key={`${sinal.tipo}-${indice}`} style={styles.sinal}>
          <Ionicons name="flag" size={20} color={colors.suspeito} />
          <View style={styles.textos}>
            <Text style={styles.nome}>{SINAIS[sinal.tipo] ?? sinal.tipo}</Text>
            {sinal.trecho && (
              <Text style={styles.trecho}>&quot;{sinal.trecho}&quot;</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
    },
    sinal: {
      flexDirection: "row",
      gap: 12,
      borderRadius: 14,
      backgroundColor: colors.surface,
      padding: 14,
    },
    textos: {
      flex: 1,
      gap: 2,
    },
    nome: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(16),
      color: colors.text,
    },
    trecho: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(15),
      fontStyle: "italic",
      color: colors.textSecondary,
    },
  });

export default SinaisDetectados;
