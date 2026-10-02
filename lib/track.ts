/**
 * Camada de tracking (MASTER_SPEC §18).
 *
 * Não instala GA4/GTM — apenas empurra eventos para `dataLayer` e `gtag` SE
 * eles existirem. Sem tag instalada, tudo vira no-op silencioso e a página
 * continua funcionando. Isso mantém o botão principal livre de dependência
 * de script de terceiro (§19).
 */

import { siteConfig } from "./site-config";

export type Placement =
  | "header"
  | "hero"
  | "service_card"
  | "process"
  | "service_area"
  | "sticky"
  | "final_cta"
  | "footer";

export type ServiceKey = "generic" | "small_move" | "furniture" | "carreto";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

const STORAGE_KEY = "ft_attribution";

/**
 * Lê UTMs/gclid da URL e guarda em sessionStorage. A primeira visita da sessão
 * manda; assim o parâmetro não se perde se o usuário navegar para a política
 * de privacidade e voltar.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value;
    }
    if (Object.keys(fromUrl).length === 0) return;

    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return; // não sobrescreve a atribuição original da sessão
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // sessionStorage bloqueado (aba anônima, cookies off) — segue sem atribuição
  }
}

function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value;
    }
    if (Object.keys(fromUrl).length > 0) return fromUrl;

    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function push(event: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const payload = {
    ...params,
    page_path: window.location.pathname,
    ...getAttribution(),
  };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    window.gtag?.("event", event, payload);
  } catch {
    // tracking nunca pode derrubar a navegação do usuário
  }
}

/**
 * Dispara a conversão do Google Ads.
 *
 * Sem `event_callback` de propósito: os links do WhatsApp abrem em aba nova
 * e `tel:` não descarrega a página, então não há corrida entre o envio do
 * evento e a navegação. O callback só existe para links que trocam a página
 * atual, e usá-lo aqui adicionaria risco de travar o clique à toa.
 */
function fireConversion(sendTo: string | null): void {
  if (!sendTo || typeof window === "undefined") return;
  try {
    window.gtag?.("event", "conversion", { send_to: sendTo });
  } catch {
    // conversão nunca pode derrubar a navegação do usuário
  }
}

/** Conversão principal. Dispara UMA vez por clique, no próprio <a>. */
export function trackWhatsAppClick(
  placement: Placement,
  service: ServiceKey = "generic"
): void {
  push("click_whatsapp", { placement, service });
  fireConversion(siteConfig.googleAdsConversions.whatsapp);
}

/** Conversão secundária. */
export function trackPhoneClick(placement: Placement): void {
  push("click_phone", { placement });
  fireConversion(siteConfig.googleAdsConversions.phone);
}

/**
 * Eventos diagnósticos — NÃO marcar como conversão primária no Ads.
 *
 * Os quatro `triagem_*` existem para responder uma pergunta só: a triagem
 * está qualificando o lead ou está espantando? Compare `triagem_abriu` com
 * `triagem_concluiu`. Se a diferença for grande e `triagem_abandonou` subir,
 * a triagem está custando mais do que entrega e deve sair.
 */
export function trackDiagnostic(
  event:
    | "scroll_50"
    | "scroll_90"
    | "faq_open"
    | "service_card_view"
    | "triagem_abriu"
    | "triagem_concluiu"
    | "triagem_abandonou"
    | "triagem_pulou",
  params: Record<string, unknown> = {}
): void {
  push(event, params);
}
