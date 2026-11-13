import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type PreferenciasContextValue = {
  fonteGrande: boolean;
  audioAtivo: boolean;
  boasVindasConcluida: boolean;
  isLoading: boolean;
  alterarFonteGrande: (fonteGrande: boolean) => Promise<void>;
  alterarAudioAtivo: (audioAtivo: boolean) => Promise<void>;
  concluirBoasVindas: () => Promise<void>;
};

const CHAVE_FONTE_GRANDE = "confere.fonteGrande";
const CHAVE_AUDIO_ATIVO = "confere.audioAtivo";
const CHAVE_BOAS_VINDAS = "confere.boasVindas";

const PreferenciasContext = createContext<PreferenciasContextValue | null>(
  null
);

export function PreferenciasProvider({ children }: PropsWithChildren) {
  const [fonteGrande, setFonteGrande] = useState(false);
  const [audioAtivo, setAudioAtivo] = useState(false);
  const [boasVindasConcluida, setBoasVindasConcluida] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.multiGet([
      CHAVE_FONTE_GRANDE,
      CHAVE_AUDIO_ATIVO,
      CHAVE_BOAS_VINDAS,
    ])
      .then(([[, fonte], [, audio], [, boasVindas]]) => {
        setFonteGrande(fonte === "S");
        setAudioAtivo(audio === "S");
        setBoasVindasConcluida(boasVindas === "S");
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function alterarFonteGrande(novaFonteGrande: boolean) {
    setFonteGrande(novaFonteGrande);
    await AsyncStorage.setItem(CHAVE_FONTE_GRANDE, novaFonteGrande ? "S" : "N");
  }

  async function alterarAudioAtivo(novoAudioAtivo: boolean) {
    setAudioAtivo(novoAudioAtivo);
    await AsyncStorage.setItem(CHAVE_AUDIO_ATIVO, novoAudioAtivo ? "S" : "N");
  }

  async function concluirBoasVindas() {
    setBoasVindasConcluida(true);
    await AsyncStorage.setItem(CHAVE_BOAS_VINDAS, "S");
  }

  return (
    <PreferenciasContext.Provider
      value={{
        fonteGrande,
        audioAtivo,
        boasVindasConcluida,
        isLoading,
        alterarFonteGrande,
        alterarAudioAtivo,
        concluirBoasVindas,
      }}
    >
      {children}
    </PreferenciasContext.Provider>
  );
}

export function usePreferencias() {
  const context = useContext(PreferenciasContext);

  if (context === null) {
    throw new Error(
      "usePreferencias precisa estar dentro do PreferenciasProvider"
    );
  }

  return context;
}
