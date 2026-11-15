import { z } from "zod";

import { calcularIdade, ehDataValida } from "@/lib/datas";
import { somenteDigitos } from "@/lib/mascaras";

export const signUpSchema = z
  .object({
    nome: z.string().trim().min(3, "Informe o seu nome completo."),
    email: z.email("Informe um e-mail válido."),
    telefone: z
      .string()
      .refine(
        (telefone) => telefone === "" || somenteDigitos(telefone).length >= 10,
        "Informe o telefone com DDD."
      ),
    dtNascimento: z
      .string()
      .refine(ehDataValida, "Informe a data no formato dia/mês/ano.")
      .refine(
        (data) => !ehDataValida(data) || calcularIdade(data) >= 16,
        "É preciso ter pelo menos 16 anos."
      )
      .refine(
        (data) => !ehDataValida(data) || calcularIdade(data) <= 120,
        "Confira o ano de nascimento."
      ),
    codIbgeMunicipio: z
      .number({ error: "Escolha a sua cidade." })
      .int()
      .positive("Escolha a sua cidade."),
    senha: z
      .string()
      .min(8, "A senha precisa ter pelo menos 8 caracteres.")
      .regex(/[A-Za-z]/, "A senha precisa ter pelo menos uma letra.")
      .regex(/\d/, "A senha precisa ter pelo menos um número."),
    confirmarSenha: z.string().min(1, "Repita a senha."),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não são iguais.",
    path: ["confirmarSenha"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
