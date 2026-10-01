import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import { CtaPhone } from "./ui/CtaPhone";
import { PreserveQueryLink } from "./ui/PreserveQueryLink";
import logo from "@/public/brand/logo-fausto-transportes.webp";

/**
 * Rodapé (MASTER_SPEC §19).
 *
 * Sem CNPJ e sem endereço comercial: pendências #12 do §27, não confirmadas.
 * Assim que o cliente confirmar, preencher em lib/site-config.ts e exibir
 * aqui como identificação comercial real.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink pb-sticky-gap pt-10 sm:pb-10">
      <Container>
        <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Image
              src={logo}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              className="size-11 shrink-0 rounded-full"
            />
            <div>
              <p className="font-display text-[15px] font-extrabold tracking-tight text-white">
                {siteConfig.brandName.toUpperCase()}
              </p>
              <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-white/50">
                {siteConfig.brandTagline}. Atendimento em {siteConfig.city} e
                região próxima.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <CtaPhone placement="footer" tone="onDark" />
            <PreserveQueryLink
              href="/politica-de-privacidade"
              className="inline-flex min-h-11 items-center text-[13px] text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white/80"
            >
              Política de Privacidade
            </PreserveQueryLink>
          </div>
        </div>

        <p className="mt-9 border-t border-white/10 pt-5 text-[12px] text-white/55">
          © {year} {siteConfig.brandName}. Carretos, fretes e pequenas mudanças
          em {siteConfig.city}/{siteConfig.state}.
        </p>
      </Container>
    </footer>
  );
}
