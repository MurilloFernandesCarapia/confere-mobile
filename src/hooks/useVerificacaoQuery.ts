import { useQuery } from "@tanstack/react-query";

import { getVerificacao } from "@/services/verificacoes";

export function useVerificacaoQuery(id: number) {
  return useQuery({
    queryKey: ["verificacao", id],
    queryFn: () => getVerificacao(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
