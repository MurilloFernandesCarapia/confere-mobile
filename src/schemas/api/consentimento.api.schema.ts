import { z } from "zod";

export const finalidadeSchema = z.enum(["ANALISE_IA", "ALERTA_GUARDIAO"]);

export const consentimentoApiSchema = z.object({
  finalidade: finalidadeSchema,
  versaoTermo: z.string(),
  aceito: z.boolean(),
  dtRegistro: z.string(),
});

export type Finalidade = z.infer<typeof finalidadeSchema>;

export type ConsentimentoApi = z.infer<typeof consentimentoApiSchema>;
