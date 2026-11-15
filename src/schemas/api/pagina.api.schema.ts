import { z } from "zod";

export function paginaApiSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    conteudo: z.array(itemSchema),
    pagina: z.number(),
    tamanho: z.number(),
    totalItens: z.number(),
    totalPaginas: z.number(),
  });
}

export type PaginaApi<T> = {
  conteudo: T[];
  pagina: number;
  tamanho: number;
  totalItens: number;
  totalPaginas: number;
};
