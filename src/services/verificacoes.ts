import { javaApi } from "@/lib/api";
import { verificacaoApiSchema } from "@/schemas/api/verificacao.api.schema";

export type ImagemDaVerificacao = {
  uri: string;
  nome: string;
  tipo: string;
};

export type NovaVerificacao = {
  canal: string;
  texto: string;
  imagem: ImagemDaVerificacao | null;
};

function ehSoUmLink(texto: string) {
  return /^(https?:\/\/|www\.)\S+$/i.test(texto.trim());
}

export async function criarVerificacao({
  canal,
  texto,
  imagem,
}: NovaVerificacao) {
  if (imagem !== null) {
    const formData = new FormData();

    formData.append("tipoEntrada", "IMAGEM");
    formData.append("canal", canal);
    formData.append("modo", "ONLINE");
    formData.append("imagem", {
      uri: imagem.uri,
      name: imagem.nome,
      type: imagem.tipo,
    } as unknown as Blob);

    const response = await javaApi.post("/verificacoes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return verificacaoApiSchema.parse(response.data);
  }

  const response = await javaApi.post("/verificacoes", {
    tipoEntrada: ehSoUmLink(texto) ? "LINK" : "TEXTO",
    conteudo: texto.trim(),
    canal,
    modo: "ONLINE",
  });

  return verificacaoApiSchema.parse(response.data);
}

export async function getVerificacao(id: number) {
  const response = await javaApi.get(`/verificacoes/${id}`);

  return verificacaoApiSchema.parse(response.data);
}
