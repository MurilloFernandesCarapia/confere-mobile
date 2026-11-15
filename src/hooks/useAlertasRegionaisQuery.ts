import { useQuery } from "@tanstack/react-query";

import { getAlertasRegionais } from "@/services/alertasRegionais";

export function useAlertasRegionaisQuery(codIbge: number | undefined) {
  return useQuery({
    queryKey: ["alertas-regionais", codIbge],
    queryFn: () => getAlertasRegionais(codIbge as number),
    enabled: codIbge !== undefined,
  });
}
