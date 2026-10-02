import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { PinIcon } from "./ui/icons";

/**
 * BLOCO 8 — Área atendida (MASTER_SPEC §10).
 *
 * Responde "atende meu bairro?" sem virar hub de SEO: são os bairros que o
 * próprio cliente citou como de maior atuação, não 80 links de bairro nem
 * páginas doorway. SEO local futuro fica em estrutura separada (§8).
 */
export function ServiceArea() {
  return (
    <section id="area-atendida" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="rounded-card border border-line bg-cream p-6 sm:p-9">
          <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink sm:text-[32px]">
            Atendimento em {siteConfig.city} e região próxima
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            Maior atuação em{" "}
            {siteConfig.serviceAreas.slice(0, -1).join(", ")} e{" "}
            {siteConfig.serviceAreas.at(-1)} — e também em bairros próximos.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((bairro) => (
              <li
                key={bairro}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink"
              >
                <PinIcon className="size-[14px] text-gold" />
                {bairro}
              </li>
            ))}
          </ul>

          <CtaWhatsApp
            placement="service_area"
            triagem={false}
            customText={`Olá! Vim pelo site e quero saber se vocês atendem o meu bairro em ${siteConfig.cityShort}.

Bairro de origem:
Bairro de destino:`}
            fullWidth
            className="mt-7 sm:w-auto"
          >
            Consultar meu bairro no WhatsApp
          </CtaWhatsApp>
        </div>
      </Container>
    </section>
  );
}
