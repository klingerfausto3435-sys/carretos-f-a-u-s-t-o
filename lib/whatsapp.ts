import { siteConfig } from "./site-config";

/** Tipos de serviço usados para pré-preencher a mensagem e rotular o evento. */
export type ServiceKey = "generic" | "small_move" | "furniture" | "carreto";

/**
 * Mensagens pré-preenchidas (MASTER_SPEC §11).
 * Curtas de propósito: texto longo faz o usuário apagar tudo antes de enviar.
 */
const MESSAGES: Record<ServiceKey, string> = {
  generic: `Olá! Vim pelo site e quero pedir um orçamento.

Tipo de serviço:
Origem:
Destino:
Data:
O que preciso transportar:`,

  small_move: `Olá! Vim pelo site e preciso de orçamento para uma pequena mudança.

Origem:
Destino:
Data:`,

  furniture: `Olá! Vim pelo site e preciso transportar móveis/eletrodomésticos.

Origem:
Destino:
Item(ns):
Data:`,

  carreto: `Olá! Vim pelo site e preciso de um carreto em BH.

Origem:
Destino:
Data:
O que preciso transportar:`,
};

/** Monta o link wa.me com a mensagem do contexto já preenchida. */
export function whatsappUrl(service: ServiceKey = "generic"): string {
  return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
    MESSAGES[service]
  )}`;
}

/** Mensagem avulsa, para casos pontuais como "consultar meu bairro". */
export function whatsappUrlWithText(text: string): string {
  return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(text)}`;
}
