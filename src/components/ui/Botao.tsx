import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Variante = "primario" | "secundario" | "contorno" | "perigo";

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: Variante;
  icone?: ComponentProps<typeof Ionicons>["name"];
  carregando?: boolean;
  desabilitado?: boolean;
  accessibilityLabel?: string;
};

const Botao = ({
  titulo,
  onPress,
  variante = "primario",
  icone,
  carregando = false,
  desabilitado = false,
  accessibilityLabel,
}: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const bloqueado = desabilitado || carregando;

  const corDoTexto: Record<Variante, string> = {
    primario: colors.textOnPrimary,
    secundario: colors.textOnPrimary,
    contorno: colors.link,
    perigo: colors.error,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? titulo}
      accessibilityState={{ disabled: bloqueado, busy: carregando }}
      disabled={bloqueado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.botao,
        styles[variante],
        bloqueado && styles.bloqueado,
        pressed && styles.pressionado,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={corDoTexto[variante]} />
      ) : (
        <>
          {icone && (
            <Ionicons name={icone} size={22} color={corDoTexto[variante]} />
          )}
          <Text style={[styles.texto, { color: corDoTexto[variante] }]}>
            {titulo}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    botao: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 14,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    primario: {
      backgroundColor: colors.primary,
    },
    secundario: {
      backgroundColor: colors.secondary,
    },
    contorno: {
      borderWidth: 2,
      borderColor: colors.link,
      backgroundColor: "transparent",
    },
    perigo: {
      borderWidth: 1,
      borderColor: colors.error,
      backgroundColor: colors.errorLight,
    },
    bloqueado: {
      opacity: 0.5,
    },
    pressionado: {
      opacity: 0.85,
    },
    texto: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(17),
    },
  });

export default Botao;
