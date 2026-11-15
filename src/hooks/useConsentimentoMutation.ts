import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Finalidade } from "@/schemas/api/consentimento.api.schema";
import { registrarConsentimento } from "@/services/consentimentos";

export function useConsentimentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      finalidade,
      aceito,
    }: {
      finalidade: Finalidade;
      aceito: boolean;
    }) => registrarConsentimento(finalidade, aceito),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentimentos"] });
    },
  });
}
