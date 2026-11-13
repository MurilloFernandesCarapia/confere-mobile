import { Redirect } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";
import { usePreferencias } from "@/providers/PreferenciasProvider";

export default function Index() {
  const { usuario } = useAuth();
  const { boasVindasConcluida } = usePreferencias();

  if (usuario !== null) {
    return <Redirect href="/inicio" />;
  }

  return <Redirect href={boasVindasConcluida ? "/login" : "/boas-vindas"} />;
}
