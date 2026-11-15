import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import FiltroVeredito from "@/components/FiltroVeredito";
import Aviso from "@/components/ui/Aviso";
import Botao from "@/components/ui/Botao";
import EstadoVazio from "@/components/ui/EstadoVazio";
import VerificacaoCard from "@/components/VerificacaoCard";
import type { AppColors } from "@/constants/Colors";
import { useDeleteVerificacaoMutation } from "@/hooks/useDeleteVerificacaoMutation";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useVerificacoesQuery } from "@/hooks/useVerificacoesQuery";
import { traduzirErro } from "@/lib/erros";
import { useTheme } from "@/providers/ThemeProvider";
import type { Veredito } from "@/schemas/api/verificacao.api.schema";

const HistoricoScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const [veredito, setVeredito] = useState<Veredito | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVerificacoesQuery(veredito);
  const exclusao = useDeleteVerificacaoMutation();

  const verificacoes = data?.pages.flatMap((pagina) => pagina.conteudo) ?? [];

  function confirmarExclusao(id: number) {
    Alert.alert(
      "Excluir do histórico?",
      "Essa conferência some para sempre do seu histórico.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => exclusao.mutate(id),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <FiltroVeredito selecionado={veredito} onSelecionar={setVeredito} />
      </View>

      {exclusao.isError && (
        <View style={styles.aviso}>
          <Aviso tipo="erro" mensagem={traduzirErro(exclusao.error)} />
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator
          style={styles.carregando}
          size="large"
          color={colors.primary}
        />
      ) : isError ? (
        <View style={styles.aviso}>
          <Aviso tipo="erro" mensagem={traduzirErro(error)} />
          <Botao
            titulo="Tentar de novo"
            variante="contorno"
            onPress={() => refetch()}
          />
        </View>
      ) : (
        <FlatList
          data={verificacoes}
          keyExtractor={(verificacao) => String(verificacao.id)}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && !isFetchingNextPage}
              onRefresh={() => {
                refetch();
              }}
              colors={[colors.primary]}
            />
          }
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListEmptyComponent={
            <EstadoVazio
              icone="shield-checkmark-outline"
              titulo="Nada por aqui ainda"
              descricao="As mensagens que você conferir aparecem aqui."
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator color={colors.primary} />
            ) : undefined
          }
          renderItem={({ item }) => (
            <VerificacaoCard
              verificacao={item}
              onAbrir={() =>
                router.push({
                  pathname: "/verificacao/[id]",
                  params: { id: String(item.id) },
                })
              }
              onExcluir={() => confirmarExclusao(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const criarEstilos = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    lista: {
      gap: 12,
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    carregando: {
      marginTop: 40,
    },
    aviso: {
      gap: 12,
      paddingHorizontal: 24,
      paddingBottom: 12,
    },
  });

export default HistoricoScreen;
