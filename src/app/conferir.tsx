import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

import ConferirForm from "@/components/ConferirForm";
import ConsentimentoAnalise from "@/components/ConsentimentoAnalise";
import type { AppColors } from "@/constants/Colors";
import { useConsentimentoMutation } from "@/hooks/useConsentimentoMutation";
import { useCriarVerificacaoMutation } from "@/hooks/useCriarVerificacaoMutation";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { codigoDoErro, traduzirErro } from "@/lib/erros";
import { ConferirFormData } from "@/schemas/forms/conferir.form.schema";
import { NovaVerificacao } from "@/services/verificacoes";

const ConferirScreen = () => {
  const styles = useThemedStyles(criarEstilos);
  const verificacao = useCriarVerificacaoMutation();
  const consentimento = useConsentimentoMutation();
  const [ultimoEnvio, setUltimoEnvio] = useState<NovaVerificacao | null>(null);

  const precisaDeConsentimento =
    codigoDoErro(verificacao.error) === "CONSENTIMENTO_PENDENTE";

  function enviar(dados: NovaVerificacao) {
    setUltimoEnvio(dados);
    verificacao.mutate(dados, {
      onSuccess: (resultado) => {
        router.replace({
          pathname: "/verificacao/[id]",
          params: { id: String(resultado.id) },
        });
      },
    });
  }

  function handleConferir({ canal, texto, imagem }: ConferirFormData) {
    enviar({
      canal,
      texto,
      imagem:
        imagem === null
          ? null
          : { uri: imagem.uri, nome: imagem.nome, tipo: imagem.tipo },
    });
  }

  function handleAceitar() {
    consentimento.mutate(
      { finalidade: "ANALISE_IA", aceito: true },
      {
        onSuccess: () => {
          if (ultimoEnvio !== null) {
            enviar(ultimoEnvio);
          }
        },
      }
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        {precisaDeConsentimento ? (
          <ConsentimentoAnalise
            isPending={consentimento.isPending || verificacao.isPending}
            onAceitar={handleAceitar}
            onRecusar={() => router.back()}
          />
        ) : (
          <ConferirForm
            handleConferir={handleConferir}
            isPending={verificacao.isPending}
            errorMessage={
              verificacao.isError
                ? traduzirErro(verificacao.error)
                : consentimento.isError
                  ? traduzirErro(consentimento.error)
                  : null
            }
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const criarEstilos = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    conteudo: {
      padding: 24,
    },
  });

export default ConferirScreen;
