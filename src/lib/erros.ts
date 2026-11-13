import { isAxiosError } from "axios";

type ErroDeCampo = {
  campo: string;
  mensagem: string;
};

type ProblemDetails = {
  title?: string;
  detail?: string;
  status?: number;
  codigo?: string;
  erros?: ErroDeCampo[];
};

const mensagensPorCodigo: Record<string, string> = {
  NAO_AUTENTICADO: "Sua sessão terminou. Entre de novo para continuar.",
  SEM_PERMISSAO: "Sua conta não pode fazer essa ação.",
  CONSENTIMENTO_PENDENTE:
    "Para conferir mensagens, aceite o uso dos seus dados na análise.",
  NAO_ENCONTRADO: "Não encontramos esse registro.",
  CONFLITO: "Essa ação não pode ser feita agora.",
  DENUNCIA_DUPLICADA:
    "Você já denunciou esse contato nas últimas 24 horas. Obrigado!",
  GUARDIAO_DUPLICADO: "Essa pessoa já é sua guardiã ou já recebeu um convite.",
  IDEMPOTENCIA_CORPO_DIFERENTE:
    "Esse envio já foi feito com outros dados. Tente de novo.",
  LIMITE_EXCEDIDO:
    "Muitas tentativas seguidas. Espere um minuto e tente de novo.",
  SERVICO_IA_INDISPONIVEL:
    "A análise está fora do ar agora. Tente de novo em alguns minutos.",
};

export function ehErroDeConexao(error: unknown) {
  return isAxiosError(error) && error.response === undefined;
}

export function traduzirErro(error: unknown) {
  if (!isAxiosError(error)) {
    return "Não foi possível concluir. Tente de novo.";
  }

  if (error.response === undefined) {
    return "Não foi possível falar com o Confere. Confira sua internet e tente de novo.";
  }

  const { status, data } = error.response;
  const problema = (data ?? {}) as ProblemDetails;

  if (problema.codigo === "VALIDACAO") {
    return (
      problema.erros?.[0]?.mensagem ??
      problema.detail ??
      "Confira os dados preenchidos."
    );
  }

  if (problema.codigo !== undefined && mensagensPorCodigo[problema.codigo]) {
    return mensagensPorCodigo[problema.codigo];
  }

  if (status === 401) {
    return "E-mail ou senha incorretos.";
  }

  if (typeof problema.detail === "string") {
    return problema.detail;
  }

  return "Não foi possível concluir. Tente de novo.";
}
