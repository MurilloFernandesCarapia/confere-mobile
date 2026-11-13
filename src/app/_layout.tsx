import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { arquivosDasFontes } from "@/constants/Fonts";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
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
  const { isLoading } = useAuth();
  const { colors, tema } = useTheme();

  if (isLoading) {
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
        }}
      />
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
      <ThemeProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
