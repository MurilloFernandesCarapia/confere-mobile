import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SystemUI from "expo-system-ui";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { AppColors, darkColors, lightColors } from "@/constants/Colors";
import { usePreferencias } from "@/providers/PreferenciasProvider";

export type PreferenciaTema = "claro" | "escuro" | "sistema";

type Tema = "light" | "dark";

export type Tamanho = (tamanhoBase: number) => number;

type ThemeContextValue = {
  colors: AppColors;
  tema: Tema;
  preferencia: PreferenciaTema;
  tamanho: Tamanho;
  alterarPreferencia: (preferencia: PreferenciaTema) => Promise<void>;
};

const CHAVE_TEMA = "confere.tema";
const ESCALA_FONTE_GRANDE = 1.25;

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolverTema(
  preferencia: PreferenciaTema,
  esquemaDoSistema: string | null | undefined
): Tema {
  if (preferencia === "claro") {
    return "light";
  }

  if (preferencia === "escuro") {
    return "dark";
  }

  return esquemaDoSistema === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const esquemaDoSistema = useColorScheme();
  const { fonteGrande } = usePreferencias();
  const [preferencia, setPreferencia] = useState<PreferenciaTema>("sistema");

  useEffect(() => {
    AsyncStorage.getItem(CHAVE_TEMA).then((temaSalvo) => {
      if (
        temaSalvo === "claro" ||
        temaSalvo === "escuro" ||
        temaSalvo === "sistema"
      ) {
        setPreferencia(temaSalvo);
      }
    });
  }, []);

  async function alterarPreferencia(novaPreferencia: PreferenciaTema) {
    setPreferencia(novaPreferencia);
    await AsyncStorage.setItem(CHAVE_TEMA, novaPreferencia);
  }

  const tema = resolverTema(preferencia, esquemaDoSistema);
  const colors = tema === "dark" ? darkColors : lightColors;

  const tamanho = useMemo<Tamanho>(
    () => (tamanhoBase) =>
      Math.round(tamanhoBase * (fonteGrande ? ESCALA_FONTE_GRANDE : 1)),
    [fonteGrande]
  );

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => undefined);
  }, [colors]);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        tema,
        preferencia,
        tamanho,
        alterarPreferencia,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme precisa estar dentro do ThemeProvider");
  }

  return context;
}
