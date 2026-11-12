import { AxiosInstance, create, isAxiosError } from "axios";

const JAVA_API_URL =
  process.env.EXPO_PUBLIC_JAVA_API_URL ?? "http://10.0.2.2:8080";
const DOTNET_API_URL =
  process.env.EXPO_PUBLIC_DOTNET_API_URL ?? "http://10.0.2.2:5080";

let accessToken: string | null = null;
let aoExpirarSessao: (() => void) | null = null;

export function definirAccessToken(token: string | null) {
  accessToken = token;
}

export function definirAoExpirarSessao(callback: (() => void) | null) {
  aoExpirarSessao = callback;
}

function criarCliente(baseURL: string): AxiosInstance {
  const cliente = create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  cliente.interceptors.request.use((config) => {
    if (accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  cliente.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        isAxiosError(error) &&
        error.response?.status === 401 &&
        accessToken !== null
      ) {
        aoExpirarSessao?.();
      }

      return Promise.reject(error);
    }
  );

  return cliente;
}

export const javaApi = criarCliente(`${JAVA_API_URL}/api`);

export const dotnetApi = criarCliente(DOTNET_API_URL);