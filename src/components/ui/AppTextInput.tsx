import { ReactNode } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import type { AppColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

type Props<TFormData extends FieldValues> = {
  name: FieldPath<TFormData>;
  control: Control<TFormData>;
  label: string;
  mascara?: (valor: string) => string;
  acaoDireita?: ReactNode;
} & Omit<TextInputProps, "value" | "defaultValue" | "onChangeText" | "onBlur">;

function AppTextInput<TFormData extends FieldValues>({
  name,
  control,
  label,
  mascara,
  acaoDireita,
  style,
  ...props
}: Props<TFormData>) {
  const { colors } = useTheme();
  const styles = useThemedStyles(criarEstilos);

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View>
        <TextInput
          {...props}
          ref={ref}
          accessibilityLabel={label}
          style={[
            styles.input,
            acaoDireita !== undefined && styles.inputComAcao,
            error && styles.inputErro,
            style,
          ]}
          placeholderTextColor={colors.textLight}
          value={value ?? ""}
          onChangeText={(texto) => onChange(mascara ? mascara(texto) : texto)}
          onBlur={onBlur}
        />

        {acaoDireita && <View style={styles.acao}>{acaoDireita}</View>}
      </View>

      {error?.message && (
        <Text style={styles.erro} accessibilityLiveRegion="polite">
          {error.message}
        </Text>
      )}
    </View>
  );
}

const criarEstilos = (colors: AppColors, tamanho: Tamanho) =>
  StyleSheet.create({
    container: {
      gap: 6,
    },
    label: {
      fontFamily: Fonts.bold,
      fontSize: tamanho(15),
      color: colors.text,
    },
    input: {
      minHeight: 52,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontFamily: Fonts.regular,
      fontSize: tamanho(17),
      color: colors.text,
    },
    inputComAcao: {
      paddingRight: 56,
    },
    inputErro: {
      borderColor: colors.error,
    },
    acao: {
      position: "absolute",
      right: 4,
      top: 0,
      bottom: 0,
      justifyContent: "center",
    },
    erro: {
      fontFamily: Fonts.semiBold,
      fontSize: tamanho(14),
      color: colors.error,
    },
  });

export default AppTextInput;
