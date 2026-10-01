import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { CtaPhone } from "./ui/CtaPhone";
import { TruckIcon } from "./ui/icons";
import heroPhoto from "@/public/fotos/responsavel-fausto-transportes.webp";

/**
 * BLOCO 1 — Hero (MASTER_SPEC §10).
 *
 * Em menos de 5 segundos o usuário precisa ler: serviço, cidade, motivo para
 * confiar e ação seguinte. O H1 repete o termo que trouxe o clique ("carreto"
 * + "Belo Horizonte") para não desperdiçar o message match do anúncio (§5).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Brilho dourado discreto — só CSS, sem animação nem partículas (§15) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-7 py-7 sm:gap-9 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          {/* ----------------------------- Coluna de texto ---------------- */}
          <div>
            {/* Chip único: a microprova que precisa estar acima da dobra (§16).
                Dois chips empilhavam a 375px e custavam meia dobra. */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[12.5px] font-semibold text-gold">
                <TruckIcon className="size-[15px]" />
                {siteConfig.yearsExperience} anos de estrada em{" "}
                {siteConfig.cityShort} e região
              </span>
            </div>

            {/* `balance` deixa este H1 irregular (linhas de 2 e 3 palavras).
                Preenchimento natural + "Belo Horizonte" indivisível dá uma
                quebra limpa em todas as larguras. */}
            <h1 className="mt-4 font-display text-[32px] font-extrabold leading-[1.07] text-white [text-wrap:initial] sm:text-[44px] lg:text-[54px]">
              Carretos e Pequenas Mudanças em{" "}
              <span className="whitespace-nowrap text-gold">Belo Horizonte</span>
            </h1>

            <p className="mt-3.5 max-w-xl text-[15px] leading-[1.55] text-white/70 sm:text-[17px] sm:leading-relaxed">
              {siteConfig.yearsExperience} anos de estrada, pontualidade,
              organização e atendimento direto pelo WhatsApp para transportar
              seus móveis e sua pequena mudança em {siteConfig.cityShort}.
            </p>

            {/* CTA primário + microcopy logo abaixo, como manda a spec */}
            <div className="mt-6">
              <CtaWhatsApp
                placement="hero"
                service="generic"
                size="lg"
                fullWidth
                className="sm:w-auto"
              >
                Pedir orçamento no WhatsApp
              </CtaWhatsApp>

              <p className="mt-3 text-[13.5px] leading-snug text-white/55">
                Envie origem, destino e fotos do que precisa transportar.
              </p>
            </div>

            {/* CTA secundário: existe, mas não compete visualmente com o verde (§9).
                "Fins de semana" saiu daqui — é conteúdo do Bloco 2, e repetir
                custava uma linha inteira da primeira dobra. */}
            <div className="mt-4">
              <CtaPhone placement="hero" tone="onDark">
                Ligar agora
              </CtaPhone>
            </div>
          </div>

          {/* ----------------------------- Foto real ---------------------- */}
          <figure>
            {/* Wrapper próprio para a barra dourada: ancorada no `figure` ela
                caía abaixo da legenda. */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
                <Image
                  src={heroPhoto}
                  alt={`Responsável da ${siteConfig.brandName} ao lado do caminhão baú usado nos carretos e pequenas mudanças em ${siteConfig.city}`}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  // Elemento candidato a LCP: nunca lazy-load (§15)
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* Barra dourada de acento, apoiada na identidade da marca */}
              <div
                aria-hidden="true"
                className="absolute -bottom-1.5 left-6 right-6 h-1.5 rounded-full bg-gold/70 blur-[1px]"
              />
            </div>
            <figcaption className="mt-4 text-[12.5px] text-white/55">
              O responsável e o veículo que atende os serviços em{" "}
              {siteConfig.cityShort}.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
