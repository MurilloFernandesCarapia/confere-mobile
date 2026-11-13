import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppTextInput from "@/components/ui/AppTextInput";
import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import {
  SignInFormData,
  signInSchema,
} from "@/schemas/forms/signIn.form.schema";

type Props = {
  handleSignIn: (data: SignInFormData) => void;
  isPending: boolean;
  errorMessage: string | null;
};

const SignInForm = ({ handleSignIn, isPending, errorMessage }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  const [exibirSenha, setExibirSenha] = useState(false);

  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  return (
    <View style={styles.form}>
      {errorMessage !== null && (
        <View style={styles.erroGeral} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={22} color={colors.error} />
          <Text style={styles.erroGeralTexto}>{errorMessage}</Text>
        </View>
      )}

      <AppTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="voce@email.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
      />

      <AppTextInput
        control={control}
        name="senha"
        label="Senha"
        placeholder="Digite sua senha"
        autoComplete="current-password"
        secureTextEntry={!exibirSenha}
        acaoDireita={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              exibirSenha ? "Esconder senha" : "Mostrar senha"
            }
            style={styles.olho}
            onPress={() => setExibirSenha(!exibirSenha)}
          >
            <Ionicons
              name={exibirSenha ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={colors.textSecondary}
            />
          </Pressable>
        }
      />

      <Botao
        titulo="Entrar"
        carregando={isPending}
        onPress={handleSubmit(handleSignIn)}
      />
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    form: {
      gap: 16,
    },
    erroGeral: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderRadius: 14,
      backgroundColor: colors.errorLight,
      padding: 14,
    },
    erroGeralTexto: {
      flex: 1,
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(15),
      color: colors.error,
    },
    olho: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default SignInForm;
