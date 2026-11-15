import { useMutation } from "@tanstack/react-query";

import { Finalidade, registrarConsentimento } from "@/services/consentimentos";

export function useConsentimentoMutation() {
  return useMutation({
    mutationFn: ({
      finalidade,
      aceito,
    }: {
      finalidade: Finalidade;
      aceito: boolean;
    }) => registrarConsentimento(finalidade, aceito),
  });
}
