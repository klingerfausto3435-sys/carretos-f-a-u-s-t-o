"use client";

import { useEffect, useRef } from "react";
import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { trackDiagnostic } from "@/lib/track";
import type { ServiceKey } from "@/lib/whatsapp";

/**
 * BLOCO 3 — "O que você precisa transportar?" (MASTER_SPEC §10).
 *
 * Exatamente três cards. Nada de frete interestadual, guarda-móveis, içamento
 * ou montagem: nenhum desses serviços foi confirmado pelo cliente (§4).
 * Cada card abre o WhatsApp com o tipo de serviço já escrito na mensagem.
 */
const SERVICES: Array<{
  key: ServiceKey;
  title: string;
  text: string;
}> = [
  {
    key: "small_move",
    title: "Pequena mudança",
    text: "Apartamento, casa pequena, kitnet ou mudança com poucos volumes.",
  },
  {
    key: "furniture",
    title: "Móveis e eletrodomésticos",
    text: "Sofá, geladeira, cama, mesa, guarda-roupa e outros itens.",
  },
  {
    key: "carreto",
    title: "Carreto pequeno",
    text: "Carreto local entre bairros de BH e regiões próximas, para poucos volumes.",
  },
];

export function ServiceIntentCards() {
  const ref = useRef<HTMLDivElement>(null);

  // Evento diagnóstico: o bloco chegou a ser visto? Dispara uma vez só.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          trackDiagnostic("service_card_view");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" className="bg-cream py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink sm:text-[34px]">
          O que você precisa transportar?
        </h2>
        <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
          Escolha o que mais parece com o seu caso. O WhatsApp já abre com o
          tipo de serviço preenchido.
        </p>

        <div ref={ref} className="mt-7 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {SERVICES.map(({ key, title, text }) => (
            <article
              key={key}
              className="flex flex-col rounded-card border border-line bg-white p-5 transition-colors hover:border-ink/25"
            >
              <h3 className="font-display text-[17px] font-bold leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">
                {text}
              </p>
              <CtaWhatsApp
                placement="service_card"
                service={key}
                variant="outlineLight"
                size="sm"
                fullWidth
                className="mt-5"
              >
                Pedir orçamento
              </CtaWhatsApp>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
