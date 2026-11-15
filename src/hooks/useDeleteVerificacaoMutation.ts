import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteVerificacao } from "@/services/verificacoes";

export function useDeleteVerificacaoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVerificacao,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ["verificacao", id] });
      queryClient.invalidateQueries({ queryKey: ["verificacoes"] });
    },
  });
}
