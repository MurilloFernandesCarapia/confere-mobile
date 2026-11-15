import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Aviso from "@/components/ui/Aviso";
import OpcaoAlternavel from "@/components/ui/OpcaoAlternavel";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { VERSAO_TERMO } from "@/constants/Termo";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { formatarDataHora } from "@/lib/datas";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type {
  ConsentimentoApi,
  Finalidade,
} from "@/schemas/api/consentimento.api.schema";

type Props = {
  consentimentos: ConsentimentoApi[];
  isLoading: boolean;
  isPending: boolean;
  errorMessage: string | null;
  onAlterar: (finalidade: Finalidade, aceito: boolean) => void;
};

const FINALIDADES: {
  finalidade: Finalidade;
  titulo: string;
  descricao: string;
}[] = [
  {
    finalidade: "ANALISE_IA",
    titulo: "Conferir minhas mensagens com IA",
    descricao: "Sem essa autorização o app não consegue conferir nada.",
  },
  {
    finalidade: "ALERTA_GUARDIAO",
    titulo: "Avisar minha família",
    descricao: "Seus guardiões recebem um aviso quando aparecer um golpe.",
  },
];

function ultimoRegistro(
  consentimentos: ConsentimentoApi[],
  finalidade: Finalidade
) {
  return consentimentos
    .filter((consentimento) => consentimento.finalidade === finalidade)
    .sort((a, b) => b.dtRegistro.localeCompare(a.dtRegistro))[0];
}

const ConsentimentosLgpd = ({
  consentimentos,
  isLoading,
  isPending,
  errorMessage,
  onAlterar,
}: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      {FINALIDADES.map(({ finalidade, titulo, descricao }) => {
        const registro = ultimoRegistro(consentimentos, finalidade);

        return (
          <View key={finalidade}>
            <OpcaoAlternavel
              titulo={titulo}
              descricao={descricao}
              valor={registro?.aceito ?? false}
              onAlterar={(aceito) => {
                if (!isPending) {
                  onAlterar(finalidade, aceito);
                }
              }}
            />
            {registro !== undefined && (
              <Text style={styles.registro}>
                {registro.aceito ? "Autorizado" : "Cancelado"} em{" "}
                {formatarDataHora(registro.dtRegistro)} · termo versão{" "}
                {registro.versaoTermo}
              </Text>
            )}
          </View>
        );
      })}

      {errorMessage !== null && <Aviso tipo="erro" mensagem={errorMessage} />}

      <Text style={styles.termo}>
        Termo de uso dos dados: versão {VERSAO_TERMO}
      </Text>
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    registro: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(13),
      color: colors.textSecondary,
    },
    termo: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.textSecondary,
    },
  });

export default ConsentimentosLgpd;
