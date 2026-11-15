import { StyleSheet, View } from "react-native";

import Chip from "@/components/ui/Chip";
import type { PreferenciaTema } from "@/providers/ThemeProvider";

type Props = {
  selecionado: PreferenciaTema;
  onSelecionar: (preferencia: PreferenciaTema) => void;
};

const OPCOES: { valor: PreferenciaTema; rotulo: string }[] = [
  { valor: "sistema", rotulo: "Igual ao celular" },
  { valor: "claro", rotulo: "Claro" },
  { valor: "escuro", rotulo: "Escuro" },
];

const SeletorTema = ({ selecionado, onSelecionar }: Props) => {
  return (
    <View style={styles.opcoes}>
      {OPCOES.map(({ valor, rotulo }) => (
        <Chip
          key={valor}
          rotulo={rotulo}
          selecionado={valor === selecionado}
          onPress={() => onSelecionar(valor)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  opcoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});

export default SeletorTema;
