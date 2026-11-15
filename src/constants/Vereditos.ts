import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

import type { AppColors } from "@/constants/Colors";
import type { Desfecho, Veredito } from "@/schemas/api/verificacao.api.schema";

type InfoVeredito = {
  rotulo: string;
  resumo: string;
  icone: ComponentProps<typeof Ionicons>["name"];
  cor: keyof AppColors;
  fundo: keyof AppColors;
};

export const VEREDITOS: Record<Veredito, InfoVeredito> = {
  GOLPE: {
    rotulo: "Golpe",
    resumo: "Não responda, não clique e não pague.",
    icone: "close-circle",
    cor: "golpe",
    fundo: "golpeLight",
  },
  SUSPEITO: {
    rotulo: "Suspeito",
    resumo: "Tem sinais de golpe. Confirme no canal oficial antes de agir.",
    icone: "warning",
    cor: "suspeito",
    fundo: "suspeitoLight",
  },
  OFICIAL: {
    rotulo: "Oficial",
    resumo: "Parece uma mensagem verdadeira do órgão ou da empresa.",
    icone: "checkmark-circle",
    cor: "oficial",
    fundo: "oficialLight",
  },
  DIREITO: {
    rotulo: "Direito seu",
    resumo: "Pode ser um benefício que você tem direito de pedir.",
    icone: "gift",
    cor: "direito",
    fundo: "direitoLight",
  },
  INCONCLUSIVO: {
    rotulo: "Não deu para conferir",
    resumo: "Mande uma foto mais nítida ou cole o texto da mensagem.",
    icone: "help-circle",
    cor: "inconclusivo",
    fundo: "inconclusivoLight",
  },
};

export const SINAIS: Record<string, string> = {
  URGENCIA: "Pressa ou prazo curto",
  LINK_SUSPEITO: "Link suspeito",
  PEDIDO_SENHA: "Pede senha ou código",
  PEDIDO_SELFIE: "Pede selfie ou foto de documento",
  CHAVE_PIX: "Pede Pix",
  VALOR_DINHEIRO: "Fala de dinheiro",
  REMETENTE_DESCONHECIDO: "Remetente desconhecido",
  ORGAO_OFICIAL_CITADO: "Usa o nome de um órgão oficial",
};

export const DESFECHOS: Record<Desfecho, string> = {
  NAO_PAGUEI: "Não paguei nada",
  PAGUEI: "Infelizmente paguei",
  BLOQUEEI: "Bloqueei o contato",
  DENUNCIEI: "Denunciei",
  PEDI_BENEFICIO: "Pedi o benefício",
  OUTRO: "Outra coisa",
};
