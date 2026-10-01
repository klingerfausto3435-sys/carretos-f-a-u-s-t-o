"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import {
  whatsappUrl,
  whatsappUrlComTriagem,
  type ServiceKey,
} from "@/lib/whatsapp";
import { trackWhatsAppClick, trackDiagnostic, type Placement } from "@/lib/track";
import { WhatsAppIcon } from "./ui/icons";

/**
 * Triagem rápida antes de abrir o WhatsApp.
 *
 * Objetivo: o responsável receber o pedido já com tipo de serviço, origem,
 * destino e prazo, em vez de "oi, quanto custa?". De quebra, clique acidental
 * não vira notificação, porque ninguém responde três perguntas sem querer.
 *
 * Regras que esta tela respeita:
 * - Tela única, não assistente de várias etapas: menos passos, menos desistência.
 * - Duas das três perguntas são toque, não digitação.
 * - Nada sai do navegador. Não há backend, não há e-mail, não há cadastro:
 *   as respostas só montam o texto do link wa.me (§19 e §20 da spec).
 * - Saída sempre disponível: quem não quiser responder vai direto pelo
 *   "Prefiro falar direto", para a triagem nunca custar um lead.
 */

const SERVICOS: Array<{ key: ServiceKey; label: string }> = [
  { key: "small_move", label: "Pequena mudança" },
  { key: "furniture", label: "Móveis / eletro" },
  { key: "carreto", label: "Carreto local" },
];

const PRAZOS = ["Esta semana", "Este mês", "Ainda planejando"];

type Abertura = { service: ServiceKey; placement: Placement };

export function QuoteDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState<ServiceKey>("generic");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [quando, setQuando] = useState("");
  const [origemDoClique, setOrigemDoClique] = useState<Placement>("hero");

  // Os CTAs avisam por evento de DOM, não por contexto do React: assim o resto
  // da página continua sendo Server Component e não vai JS a mais para o cliente.
  useEffect(() => {
    const abrir = (event: Event) => {
      const { service: s, placement } = (event as CustomEvent<Abertura>).detail;
      setService(s);
      setOrigemDoClique(placement);
      dialogRef.current?.showModal();
      trackDiagnostic("triagem_abriu", { placement, service: s });
    };

    window.addEventListener("abrir-triagem", abrir);
    return () => window.removeEventListener("abrir-triagem", abrir);
  }, []);

  const fechar = () => dialogRef.current?.close();

  const respondido = Boolean(origem.trim() && destino.trim() && quando);

  const href = respondido
    ? whatsappUrlComTriagem({ service, origem, destino, quando })
    : whatsappUrl(service);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-triagem"
      className="m-0 w-full max-w-md rounded-t-2xl bg-cream p-0 backdrop:bg-ink/70 sm:m-auto sm:rounded-2xl"
      style={{ marginTop: "auto", marginBottom: 0 }}
      onClose={() => {
        // Quem abriu e saiu sem ir ao WhatsApp é justamente o número que diz
        // se a triagem está custando lead. Medir isso não é opcional.
        if (!respondido) {
          trackDiagnostic("triagem_abandonou", { placement: origemDoClique });
        }
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h2
            id="titulo-triagem"
            className="font-display text-[18px] font-extrabold leading-tight text-ink"
          >
            Três perguntas e a gente já abre o WhatsApp
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            Serve para o orçamento sair mais rápido e mais certo.
          </p>
        </div>
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-lg text-[22px] leading-none text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          ×
        </button>
      </div>

      <div className="space-y-5 px-5 py-5">
        <fieldset>
          <legend className="font-display text-[13.5px] font-bold text-ink">
            1. O que você precisa transportar?
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {SERVICOS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setService(key)}
                aria-pressed={service === key}
                className={`min-h-11 rounded-full border px-4 text-[13.5px] font-semibold transition-colors ${
                  service === key
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink hover:border-ink/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-[13.5px] font-bold text-ink">
            2. De onde para onde?
          </legend>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            <input
              type="text"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              placeholder="Bairro de origem"
              list="bairros-bh"
              autoComplete="off"
              aria-label="Bairro de origem"
              className="min-h-11 rounded-lg border border-line bg-white px-3 text-[14px] text-ink placeholder:text-muted"
            />
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Bairro de destino"
              list="bairros-bh"
              autoComplete="off"
              aria-label="Bairro de destino"
              className="min-h-11 rounded-lg border border-line bg-white px-3 text-[14px] text-ink placeholder:text-muted"
            />
          </div>
          {/* Sugestões, não restrição: atende BH inteira, não só estes bairros. */}
          <datalist id="bairros-bh">
            {siteConfig.serviceAreas.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </fieldset>

        <fieldset>
          <legend className="font-display text-[13.5px] font-bold text-ink">
            3. Para quando?
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PRAZOS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setQuando(p)}
                aria-pressed={quando === p}
                className={`min-h-11 rounded-full border px-4 text-[13.5px] font-semibold transition-colors ${
                  quando === p
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink hover:border-ink/40"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border-t border-line bg-white px-5 py-4">
        {/* Link de verdade, não window.open: nenhum bloqueador de pop-up
            atrapalha e o clique segue sendo gesto direto do usuário. */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackWhatsAppClick(origemDoClique, service);
            trackDiagnostic("triagem_concluiu", {
              placement: origemDoClique,
              service,
              completa: respondido,
            });
            fechar();
          }}
          className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-gold px-6 font-display text-[16px] font-bold text-ink shadow-[0_2px_0_0_var(--color-gold-deep)] transition-colors hover:bg-gold-deep hover:shadow-none"
        >
          <WhatsAppIcon className="size-[22px]" />
          {respondido ? "Abrir WhatsApp preenchido" : "Abrir WhatsApp"}
        </a>

        <button
          type="button"
          onClick={() => {
            trackDiagnostic("triagem_pulou", { placement: origemDoClique });
            window.open(whatsappUrl(service), "_blank", "noopener,noreferrer");
            trackWhatsAppClick(origemDoClique, service);
            fechar();
          }}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center text-[13px] text-muted underline decoration-line underline-offset-4 hover:text-ink"
        >
          Prefiro falar direto, sem responder
        </button>
      </div>
    </dialog>
  );
}
