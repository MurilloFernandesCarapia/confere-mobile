import { z } from "zod";

export const vereditoSchema = z.enum([
  "GOLPE",
  "SUSPEITO",
  "OFICIAL",
  "DIREITO",
  "INCONCLUSIVO",
]);

export const canalApiSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
});

export const tipoGolpeApiSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
});

export const sinalApiSchema = z.object({
  tipo: z.string(),
  trecho: z.string().nullish(),
});

export const fonteApiSchema = z.object({
  titulo: z.string(),
  url: z.string(),
});

export const verificacaoApiSchema = z.object({
  id: z.number(),
  veredito: vereditoSchema.nullish(),
  score: z.number().nullish(),
  status: z.string(),
  tipoGolpe: tipoGolpeApiSchema.nullish(),
  frases: z.array(z.string()).default([]),
  roteiroAudio: z.string().nullish(),
  proximoPasso: z.string().nullish(),
  sinais: z.array(sinalApiSchema).default([]),
  fontes: z.array(fonteApiSchema).default([]),
  guardioesAvisados: z.number().nullish(),
  criadoEm: z.string(),
});

export type Veredito = z.infer<typeof vereditoSchema>;

export type CanalApi = z.infer<typeof canalApiSchema>;

export type SinalApi = z.infer<typeof sinalApiSchema>;

export type FonteApi = z.infer<typeof fonteApiSchema>;

export type VerificacaoApi = z.infer<typeof verificacaoApiSchema>;
