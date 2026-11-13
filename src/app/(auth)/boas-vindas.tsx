import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/components/Logo";
import Botao from "@/components/ui/Botao";
import CaixaDeSelecao from "@/components/ui/CaixaDeSelecao";
import OpcaoAlternavel from "@/components/ui/OpcaoAlternavel";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { PONTOS_DO_TERMO, VERSAO_TERMO } from "@/constants/Termo";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { usePreferencias } from "@/providers/PreferenciasProvider";
import { Tamanho } from "@/providers/ThemeProvider";

const BoasVindasScreen = () => {
  const styles = useThemedStyles(criarEstilos);
  const {
    fonteGrande,
    audioAtivo,
    alterarFonteGrande,
    alterarAudioAtivo,
    concluirBoasVindas,
  } = usePreferencias();

  const [termoAceito, setTermoAceito] = useState(false);

  async function handleComecar() {
    await concluirBoasVindas();
    router.replace("/login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.marca}>
          <Logo />
          <Text style={styles.titulo}>Boas-vindas ao Confere</Text>
          <Text style={styles.subtitulo}>
            Recebeu uma mensagem estranha? Mande o print, a foto ou o texto e o
            Confere diz se é golpe, mensagem oficial ou um direito seu.
          </Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloCartao}>Como prefere usar o app?</Text>

          <OpcaoAlternavel
            titulo="Letras grandes"
            descricao="Aumenta o tamanho dos textos em todas as telas."
            valor={fonteGrande}
            onAlterar={alterarFonteGrande}
          />

          <OpcaoAlternavel
            titulo="Ouvir os resultados"
            descricao="O app lê o resultado de cada conferência em voz alta."
            valor={audioAtivo}
            onAlterar={alterarAudioAtivo}
          />
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloCartao}>
            Seus dados (termo versão {VERSAO_TERMO})
          </Text>

          {PONTOS_DO_TERMO.map((ponto) => (
            <Text key={ponto} style={styles.ponto}>
              • {ponto}
            </Text>
          ))}

          <CaixaDeSelecao
            texto="Li e aceito o termo de uso dos meus dados"
            marcada={termoAceito}
            onAlterar={setTermoAceito}
          />
        </View>

        <Botao
          titulo="Começar"
          icone="arrow-forward"
          desabilitado={!termoAceito}
          accessibilityLabel={
            termoAceito ? "Começar" : "Começar. Aceite o termo para continuar"
          }
          onPress={handleComecar}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    conteudo: {
      padding: 24,
      gap: 20,
    },
    marca: {
      alignItems: "center",
      gap: 8,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(26),
      color: colors.text,
      textAlign: "center",
    },
    subtitulo: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      lineHeight: tamanho(24),
      color: colors.textSecondary,
      textAlign: "center",
    },
    cartao: {
      gap: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
      padding: 20,
    },
    tituloCartao: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(18),
      color: colors.text,
    },
    ponto: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      lineHeight: tamanho(23),
      color: colors.textSecondary,
    },
  });

export default BoasVindasScreen;
