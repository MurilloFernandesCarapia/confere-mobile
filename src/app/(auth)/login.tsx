import { router, useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/components/Logo";
import SignInForm from "@/components/SignInForm";
import Aviso from "@/components/ui/Aviso";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { Tamanho } from "@/providers/ThemeProvider";
import { SignInFormData } from "@/schemas/forms/signIn.form.schema";

const LoginScreen = () => {
  const styles = useThemedStyles(criarEstilos);
  const { cadastrado } = useLocalSearchParams<{ cadastrado?: string }>();
  const { mutate, isError, error, isPending } = useLoginMutation();

  function handleSignIn(data: SignInFormData) {
    mutate(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.marca}>
            <Logo tamanho={88} />
            <Text style={styles.titulo}>Entrar no Confere</Text>
            <Text style={styles.subtitulo}>
              Use o e-mail e a senha que você cadastrou.
            </Text>
          </View>

          {cadastrado === "1" && !isError && (
            <View style={styles.aviso}>
              <Aviso
                tipo="sucesso"
                mensagem="Conta criada! Agora entre com o seu e-mail e a sua senha."
              />
            </View>
          )}

          <SignInForm
            handleSignIn={handleSignIn}
            isPending={isPending}
            errorMessage={isError ? traduzirErro(error) : null}
          />

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>Ainda não tem conta?</Text>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Criar uma conta"
              style={styles.rodapeBotao}
              onPress={() => router.push("/cadastro")}
            >
              <Text style={styles.rodapeLink}>Criar conta</Text>
            </Pressable>
          </View>
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
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
    },
    marca: {
      alignItems: "center",
      gap: 8,
      marginBottom: 32,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(26),
      color: colors.text,
    },
    subtitulo: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.textSecondary,
      textAlign: "center",
    },
    aviso: {
      marginBottom: 16,
    },
    rodape: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 24,
    },
    rodapeTexto: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      color: colors.textSecondary,
    },
    rodapeBotao: {
      minHeight: 48,
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    rodapeLink: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(16),
      color: colors.link,
    },
  });

export default LoginScreen;
