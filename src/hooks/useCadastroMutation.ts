import { useMutation } from "@tanstack/react-query";

import { converterDataParaIso } from "@/lib/datas";
import { somenteDigitos } from "@/lib/mascaras";
import type { SignUpFormData } from "@/schemas/forms/signUp.form.schema";
import { registrarUsuario } from "@/services/auth";

export function useCadastroMutation() {
  return useMutation({
    mutationFn: ({
      nome,
      email,
      telefone,
      dtNascimento,
      codIbgeMunicipio,
      senha,
    }: SignUpFormData) =>
      registrarUsuario({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone === "" ? undefined : somenteDigitos(telefone),
        dtNascimento: converterDataParaIso(dtNascimento),
        codIbgeMunicipio,
        senha,
      }),
  });
}
