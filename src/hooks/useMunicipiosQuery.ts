import { useQuery } from "@tanstack/react-query";

import { getMunicipios } from "@/services/catalogos";

export function useMunicipiosQuery() {
  return useQuery({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
