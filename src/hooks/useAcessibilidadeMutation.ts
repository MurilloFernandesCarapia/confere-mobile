import { useMutation } from "@tanstack/react-query";

import { atualizarAcessibilidade } from "@/services/usuarios";

export function useAcessibilidadeMutation() {
  return useMutation({
    mutationFn: atualizarAcessibilidade,
  });
}
