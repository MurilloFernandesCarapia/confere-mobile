import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { arquivosDasFontes } from "@/constants/Fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontesCarregadas, erroNasFontes] = useFonts(arquivosDasFontes);

  useEffect(() => {
    if (fontesCarregadas || erroNasFontes) {
      SplashScreen.hideAsync();
    }
  }, [fontesCarregadas, erroNasFontes]);

  if (!fontesCarregadas && !erroNasFontes) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}