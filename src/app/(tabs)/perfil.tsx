import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import ConsentimentosLgpd from "@/components/ConsentimentosLgpd";
import Logout from "@/components/Logout";
import SeletorTema from "@/components/SeletorTema";
import Aviso from "@/components/ui/Aviso";
import ItemDeMenu from "@/components/ui/ItemDeMenu";
import OpcaoAlternavel from "@/components/ui/OpcaoAlternavel";
import Secao from "@/components/ui/Secao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useAcessibilidadeMutation } from "@/hooks/useAcessibilidadeMutation";
import { useConsentimentoMutation } from "@/hooks/useConsentimentoMutation";
import { useConsentimentosQuery } from "@/hooks/useConsentimentosQuery";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { useAuth } from "@/providers/AuthProvider";
import { usePreferencias } from "@/providers/PreferenciasProvider";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type { Finalidade } from "@/schemas/api/consentimento.api.schema";

const PerfilScreen = () => {
  const { colors, preferencia, alterarPreferencia } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const { usuario, signOut } = useAuth();
  const { fonteGrande, audioAtivo, alterarFonteGrande, alterarAudioAtivo } =
    usePreferencias();

  const acessibilidade = useAcessibilidadeMutation();
  const consentimentos = useConsentimentosQuery();
  const consentimento = useConsentimentoMutation();

  if (usuario === null) {
    return null;
  }

  function handleAlterarFonteGrande(valor: boolean) {
    void alterarFonteGrande(valor);
    acessibilidade.mutate({ fonteGrande: valor, audioAtivo });
  }

  function handleAlterarAudioAtivo(valor: boolean) {
    void alterarAudioAtivo(valor);
    acessibilidade.mutate({ fonteGrande, audioAtivo: valor });
  }

  function handleAlterarConsentimento(finalidade: Finalidade, aceito: boolean) {
    if (aceito || finalidade !== "ANALISE_IA") {
      consentimento.mutate({ finalidade, aceito });
      return;
    }

    Alert.alert(
      "Cancelar a autorização?",
      "Sem ela, o Confere não consegue conferir suas mensagens. Você pode autorizar de novo quando quiser.",
      [
        { text: "Manter", style: "cancel" },
        {
          text: "Cancelar autorização",
          style: "destructive",
          onPress: () => consentimento.mutate({ finalidade, aceito }),
        },
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <View style={styles.cartao}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color={colors.textOnPrimary} />
        </View>
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.detalhe}>{usuario.email}</Text>
        <Text style={styles.detalhe}>
          {usuario.municipio.nome} - {usuario.municipio.uf}
        </Text>
      </View>

      <Secao titulo="Acessibilidade">
        <OpcaoAlternavel
          titulo="Letras grandes"
          descricao="Aumenta o tamanho dos textos em todas as telas."
          valor={fonteGrande}
          onAlterar={handleAlterarFonteGrande}
        />
        <OpcaoAlternavel
          titulo="Ouvir os resultados"
          descricao="O app lê o resultado de cada conferência em voz alta."
          valor={audioAtivo}
          onAlterar={handleAlterarAudioAtivo}
        />
        {acessibilidade.isError && (
          <Aviso
            tipo="erro"
            mensagem="Não conseguimos salvar na sua conta agora. Neste celular a mudança já vale."
          />
        )}
      </Secao>

      <Secao titulo="Aparência">
        <SeletorTema
          selecionado={preferencia}
          onSelecionar={alterarPreferencia}
        />
      </Secao>

      <Secao titulo="Seus dados (LGPD)">
        <ConsentimentosLgpd
          consentimentos={consentimentos.data ?? []}
          isLoading={consentimentos.isLoading}
          isPending={consentimento.isPending}
          errorMessage={
            consentimentos.isError
              ? traduzirErro(consentimentos.error)
              : consentimento.isError
                ? traduzirErro(consentimento.error)
                : null
          }
          onAlterar={handleAlterarConsentimento}
        />
      </Secao>

      <ItemDeMenu
        titulo="Sobre o app"
        icone="information-circle-outline"
        onPress={() => router.push("/sobre")}
      />

      <Logout onSignOut={signOut} />
    </ScrollView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    conteudo: {
      padding: 24,
      gap: 20,
    },
    cartao: {
      alignItems: "center",
      gap: 4,
      borderRadius: 20,
      backgroundColor: colors.surface,
      padding: 24,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      marginBottom: 8,
    },
    nome: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(22),
      color: colors.text,
      textAlign: "center",
    },
    detalhe: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      color: colors.textSecondary,
      textAlign: "center",
    },
  });

export default PerfilScreen;
