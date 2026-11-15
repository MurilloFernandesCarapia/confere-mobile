import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AlertaRegionalCard from "@/components/AlertaRegionalCard";
import Aviso from "@/components/ui/Aviso";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useAlertasRegionaisQuery } from "@/hooks/useAlertasRegionaisQuery";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { useAuth } from "@/providers/AuthProvider";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

const InicioScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const { usuario } = useAuth();

  const alertas = useAlertasRegionaisQuery(usuario?.municipio.codIbge);

  const primeiroNome = usuario?.nome.split(" ")[0] ?? "";

  return (
    <ScrollView
      contentContainerStyle={styles.conteudo}
      refreshControl={
        <RefreshControl
          refreshing={alertas.isRefetching}
          onRefresh={() => {
            alertas.refetch();
          }}
          colors={[colors.primary]}
        />
      }
    >
      <View>
        <Text style={styles.saudacao}>Olá, {primeiroNome}!</Text>
        <Text style={styles.texto}>
          Recebeu algo estranho? Confira antes de clicar, pagar ou responder.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Conferir uma mensagem"
        accessibilityHint="Abre a tela para mandar foto, print ou texto"
        style={({ pressed }) => [
          styles.botaoConferir,
          pressed && styles.pressionado,
        ]}
        onPress={() => router.push("/conferir")}
      >
        <Ionicons
          name="shield-checkmark"
          size={56}
          color={colors.textOnPrimary}
        />
        <Text style={styles.botaoConferirTexto}>Conferir</Text>
        <Text style={styles.botaoConferirAjuda}>foto, print ou texto</Text>
      </Pressable>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>
          Alertas em {usuario?.municipio.nome}
        </Text>

        {alertas.isLoading && <ActivityIndicator color={colors.primary} />}

        {alertas.isError && (
          <Aviso tipo="erro" mensagem={traduzirErro(alertas.error)} />
        )}

        {alertas.data?.length === 0 && (
          <Text style={styles.texto}>
            Nenhum alerta de golpe na sua cidade agora.
          </Text>
        )}

        {alertas.data?.map((alerta) => (
          <AlertaRegionalCard key={alerta.id} alerta={alerta} />
        ))}
      </View>
    </ScrollView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    conteudo: {
      padding: 24,
      gap: 24,
    },
    saudacao: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(26),
      color: colors.text,
    },
    texto: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      lineHeight: tamanho(24),
      color: colors.textSecondary,
    },
    botaoConferir: {
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      minHeight: 180,
      borderRadius: 28,
      backgroundColor: colors.secondary,
      padding: 24,
    },
    pressionado: {
      opacity: 0.85,
    },
    botaoConferirTexto: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(32),
      color: colors.textOnPrimary,
    },
    botaoConferirAjuda: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(17),
      color: colors.textOnPrimary,
    },
    secao: {
      gap: 12,
    },
    tituloSecao: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
    },
  });

export default InicioScreen;
