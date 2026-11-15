import { javaApi } from "@/lib/api";
import { municipioApiSchema } from "@/schemas/api/auth.api.schema";
import { canalApiSchema } from "@/schemas/api/verificacao.api.schema";

export async function getMunicipios() {
  const response = await javaApi.get("/catalogos/municipios");

  return municipioApiSchema.array().parse(response.data);
}

export async function getCanais() {
  const response = await javaApi.get("/catalogos/canais");

  return canalApiSchema.array().parse(response.data);
}
