import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { definirAccessToken, definirAoExpirarSessao } from "@/lib/api";
import { lerSessao, removerSessao, salvarSessao } from "@/lib/sessao";
import type { UsuarioApi } from "@/schemas/api/auth.api.schema";
import { login } from "@/services/auth";

type AuthContextValue = {
  usuario: UsuarioApi | null;
  isLoading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [usuario, setUsuario] = useState<UsuarioApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = useCallback(async () => {
    await removerSessao();
    definirAccessToken(null);
    setUsuario(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    lerSessao()
      .then((sessao) => {
        definirAccessToken(sessao?.token ?? null);
        setUsuario(sessao?.usuario ?? null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    definirAoExpirarSessao(() => {
      void signOut();
    });

    return () => {
      definirAoExpirarSessao(null);
    };
  }, [signOut]);

  async function signIn(email: string, senha: string) {
    const sessao = await login({ email: email.trim().toLowerCase(), senha });

    await salvarSessao(sessao);
    definirAccessToken(sessao.token);
    setUsuario(sessao.usuario);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth precisa estar dentro do AuthProvider");
  }

  return context;
}
