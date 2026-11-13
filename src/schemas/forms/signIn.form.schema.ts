import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  senha: z.string().min(1, "Informe a sua senha."),
});

export type SignInFormData = z.infer<typeof signInSchema>;
