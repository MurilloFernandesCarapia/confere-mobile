import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/components/Logo";
import SignInForm from "@/components/SignInForm";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { traduzirErro } from "@/lib/erros";
import { Tamanho } from "@/providers/ThemeProvider";
import { SignInFormData } from "@/schemas/forms/signIn.form.schema";

const LoginScreen = () => {
  const styles = useThemedStyles(criarEstilos);
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

          <SignInForm
            handleSignIn={handleSignIn}
            isPending={isPending}
            errorMessage={isError ? traduzirErro(error) : null}
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
  });

export default LoginScreen;
