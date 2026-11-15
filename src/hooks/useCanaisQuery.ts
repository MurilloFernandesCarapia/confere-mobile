import { useQuery } from "@tanstack/react-query";

import { getCanais } from "@/services/catalogos";

export function useCanaisQuery() {
  return useQuery({
    queryKey: ["canais"],
    queryFn: getCanais,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
