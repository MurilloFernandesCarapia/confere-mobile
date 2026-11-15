import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import AppTextInput from "@/components/ui/AppTextInput";
import Aviso from "@/components/ui/Aviso";
import Botao from "@/components/ui/Botao";
import Chip from "@/components/ui/Chip";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { DESFECHOS } from "@/constants/Vereditos";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { aplicarMascaraMoeda } from "@/lib/mascaras";
import { Tamanho } from "@/providers/ThemeProvider";
import type {
  Desfecho,
  FeedbackApi,
} from "@/schemas/api/verificacao.api.schema";
import {
  FeedbackFormData,
  feedbackSchema,
} from "@/schemas/forms/feedback.form.schema";

type Props = {
  feedbackAtual?: FeedbackApi | null;
  mostrarValorEvitado: boolean;
  handleSalvar: (data: FeedbackFormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
};

const FeedbackForm = ({
  feedbackAtual,
  mostrarValorEvitado,
  handleSalvar,
  isPending,
  isSuccess,
  errorMessage,
}: Props) => {
  const styles = useThemedStyles(criarEstilos);

  const { control, handleSubmit } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      foiUtil:
        feedbackAtual === null || feedbackAtual === undefined
          ? ""
          : feedbackAtual.foiUtil
            ? "SIM"
            : "NAO",
      desfecho: feedbackAtual?.desfecho ?? null,
      valorEvitado: feedbackAtual?.valorEvitado
        ? aplicarMascaraMoeda(feedbackAtual.valorEvitado.toFixed(2))
        : "",
    },
  });

  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>Isso te ajudou?</Text>

      <Controller
        control={control}
        name="foiUtil"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.bloco}>
            <View style={styles.opcoes}>
              <Chip
                rotulo="Sim, ajudou"
                selecionado={value === "SIM"}
                onPress={() => onChange("SIM")}
              />
              <Chip
                rotulo="Não ajudou"
                selecionado={value === "NAO"}
                onPress={() => onChange("NAO")}
              />
            </View>
            {error?.message && <Text style={styles.erro}>{error.message}</Text>}
          </View>
        )}
      />

      <Text style={styles.pergunta}>E o que você fez? (opcional)</Text>

      <Controller
        control={control}
        name="desfecho"
        render={({ field: { onChange, value } }) => (
          <View style={styles.opcoes}>
            {(Object.keys(DESFECHOS) as Desfecho[]).map((desfecho) => (
              <Chip
                key={desfecho}
                rotulo={DESFECHOS[desfecho]}
                selecionado={value === desfecho}
                onPress={() => onChange(value === desfecho ? null : desfecho)}
              />
            ))}
          </View>
        )}
      />

      {mostrarValorEvitado && (
        <AppTextInput
          control={control}
          name="valorEvitado"
          label="Quanto você deixou de perder? (opcional)"
          placeholder="R$ 0,00"
          keyboardType="number-pad"
          mascara={aplicarMascaraMoeda}
        />
      )}

      {errorMessage !== null && <Aviso tipo="erro" mensagem={errorMessage} />}

      {isSuccess && (
        <Aviso
          tipo="sucesso"
          mensagem="Obrigado! Sua resposta ajuda a proteger mais pessoas."
        />
      )}

      <Botao
        titulo="Enviar resposta"
        variante="contorno"
        carregando={isPending}
        onPress={handleSubmit(handleSalvar)}
      />
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    cartao: {
      gap: 14,
      borderRadius: 20,
      backgroundColor: colors.surface,
      padding: 20,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
    },
    pergunta: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(16),
      color: colors.text,
    },
    bloco: {
      gap: 6,
    },
    opcoes: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    erro: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.error,
    },
  });

export default FeedbackForm;
