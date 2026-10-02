"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";

/**
 * CTA fixo no rodapé em telas pequenas (contexto mestre §11 e §13).
 *
 * Some enquanto um CTA principal estiver visível. Sem isso, o botão do hero
 * e a barra fixa aparecem juntos na mesma tela e disputam o mesmo clique —
 * dois botões de WhatsApp empilhados confundem em vez de converter.
 *
 * Observa os elementos marcados com `data-cta-principal`, então basta
 * passar `ctaPrincipal` no CTA para ele entrar na regra.
 */
export function MobileStickyCta() {
  const [escondido, setEscondido] = useState(false);

  useEffect(() => {
    const alvos = document.querySelectorAll("[data-cta-principal]");
    if (alvos.length === 0 || typeof IntersectionObserver === "undefined") return;

    const visiveis = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visiveis.add(entry.target);
          else visiveis.delete(entry.target);
        }
        setEscondido(visiveis.size > 0);
      },
      // Margem inferior negativa: o CTA só "conta" como visível quando está
      // acima da faixa ocupada pela própria barra fixa.
      { threshold: 0.4, rootMargin: "0px 0px -96px 0px" }
    );

    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={escondido}
      className={[
        "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-safe backdrop-blur sm:hidden",
        "transition-[transform,opacity] duration-200",
        escondido
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100",
      ].join(" ")}
    >
      <Container className="!px-0">
        <CtaWhatsApp placement="sticky" service="generic" fullWidth>
          WhatsApp · Pedir orçamento
        </CtaWhatsApp>
      </Container>
    </div>
  );
}
