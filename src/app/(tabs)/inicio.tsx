import { ScrollView, StyleSheet, Text } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useAuth } from "@/providers/AuthProvider";
import { Tamanho } from "@/providers/ThemeProvider";

const InicioScreen = () => {
  const styles = useThemedStyles(criarEstilos);
  const { usuario } = useAuth();

  const primeiroNome = usuario?.nome.split(" ")[0] ?? "";

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.saudacao}>Olá, {primeiroNome}!</Text>
      <Text style={styles.texto}>O que você quer conferir hoje?</Text>
    </ScrollView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    conteudo: {
      padding: 24,
      gap: 8,
    },
    saudacao: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(26),
      color: colors.text,
    },
    texto: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(18),
      color: colors.textSecondary,
    },
  });

export default InicioScreen;
