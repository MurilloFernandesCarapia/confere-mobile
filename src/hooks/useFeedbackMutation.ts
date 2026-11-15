import { useMutation, useQueryClient } from "@tanstack/react-query";

import { NovoFeedback, salvarFeedback } from "@/services/verificacoes";

export function useFeedbackMutation(idVerificacao: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedback: NovoFeedback) =>
      salvarFeedback(idVerificacao, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["verificacao", idVerificacao],
      });
    },
  });
}
