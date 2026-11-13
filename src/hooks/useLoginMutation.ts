import { useMutation } from "@tanstack/react-query";

import { ehErroDeConexao } from "@/lib/erros";
import { useAuth } from "@/providers/AuthProvider";
import type { SignInFormData } from "@/schemas/forms/signIn.form.schema";

export function useLoginMutation() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: ({ email, senha }: SignInFormData) => signIn(email, senha),
    retry: (tentativas, error) => tentativas < 2 && ehErroDeConexao(error),
  });
}
