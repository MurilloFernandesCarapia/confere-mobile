import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { VEREDITOS } from "@/constants/Vereditos";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { formatarDataHora } from "@/lib/datas";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type { VerificacaoApi } from "@/schemas/api/verificacao.api.schema";

type Props = {
  verificacao: VerificacaoApi;
  onAbrir: () => void;
  onExcluir: () => void;
};

const VerificacaoCard = ({ verificacao, onAbrir, onExcluir }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  const info = verificacao.veredito ? VEREDITOS[verificacao.veredito] : null;
  const titulo = info?.rotulo ?? "Em análise";
  const descricao = verificacao.tipoGolpe?.nome ?? info?.resumo ?? "";

  return (
    <View style={styles.cartao}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${titulo}. ${descricao}. Abrir resultado`}
        style={styles.conteudo}
        onPress={onAbrir}
      >
        <View
          style={[
            styles.icone,
            { backgroundColor: info ? colors[info.fundo] : colors.surface },
          ]}
        >
          <Ionicons
            name={info?.icone ?? "time-outline"}
            size={28}
            color={info ? colors[info.cor] : colors.textSecondary}
          />
        </View>

        <View style={styles.textos}>
          <Text
            style={[
              styles.titulo,
              { color: info ? colors[info.cor] : colors.text },
            ]}
          >
            {titulo}
          </Text>
          {descricao !== "" && (
            <Text style={styles.descricao} numberOfLines={2}>
              {descricao}
            </Text>
          )}
          <Text style={styles.data}>
            {formatarDataHora(verificacao.criadoEm)}
          </Text>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Excluir do histórico"
        style={styles.excluir}
        onPress={onExcluir}
      >
        <Ionicons name="trash-outline" size={24} color={colors.error} />
      </Pressable>
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    cartao: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 18,
      backgroundColor: colors.surface,
    },
    conteudo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
    },
    icone: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
    },
    textos: {
      flex: 1,
      gap: 2,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(18),
    },
    descricao: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(15),
      color: colors.text,
    },
    data: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(14),
      color: colors.textSecondary,
    },
    excluir: {
      width: 56,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default VerificacaoCard;
