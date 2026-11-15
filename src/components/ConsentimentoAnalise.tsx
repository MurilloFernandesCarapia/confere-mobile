import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { PONTOS_DO_TERMO, VERSAO_TERMO } from "@/constants/Termo";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props = {
  onAceitar: () => void;
  onRecusar: () => void;
  isPending: boolean;
};

const ConsentimentoAnalise = ({ onAceitar, onRecusar, isPending }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  return (
    <View style={styles.cartao} accessibilityRole="alert">
      <Ionicons name="lock-closed" size={32} color={colors.link} />
      <Text style={styles.titulo}>Antes de conferir</Text>
      <Text style={styles.texto}>
        Para analisar a mensagem, precisamos do seu aceite (termo versão{" "}
        {VERSAO_TERMO}):
      </Text>

      {PONTOS_DO_TERMO.map((ponto) => (
        <Text key={ponto} style={styles.texto}>
          • {ponto}
        </Text>
      ))}

      <Botao
        titulo="Aceitar e conferir"
        variante="secundario"
        carregando={isPending}
        onPress={onAceitar}
      />
      <Botao titulo="Agora não" variante="contorno" onPress={onRecusar} />
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    cartao: {
      gap: 12,
      borderRadius: 20,
      backgroundColor: colors.primaryLight,
      padding: 20,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
    },
    texto: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      lineHeight: tamanho(23),
      color: colors.text,
    },
  });

export default ConsentimentoAnalise;
