import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";

import AppTextInput from "@/components/ui/AppTextInput";
import { useTheme } from "@/providers/ThemeProvider";

type Props<TFormData extends FieldValues> = {
  name: FieldPath<TFormData>;
  control: Control<TFormData>;
  label: string;
  placeholder: string;
  novaSenha?: boolean;
};

function CampoSenha<TFormData extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  novaSenha = false,
}: Props<TFormData>) {
  const { colors } = useTheme();
  const [exibirSenha, setExibirSenha] = useState(false);

  return (
    <AppTextInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      autoCapitalize="none"
      autoComplete={novaSenha ? "new-password" : "current-password"}
      secureTextEntry={!exibirSenha}
      acaoDireita={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={exibirSenha ? "Esconder senha" : "Mostrar senha"}
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
  );
}

const styles = StyleSheet.create({
  olho: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CampoSenha;
