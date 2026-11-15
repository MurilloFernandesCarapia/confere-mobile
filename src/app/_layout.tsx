import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { arquivosDasFontes, Fonts } from "@/constants/Fonts";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import {
  PreferenciasProvider,
  usePreferencias,
} from "@/providers/PreferenciasProvider";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

function AppNavigator() {
  const { usuario, isLoading } = useAuth();
  const preferencias = usePreferencias();
  const { colors, tema, tamanho } = useTheme();

  if (isLoading || preferencias.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={tema === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerShadowVisible: false,
          headerTintColor: colors.textOnPrimary,
          headerTitleStyle: {
            fontFamily: Fonts.extraBold,
            fontSize: tamanho(20),
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="sobre"
          options={{ headerShown: true, title: "Sobre o app" }}
        />

        <Stack.Protected guard={usuario === null}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={usuario !== null}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="conferir"
            options={{ headerShown: true, title: "Conferir mensagem" }}
          />
          <Stack.Screen
            name="verificacao/[id]"
            options={{ headerShown: true, title: "Resultado" }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}

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

  return (
    <QueryClientProvider client={queryClient}>
      <PreferenciasProvider>
        <ThemeProvider>
          <AuthProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </AuthProvider>
        </ThemeProvider>
      </PreferenciasProvider>
    </QueryClientProvider>
  );
}
