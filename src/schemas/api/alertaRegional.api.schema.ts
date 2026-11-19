import { z } from "zod";

export const alertaRegionalApiSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  mensagem: z.string(),
  nivel: z.string(),
  dtInicio: z.string().nullish(),
  dtFim: z.string().nullish(),
});

export type AlertaRegionalApi = z.infer<typeof alertaRegionalApiSchema>;
