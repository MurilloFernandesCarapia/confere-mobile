import { useMutation, useQueryClient } from "@tanstack/react-query";

import { criarVerificacao } from "@/services/verificacoes";

export function useCriarVerificacaoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: criarVerificacao,
    onSuccess: (verificacao) => {
      queryClient.setQueryData(["verificacao", verificacao.id], verificacao);
      queryClient.invalidateQueries({ queryKey: ["verificacoes"] });
    },
  });
}
