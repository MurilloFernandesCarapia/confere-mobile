import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm, useWatch } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

import SeletorCanal from "@/components/SeletorCanal";
import SeletorImagem from "@/components/SeletorImagem";
import Aviso from "@/components/ui/Aviso";
import Botao from "@/components/ui/Botao";
import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";
import {
  ConferirFormData,
  conferirSchema,
} from "@/schemas/forms/conferir.form.schema";

type Props = {
  handleConferir: (data: ConferirFormData) => void;
  isPending: boolean;
  errorMessage: string | null;
};

const ConferirForm = ({ handleConferir, isPending, errorMessage }: Props) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  const { control, handleSubmit } = useForm<ConferirFormData>({
    resolver: zodResolver(conferirSchema),
    defaultValues: {
      canal: "",
      texto: "",
      imagem: null,
    },
  });

  const {
    field: { onChange, onBlur, value },
    fieldState: { error: erroDoTexto },
  } = useController({ name: "texto", control });

  const temImagem = useWatch({ control, name: "imagem" }) !== null;

  return (
    <View style={styles.form}>
      <View style={styles.bloco}>
        <Text style={styles.titulo}>Mande a mensagem</Text>
        <Text style={styles.ajuda}>
          Tire uma foto, escolha um print ou cole o texto que você recebeu.
        </Text>

        <SeletorImagem control={control} name="imagem" />

        {!temImagem && (
          <TextInput
            accessibilityLabel="Texto da mensagem"
            style={[styles.texto, erroDoTexto && styles.textoErro]}
            placeholder="Ou cole aqui o texto da mensagem"
            placeholderTextColor={colors.textLight}
            multiline
            textAlignVertical="top"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}

        {erroDoTexto?.message && (
          <Text style={styles.erro}>{erroDoTexto.message}</Text>
        )}
      </View>

      <SeletorCanal control={control} name="canal" />

      {errorMessage !== null && <Aviso tipo="erro" mensagem={errorMessage} />}

      <Botao
        titulo={isPending ? "Conferindo..." : "Conferir agora"}
        icone="shield-checkmark-outline"
        variante="secundario"
        carregando={isPending}
        onPress={handleSubmit(handleConferir)}
      />
    </View>
  );
};

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    form: {
      gap: 24,
    },
    bloco: {
      gap: 12,
    },
    titulo: {
      fontFamily: Fonts.extraBold,
      fontSize: tamanho(20),
      color: colors.text,
    },
    ajuda: {
      fontFamily: Fonts.regular,
      fontSize: tamanho(16),
      color: colors.textSecondary,
    },
    texto: {
      minHeight: 140,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      backgroundColor: colors.surface,
      padding: 16,
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.text,
    },
    textoErro: {
      borderColor: colors.error,
    },
    erro: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.error,
    },
  });

export default ConferirForm;
