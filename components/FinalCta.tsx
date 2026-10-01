import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { CtaPhone } from "./ui/CtaPhone";

/** BLOCO 10 — CTA final (MASTER_SPEC §10). */
export function FinalCta() {
  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[28px] font-extrabold leading-tight text-white sm:text-[38px]">
            Precisa de um carreto em {siteConfig.cityShort}?
          </h2>
          <p className="mx-auto mt-3.5 max-w-lg text-[15.5px] leading-relaxed text-white/65 sm:text-[17px]">
            Envie agora o que precisa transportar, origem e destino. O
            atendimento é feito pelo WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <CtaWhatsApp
              placement="final_cta"
              service="generic"
              size="lg"
              fullWidth
              className="sm:w-auto"
            >
              Pedir orçamento no WhatsApp
            </CtaWhatsApp>
            <CtaPhone placement="final_cta" tone="onDark" className="w-full sm:w-auto">
              Ligar {siteConfig.phoneDisplay}
            </CtaPhone>
          </div>
        </div>
      </Container>
    </section>
  );
}
