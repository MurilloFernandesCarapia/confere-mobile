import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import AppTextInput from "@/components/ui/AppTextInput";
import Aviso from "@/components/ui/Aviso";
import Botao from "@/components/ui/Botao";
import CampoSenha from "@/components/ui/CampoSenha";
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
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  return (
    <View style={styles.form}>
      {errorMessage !== null && <Aviso tipo="erro" mensagem={errorMessage} />}

      <AppTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="voce@email.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
      />

      <CampoSenha
        control={control}
        name="senha"
        label="Senha"
        placeholder="Digite sua senha"
      />

      <Botao
        titulo="Entrar"
        carregando={isPending}
        onPress={handleSubmit(handleSignIn)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
});

export default SignInForm;
