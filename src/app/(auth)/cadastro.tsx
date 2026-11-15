import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUpForm from "@/components/SignUpForm";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useCadastroMutation } from "@/hooks/useCadastroMutation";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import { SignUpFormData } from "@/schemas/forms/signUp.form.schema";

const CadastroScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);
  const { mutate, isError, error, isPending } = useCadastroMutation();

  function handleSignUp(data: SignUpFormData) {
    mutate(data, {
      onSuccess: () => {
        router.replace({ pathname: "/login", params: { cadastrado: "1" } });
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para o login"
            style={styles.voltar}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={26} color={colors.text} />
          </Pressable>

          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Criar conta</Text>
            <Text style={styles.subtitulo}>
              Leva menos de um minuto. Seus dados ficam protegidos.
            </Text>
          </View>

          <SignUpForm
            handleSignUp={handleSignUp}
            isPending={isPending}
            errorMessage={
              isError
                ? traduzirErro(error, {
                    CONFLITO:
                      "Este e-mail já tem uma conta. Entre com ele ou use outro e-mail.",
                  })
                : null
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    conteudo: {
      padding: 24,
      gap: 8,
    },
    voltar: {
      width: 48,
      height: 48,
      justifyContent: "center",
    },
    cabecalho: {
      gap: 4,
      marginBottom: 16,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(28),
      color: colors.text,
    },
    subtitulo: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.textSecondary,
    },
  });

export default CadastroScreen;
