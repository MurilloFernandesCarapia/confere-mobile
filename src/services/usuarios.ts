import { javaApi } from "@/lib/api";

export type Acessibilidade = {
  fonteGrande: boolean;
  audioAtivo: boolean;
};

export async function atualizarAcessibilidade(acessibilidade: Acessibilidade) {
  await javaApi.put("/usuarios/me", acessibilidade);
}
