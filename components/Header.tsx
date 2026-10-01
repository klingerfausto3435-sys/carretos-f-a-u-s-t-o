import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import logo from "@/public/brand/logo-fausto-transportes.webp";

/**
 * BLOCO 0 — Header mínimo (MASTER_SPEC §10).
 *
 * Sem menu, sem hambúrguer, sem navegação institucional: a única saída é o
 * contato. Não é sticky de propósito — em mobile o CTA fixo do rodapé já
 * garante acesso permanente e duas barras fixas comeriam a primeira dobra.
 */
export function Header() {
  return (
    <header className="border-b border-white/10 bg-ink">
      <Container>
        <div className="flex items-center justify-between gap-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src={logo}
              alt={`${siteConfig.brandName} — ${siteConfig.brandTagline}`}
              width={40}
              height={40}
              priority
              className="size-10 shrink-0 rounded-full"
            />
            {/* No mobile o nome quebra em duas linhas de propósito: cabe sem
                colidir com o botão e espelha o empilhamento do próprio logo.
                O microtexto some abaixo de 640px porque repete o H1 logo
                adiante e só roubaria largura do nome. */}
            <div className="min-w-0 leading-[1.15]">
              <p className="font-display text-[13px] font-extrabold tracking-tight text-white sm:whitespace-nowrap sm:text-base">
                {siteConfig.brandName.toUpperCase()}
              </p>
              <p className="hidden truncate text-xs text-white/55 sm:block">
                Carretos e pequenas mudanças em {siteConfig.cityShort}
              </p>
            </div>
          </div>

          <CtaWhatsApp placement="header" size="sm" className="shrink-0">
            <span className="hidden sm:inline">Pedir orçamento</span>
            <span className="sm:hidden">Orçamento</span>
          </CtaWhatsApp>
        </div>
      </Container>
    </header>
  );
}
