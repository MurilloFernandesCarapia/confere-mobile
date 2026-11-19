import { MUNICIPIOS_ATENDIDOS } from "@/constants/Municipios";
import { javaApi } from "@/lib/api";
import { municipioApiSchema } from "@/schemas/api/auth.api.schema";
import { canalApiSchema } from "@/schemas/api/verificacao.api.schema";

export async function getMunicipios() {
  try {
    const response = await javaApi.get("/catalogos/municipios");

    return municipioApiSchema.array().parse(response.data);
  } catch {
    return MUNICIPIOS_ATENDIDOS;
  }
}

export async function getCanais() {
  const response = await javaApi.get("/catalogos/canais");

  return canalApiSchema.array().parse(response.data);
}
