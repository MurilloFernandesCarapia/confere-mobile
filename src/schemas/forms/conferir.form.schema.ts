import { z } from "zod";

const TAMANHO_MAXIMO_IMAGEM = 5 * 1024 * 1024;

export const conferirSchema = z
  .object({
    canal: z.string().min(1, "Escolha por onde a mensagem chegou."),
    texto: z.string().max(4000, "O texto pode ter no máximo 4000 caracteres."),
    imagem: z
      .object({
        uri: z.string(),
        nome: z.string(),
        tipo: z.string(),
        tamanho: z.number(),
      })
      .nullable(),
  })
  .refine((dados) => dados.texto.trim() !== "" || dados.imagem !== null, {
    message: "Cole o texto ou mande um print da mensagem.",
    path: ["texto"],
  })
  .refine(
    (dados) =>
      dados.imagem === null || dados.imagem.tamanho <= TAMANHO_MAXIMO_IMAGEM,
    {
      message: "A imagem pode ter no máximo 5 MB.",
      path: ["imagem"],
    }
  )
  .refine(
    (dados) => dados.imagem === null || dados.imagem.tipo.startsWith("image/"),
    {
      message: "Envie uma imagem (foto ou print).",
      path: ["imagem"],
    }
  );

export type ConferirFormData = z.infer<typeof conferirSchema>;
