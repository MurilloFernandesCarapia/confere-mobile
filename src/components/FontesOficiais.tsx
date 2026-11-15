import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import type { FonteApi } from "@/schemas/api/verificacao.api.schema";

type Props = {
  fontes: FonteApi[];
};

const FontesOficiais = ({ fontes }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  if (fontes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Confira nos canais oficiais</Text>

      {fontes.map((fonte) => (
        <Pressable
          key={fonte.url}
          accessibilityRole="link"
          accessibilityLabel={`Abrir ${fonte.titulo}`}
          style={styles.fonte}
          onPress={() => Linking.openURL(fonte.url)}
        >
          <Ionicons name="open-outline" size={22} color={colors.link} />
          <Text style={styles.fonteTexto}>{fonte.titulo}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
    },
    fonte: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    fonteTexto: {
      flex: 1,
      fontFamily: Fonts.bold,
      fontSize: tamanho(16),
      color: colors.link,
      textDecorationLine: "underline",
    },
  });

export default FontesOficiais;
