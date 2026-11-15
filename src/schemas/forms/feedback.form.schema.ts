import { z } from "zod";

import { desfechoSchema } from "@/schemas/api/verificacao.api.schema";

export const feedbackSchema = z.object({
  foiUtil: z
    .string()
    .refine(
      (resposta) => ["SIM", "NAO"].includes(resposta),
      "Conte se o resultado te ajudou."
    ),
  desfecho: desfechoSchema.nullable(),
  valorEvitado: z.string(),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
