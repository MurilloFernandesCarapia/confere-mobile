import * as SecureStore from "expo-secure-store";

import { converterIsoParaData } from "@/lib/datas";
import type { SessaoApi } from "@/schemas/api/auth.api.schema";

const CHAVE_SESSAO = "confere.sessao";

export async function salvarSessao(sessao: SessaoApi) {
  await SecureStore.setItemAsync(CHAVE_SESSAO, JSON.stringify(sessao));
}

export async function removerSessao() {
  await SecureStore.deleteItemAsync(CHAVE_SESSAO);
}

export async function lerSessao(): Promise<SessaoApi | null> {
  const valor = await SecureStore.getItemAsync(CHAVE_SESSAO);

  if (valor === null) {
    return null;
  }

  const sessao = JSON.parse(valor) as SessaoApi;

  if (converterIsoParaData(sessao.expiraEm) <= new Date()) {
    await removerSessao();
    return null;
  }

  return sessao;
}
