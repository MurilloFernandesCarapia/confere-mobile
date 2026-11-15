import { javaApi } from "@/lib/api";
import { municipioApiSchema } from "@/schemas/api/auth.api.schema";

export async function getMunicipios() {
  const response = await javaApi.get("/catalogos/municipios");

  return municipioApiSchema.array().parse(response.data);
}
