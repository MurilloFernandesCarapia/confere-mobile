import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import SeletorMunicipio from "@/components/SeletorMunicipio";
import AppTextInput from "@/components/ui/AppTextInput";
import Aviso from "@/components/ui/Aviso";
import Botao from "@/components/ui/Botao";
import CampoSenha from "@/components/ui/CampoSenha";
import { aplicarMascaraData, aplicarMascaraTelefone } from "@/lib/mascaras";
import {
  SignUpFormData,
  signUpSchema,
} from "@/schemas/forms/signUp.form.schema";

type Props = {
  handleSignUp: (data: SignUpFormData) => void;
  isPending: boolean;
  errorMessage: string | null;
};

const SignUpForm = ({ handleSignUp, isPending, errorMessage }: Props) => {
  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dtNascimento: "",
      codIbgeMunicipio: 0,
      senha: "",
      confirmarSenha: "",
    },
  });

  return (
    <View style={styles.form}>
      <AppTextInput
        control={control}
        name="nome"
        label="Nome completo"
        placeholder="Como você se chama?"
        autoCapitalize="words"
        autoComplete="name"
      />

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
        name="telefone"
        label="Celular (opcional)"
        placeholder="(11) 98765-4321"
        keyboardType="phone-pad"
        autoComplete="tel"
        mascara={aplicarMascaraTelefone}
      />

      <AppTextInput
        control={control}
        name="dtNascimento"
        label="Data de nascimento"
        placeholder="dd/mm/aaaa"
        keyboardType="number-pad"
        mascara={aplicarMascaraData}
      />

      <SeletorMunicipio control={control} name="codIbgeMunicipio" />

      <CampoSenha
        control={control}
        name="senha"
        label="Senha"
        placeholder="Letras e números, 8 ou mais"
        novaSenha
      />

      <CampoSenha
        control={control}
        name="confirmarSenha"
        label="Repita a senha"
        placeholder="Digite a senha de novo"
        novaSenha
      />

      {errorMessage !== null && <Aviso tipo="erro" mensagem={errorMessage} />}

      <Botao
        titulo="Criar minha conta"
        carregando={isPending}
        onPress={handleSubmit(handleSignUp)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
});

export default SignUpForm;
