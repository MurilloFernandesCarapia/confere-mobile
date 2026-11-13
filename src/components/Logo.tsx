import { Image, StyleSheet } from "react-native";

import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  tamanho?: number;
};

const Logo = ({ tamanho = 96 }: Props) => {
  const { tema } = useTheme();

  return (
    <Image
      source={
        tema === "dark"
          ? require("@/assets/images/logo-dark.png")
          : require("@/assets/images/logo.png")
      }
      style={[styles.logo, { width: tamanho, height: tamanho }]}
      accessibilityLabel="Logo do Confere"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
  },
});

export default Logo;
