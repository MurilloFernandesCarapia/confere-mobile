import { ScrollView, StyleSheet } from "react-native";

import Chip from "@/components/ui/Chip";
import { VEREDITOS } from "@/constants/Vereditos";
import type { Veredito } from "@/schemas/api/verificacao.api.schema";

type Props = {
  selecionado: Veredito | null;
  onSelecionar: (veredito: Veredito | null) => void;
};

const OPCOES: (Veredito | null)[] = [
  null,
  "GOLPE",
  "SUSPEITO",
  "OFICIAL",
  "DIREITO",
  "INCONCLUSIVO",
];

const FiltroVeredito = ({ selecionado, onSelecionar }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.lista}
    >
      {OPCOES.map((opcao) => (
        <Chip
          key={opcao ?? "TODOS"}
          rotulo={opcao === null ? "Todos" : VEREDITOS[opcao].rotulo}
          selecionado={opcao === selecionado}
          onPress={() => onSelecionar(opcao)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lista: {
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

export default FiltroVeredito;
