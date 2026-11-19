import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FeedbackForm from "@/components/FeedbackForm";
import FontesOficiais from "@/components/FontesOficiais";
import SemaforoVeredito from "@/components/SemaforoVeredito";
import SinaisDetectados from "@/components/SinaisDetectados";
import Aviso from "@/components/ui/Aviso";
import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useFeedbackMutation } from "@/hooks/useFeedbackMutation";
import { useLeitorDeTexto } from "@/hooks/useLeitorDeTexto";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useVerificacaoQuery } from "@/hooks/useVerificacaoQuery";
import { traduzirErro } from "@/lib/erros";
import { converterMoedaParaNumero } from "@/lib/mascaras";
import { usePreferencias } from "@/providers/PreferenciasProvider";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import { FeedbackFormData } from "@/schemas/forms/feedback.form.schema";

const ResultadoScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { audioAtivo } = usePreferencias();
  const { falando, semVoz, falar, parar } = useLeitorDeTexto();
  const jaLeu = useRef(false);

  const { data, isLoading, isError, error, refetch } = useVerificacaoQuery(
    Number(id)
  );
  const feedback = useFeedbackMutation(Number(id));

  const textoParaOuvir = data?.roteiroAudio ?? data?.frases.join(" ") ?? "";

  useEffect(() => {
    if (audioAtivo && textoParaOuvir !== "" && !jaLeu.current) {
      jaLeu.current = true;
      falar(textoParaOuvir);
    }
  }, [audioAtivo, textoParaOuvir, falar]);

  function handleSalvarFeedback({
    foiUtil,
    desfecho,
    valorEvitado,
  }: FeedbackFormData) {
    feedback.mutate({
      foiUtil: foiUtil === "SIM",
      desfecho,
      valorEvitado: converterMoedaParaNumero(valorEvitado),
    });
  }

  if (isLoading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || data === undefined) {
    return (
      <View style={[styles.centro, styles.conteudo]}>
        <Aviso tipo="erro" mensagem={traduzirErro(error)} />
        <Botao
          titulo="Tentar de novo"
          variante="contorno"
          onPress={() => refetch()}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      {data.veredito ? (
        <SemaforoVeredito
          veredito={data.veredito}
          score={data.score}
          tipoGolpe={data.tipoGolpe?.nome}
        />
      ) : (
        <Aviso
          tipo="sucesso"
          mensagem="Recebemos a sua mensagem. O resultado aparece no histórico assim que a análise terminar."
        />
      )}

      {textoParaOuvir !== "" && (
        <Botao
          titulo={falando ? "Parar de ler" : "Ouvir o resultado"}
          icone={falando ? "stop-circle-outline" : "volume-high-outline"}
          variante="contorno"
          onPress={() => (falando ? parar() : falar(textoParaOuvir))}
        />
      )}

      {semVoz && (
        <Aviso
          tipo="erro"
          mensagem="O celular não conseguiu ler em voz alta. Confira se o volume de mídia está ligado e se existe uma voz em português em Configurações > Acessibilidade > Saída de texto para fala."
        />
      )}

      {data.frases.length > 0 && (
        <View style={styles.frases}>
          {data.frases.map((frase) => (
            <Text key={frase} style={styles.frase}>
              {frase}
            </Text>
          ))}
        </View>
      )}

      {data.proximoPasso && (
        <View style={styles.proximoPasso}>
          <Text style={styles.proximoPassoTitulo}>O que fazer agora</Text>
          <Text style={styles.proximoPassoTexto}>{data.proximoPasso}</Text>
        </View>
      )}

      {data.guardioesAvisados !== null &&
        data.guardioesAvisados !== undefined &&
        data.guardioesAvisados > 0 && (
          <View style={styles.guardioes}>
            <Ionicons name="people" size={24} color={colors.secondary} />
            <Text style={styles.guardioesTexto}>
              Avisamos {data.guardioesAvisados}{" "}
              {data.guardioesAvisados === 1 ? "pessoa" : "pessoas"} da sua
              família.
            </Text>
          </View>
        )}

      <SinaisDetectados sinais={data.sinais} />

      <FontesOficiais fontes={data.fontes} />

      {data.veredito && (
        <FeedbackForm
          feedbackAtual={data.feedback}
          mostrarValorEvitado={
            data.veredito === "GOLPE" || data.veredito === "SUSPEITO"
          }
          handleSalvar={handleSalvarFeedback}
          isPending={feedback.isPending}
          isSuccess={feedback.isSuccess}
          errorMessage={feedback.isError ? traduzirErro(feedback.error) : null}
        />
      )}

      <Botao
        titulo="Conferir outra mensagem"
        icone="shield-checkmark-outline"
        onPress={() => router.replace("/conferir")}
      />
    </ScrollView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    centro: {
      flex: 1,
      justifyContent: "center",
      gap: 16,
      backgroundColor: colors.background,
    },
    conteudo: {
      padding: 24,
      gap: 20,
    },
    frases: {
      gap: 8,
    },
    frase: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(19),
      lineHeight: tamanho(27),
      color: colors.text,
    },
    proximoPasso: {
      gap: 4,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      backgroundColor: colors.primaryLight,
      borderRadius: 12,
      padding: 16,
    },
    proximoPassoTitulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(16),
      color: colors.link,
    },
    proximoPassoTexto: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(18),
      lineHeight: tamanho(25),
      color: colors.text,
    },
    guardioes: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 14,
      backgroundColor: colors.secondaryLight,
      padding: 14,
    },
    guardioesTexto: {
      flex: 1,
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(16),
      color: colors.text,
    },
  });

export default ResultadoScreen;
