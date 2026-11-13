import { z } from "zod";

export const municipioApiSchema = z.object({
  codIbge: z.number(),
  nome: z.string(),
  uf: z.string(),
});

export const usuarioApiSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  perfil: z.string(),
  municipio: municipioApiSchema,
  fonteGrande: z.boolean(),
  audioAtivo: z.boolean(),
});

export const sessaoApiSchema = z.object({
  token: z.string(),
  tipo: z.string(),
  expiraEm: z.string(),
  usuario: usuarioApiSchema,
});

export const loginApiSchema = z.object({
  email: z.string(),
  senha: z.string(),
});

export const registroApiSchema = loginApiSchema.extend({
  nome: z.string(),
  telefone: z.string().optional(),
  dtNascimento: z.string(),
  codIbgeMunicipio: z.number(),
});

export type MunicipioApi = z.infer<typeof municipioApiSchema>;

export type UsuarioApi = z.infer<typeof usuarioApiSchema>;

export type SessaoApi = z.infer<typeof sessaoApiSchema>;

export type LoginApi = z.infer<typeof loginApiSchema>;

export type RegistroApi = z.infer<typeof registroApiSchema>;
