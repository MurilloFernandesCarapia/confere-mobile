import Constants from "expo-constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Logo from "@/components/Logo";
import Secao from "@/components/ui/Secao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { INTEGRANTES } from "@/constants/Sobre";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho } from "@/providers/ThemeProvider";

const SobreScreen = () => {
  const styles = useThemedStyles(criarEstilos);

  const versao = Constants.expoConfig?.version ?? "-";
  const commit = Constants.expoConfig?.extra?.commitHash ?? "-";

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <View style={styles.marca}>
        <Logo tamanho={88} />
        <Text style={styles.titulo}>Confere</Text>
        <Text style={styles.subtitulo}>
          Antes de clicar, pagar ou desistir de um direito: confere.
        </Text>
      </View>

      <Secao titulo="Esta versão">
        <View style={styles.linha}>
          <Text style={styles.rotulo}>Versão</Text>
          <Text style={styles.valor}>{versao}</Text>
        </View>
        <View style={styles.linha}>
          <Text style={styles.rotulo}>Commit</Text>
          <Text
            style={[styles.valor, styles.hash]}
            accessibilityLabel={`Commit ${commit.split("").join(" ")}`}
            selectable
          >
            {commit}
          </Text>
        </View>
      </Secao>

      <Secao titulo="Quem fez">
        {INTEGRANTES.map((integrante) => (
          <View key={integrante.rm}>
            <Text style={styles.valor}>{integrante.nome}</Text>
            <Text style={styles.rotulo}>
              RM {integrante.rm} · {integrante.turma}
            </Text>
          </View>
        ))}
      </Secao>

      <Text style={styles.rodape}>
        FIAP · Global Solution 2026/2 · CitizenTech
      </Text>
    </ScrollView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    conteudo: {
      padding: 24,
      gap: 20,
    },
    marca: {
      alignItems: "center",
      gap: 4,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(28),
      color: colors.text,
    },
    subtitulo: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      lineHeight: tamanho(23),
      color: colors.textSecondary,
      textAlign: "center",
    },
    linha: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      minHeight: 32,
    },
    rotulo: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(15),
      color: colors.textSecondary,
    },
    valor: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(17),
      color: colors.text,
    },
    hash: {
      fontFamily: Fonts.extraBold,
      color: colors.link,
      letterSpacing: 1,
    },
    rodape: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.textSecondary,
      textAlign: "center",
    },
  });

export default SobreScreen;
