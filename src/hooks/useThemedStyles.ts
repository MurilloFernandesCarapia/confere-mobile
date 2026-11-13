import { useMemo } from "react";

import type { AppColors } from "@/constants/Colors";
import { Tamanho, useTheme } from "@/providers/ThemeProvider";

export function useThemedStyles<T>(
  criarEstilos: (colors: AppColors, tamanho: Tamanho) => T
) {
  const { colors, tamanho } = useTheme();

  return useMemo(
    () => criarEstilos(colors, tamanho),
    [colors, tamanho, criarEstilos]
  );
}
