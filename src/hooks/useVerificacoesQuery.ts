import { useInfiniteQuery } from "@tanstack/react-query";

import type { Veredito } from "@/schemas/api/verificacao.api.schema";
import { getVerificacoes } from "@/services/verificacoes";

export function useVerificacoesQuery(veredito: Veredito | null) {
  return useInfiniteQuery({
    queryKey: ["verificacoes", veredito],
    queryFn: ({ pageParam }) => getVerificacoes(pageParam, veredito),
    initialPageParam: 0,
    getNextPageParam: (ultimaPagina) =>
      ultimaPagina.pagina + 1 < ultimaPagina.totalPaginas
        ? ultimaPagina.pagina + 1
        : undefined,
  });
}
