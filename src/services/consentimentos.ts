import { VERSAO_TERMO } from "@/constants/Termo";
import { javaApi } from "@/lib/api";

export type Finalidade = "ANALISE_IA" | "ALERTA_GUARDIAO";

export async function registrarConsentimento(
  finalidade: Finalidade,
  aceito: boolean
) {
  await javaApi.post("/consentimentos", {
    finalidade,
    versaoTermo: VERSAO_TERMO,
    aceito,
  });
}
