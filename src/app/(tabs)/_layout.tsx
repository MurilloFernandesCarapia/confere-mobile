import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/providers/ThemeProvider";

export default function TabsLayout() {
  const { colors, tamanho } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerShadowVisible: false,
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: {
          fontFamily: Fonts.extraBold,
          fontSize: tamanho(20),
        },
        headerTitleAlign: "left",
        tabBarActiveTintColor: colors.link,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.bold,
          fontSize: tamanho(12),
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: "Confere",
          tabBarLabel: "Início",
          tabBarAccessibilityLabel: "Início",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? colors.link : colors.textSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: "Meu histórico",
          tabBarLabel: "Histórico",
          tabBarAccessibilityLabel: "Histórico",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={24}
              color={focused ? colors.link : colors.textSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Meu perfil",
          tabBarLabel: "Perfil",
          tabBarAccessibilityLabel: "Perfil",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? colors.link : colors.textSecondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
