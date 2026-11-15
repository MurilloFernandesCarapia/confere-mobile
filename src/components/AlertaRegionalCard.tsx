import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type { AlertaRegionalApi } from "@/schemas/api/alertaRegional.api.schema";

type Props = {
  alerta: AlertaRegionalApi;
};

const AlertaRegionalCard = ({ alerta }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  const urgente = alerta.nivel === "URGENTE";
  const cor = urgente ? colors.golpe : colors.suspeito;
  const fundo = urgente ? colors.golpeLight : colors.suspeitoLight;

  return (
    <View
      style={[styles.cartao, { backgroundColor: fundo, borderLeftColor: cor }]}
      accessible
      accessibilityLabel={`Alerta: ${alerta.titulo}. ${alerta.mensagem}`}
    >
      <View style={styles.cabecalho}>
        <Ionicons
          name={urgente ? "alert-circle" : "warning"}
          size={24}
          color={cor}
        />
        <Text style={[styles.titulo, { color: cor }]}>{alerta.titulo}</Text>
      </View>
      <Text style={styles.mensagem}>{alerta.mensagem}</Text>
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    cartao: {
      gap: 6,
      borderLeftWidth: 5,
      borderRadius: 14,
      padding: 16,
    },
    cabecalho: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    titulo: {
      flex: 1,
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(17),
    },
    mensagem: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      lineHeight: tamanho(23),
      color: colors.text,
    },
  });

export default AlertaRegionalCard;
