import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Logout from "@/components/Logout";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useAuth } from "@/providers/AuthProvider";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

const PerfilScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const { usuario, signOut } = useAuth();

  if (usuario === null) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <View style={styles.cartao}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color={colors.textOnPrimary} />
        </View>
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.detalhe}>{usuario.email}</Text>
        <Text style={styles.detalhe}>
          {usuario.municipio.nome} - {usuario.municipio.uf}
        </Text>
      </View>

      <Logout onSignOut={signOut} />
    </ScrollView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    conteudo: {
      padding: 24,
      gap: 24,
    },
    cartao: {
      alignItems: "center",
      gap: 4,
      borderRadius: 20,
      backgroundColor: colors.surface,
      padding: 24,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      marginBottom: 8,
    },
    nome: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(22),
      color: colors.text,
      textAlign: "center",
    },
    detalhe: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      color: colors.textSecondary,
      textAlign: "center",
    },
  });

export default PerfilScreen;
