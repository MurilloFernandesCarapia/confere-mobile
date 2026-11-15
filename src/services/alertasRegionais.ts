import { dotnetApi } from "@/lib/api";
import { alertaRegionalApiSchema } from "@/schemas/api/alertaRegional.api.schema";

export async function getAlertasRegionais(codIbge: number) {
  const response = await dotnetApi.get("/alertas-regionais", {
    params: { codIbge },
  });

  return alertaRegionalApiSchema.array().parse(response.data);
}
