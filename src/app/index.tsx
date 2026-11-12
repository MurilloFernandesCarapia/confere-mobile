import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";

import { darkColors, lightColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

const VEREDITOS = [
  { rotulo: "Golpe", cor: "golpe", fundo: "golpeLight" },
  { rotulo: "Suspeito", cor: "suspeito", fundo: "suspeitoLight" },
  { rotulo: "Oficial", cor: "oficial", fundo: "oficialLight" },
  { rotulo: "Direito", cor: "direito", fundo: "direitoLight" },
] as const;

export default function Index() {
  const esquema = useColorScheme();
  const colors = esquema === "dark" ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={
          esquema === "dark"
            ? require("@/assets/images/logo-dark.png")
            : require("@/assets/images/logo.png")
        }
        style={styles.logo}
        accessibilityIgnoresInvertColors
      />
      <Text style={[styles.marca, { color: colors.link }]}>confere</Text>
      <Text style={[styles.slogan, { color: colors.textSecondary }]}>
        Antes de clicar, pagar ou desistir de um direito: confere.
      </Text>

      <View style={styles.vereditos}>
        {VEREDITOS.map((veredito) => (
          <View
            key={veredito.rotulo}
            style={[styles.chip, { backgroundColor: colors[veredito.fundo] }]}
          >
            <Text style={[styles.chipTexto, { color: colors[veredito.cor] }]}>
              {veredito.rotulo}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  marca: {
    fontFamily: Fonts.extraBold,
    fontSize: 44,
    marginTop: 8,
  },
  slogan: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 26,
  },
  vereditos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipTexto: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});