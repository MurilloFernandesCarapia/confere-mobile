import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

export function useLeitorDeTexto() {
  const [falando, setFalando] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  function falar(texto: string) {
    Speech.stop();
    setFalando(true);
    Speech.speak(texto, {
      language: "pt-BR",
      rate: 0.9,
      onDone: () => setFalando(false),
      onStopped: () => setFalando(false),
      onError: () => setFalando(false),
    });
  }

  function parar() {
    Speech.stop();
    setFalando(false);
  }

  return { falando, falar, parar };
}
