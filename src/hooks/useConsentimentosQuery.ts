import { useQuery } from "@tanstack/react-query";

import { getConsentimentos } from "@/services/consentimentos";

export function useConsentimentosQuery() {
  return useQuery({
    queryKey: ["consentimentos"],
    queryFn: getConsentimentos,
  });
}
