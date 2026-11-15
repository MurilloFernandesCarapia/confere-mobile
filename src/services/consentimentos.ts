import { z } from "zod";

import { VERSAO_TERMO } from "@/constants/Termo";
import { javaApi } from "@/lib/api";
import {
  consentimentoApiSchema,
  Finalidade,
} from "@/schemas/api/consentimento.api.schema";

export async function getConsentimentos() {
  const response = await javaApi.get("/consentimentos");

  return z.array(consentimentoApiSchema).parse(response.data);
}

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
