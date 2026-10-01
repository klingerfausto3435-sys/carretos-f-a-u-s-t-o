import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";

/**
 * CTA fixo no rodapé em telas pequenas (MASTER_SPEC §11).
 *
 * Respeita a safe-area do iPhone, tem altura de toque confortável e some a
 * partir de 640px, onde o CTA do header já cobre a necessidade.
 */
export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-safe backdrop-blur sm:hidden">
      <Container className="!px-0">
        <CtaWhatsApp placement="sticky" service="generic" fullWidth>
          WhatsApp · Pedir orçamento
        </CtaWhatsApp>
      </Container>
    </div>
  );
}
