import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";

function ehPortugues(idioma: string) {
  return idioma.toLowerCase().replace("_", "-").startsWith("pt");
}

export function useLeitorDeTexto() {
  const [falando, setFalando] = useState(false);
  const [semVoz, setSemVoz] = useState(false);
  const vozPortugues = useRef<string | undefined>(undefined);

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then((vozes) => {
        const vozesEmPortugues = vozes.filter((voz) =>
          ehPortugues(voz.language)
        );
        const vozBrasil = vozesEmPortugues.find((voz) =>
          voz.language.toLowerCase().replace("_", "-").startsWith("pt-br")
        );

        vozPortugues.current = (vozBrasil ?? vozesEmPortugues[0])?.identifier;
      })
      .catch(() => undefined);

    return () => {
      Speech.stop();
    };
  }, []);

  function falar(texto: string) {
    Speech.stop();
    setSemVoz(false);
    setFalando(true);
    Speech.speak(texto, {
      language: "pt-BR",
      voice: vozPortugues.current,
      rate: 0.9,
      volume: 1,
      onDone: () => setFalando(false),
      onStopped: () => setFalando(false),
      onError: () => {
        setFalando(false);
        setSemVoz(true);
      },
    });
  }

  function parar() {
    Speech.stop();
    setFalando(false);
  }

  return { falando, semVoz, falar, parar };
}
