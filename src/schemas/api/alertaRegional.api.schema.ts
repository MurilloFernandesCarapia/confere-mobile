import { z } from "zod";

export const nivelAlertaSchema = z.enum(["INFO", "ATENCAO", "URGENTE"]);

export const alertaRegionalApiSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  mensagem: z.string(),
  nivel: nivelAlertaSchema,
  dtInicio: z.string().nullish(),
  dtFim: z.string().nullish(),
});

export type NivelAlerta = z.infer<typeof nivelAlertaSchema>;

export type AlertaRegionalApi = z.infer<typeof alertaRegionalApiSchema>;
