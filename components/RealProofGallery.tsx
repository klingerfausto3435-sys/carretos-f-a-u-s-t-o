import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import veiculo from "@/public/fotos/veiculo-fausto-01.webp";
import responsavel from "@/public/fotos/responsavel-fausto-transportes.webp";

/**
 * BLOCO 6 — Prova visual real (MASTER_SPEC §10).
 *
 * Só fotos da operação. Nenhuma imagem de banco, nenhum caminhão genérico.
 * Os slots que ainda não têm foto ficam marcados à vista, de propósito: a
 * página não deve ir ao ar antes da substituição (§22).
 */

/** Fotos reais já disponíveis. Lazy-load por estarem abaixo da dobra (§15). */
const PHOTOS = [
  {
    src: veiculo,
    alt: `Caminhão baú da ${siteConfig.brandName} usado em carretos e fretes em ${siteConfig.city}`,
    caption: "O veículo que faz os carretos e as pequenas mudanças.",
  },
  {
    src: responsavel,
    alt: `Responsável da ${siteConfig.brandName} ao lado do caminhão em ${siteConfig.city}`,
    caption: "Quem atende no WhatsApp é quem acompanha o serviço.",
  },
];

/**
 * Pendência #11 (§27). Trocar cada slot por foto real e remover a entrada.
 * Checklist completa de assets no §22 da spec.
 */
const PENDING_SLOTS = [
  "[SUBSTITUIR POR FOTO REAL DA ÁREA DE CARGA]",
  "[SUBSTITUIR POR FOTO REAL DE SERVIÇO EM ANDAMENTO]",
];

export function RealProofGallery() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink sm:text-[34px]">
          O veículo e a operação
        </h2>
        <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
          Fotos do caminhão e de quem atende, para você saber com o que está
          falando antes de chamar.
        </p>

        {/* Grade 2x2 com proporção travada: sem aspect-ratio fixa, uma foto 4:3
            em largura total passava de 800px de altura no desktop e engolia a
            tela. A proporção declarada também elimina CLS (§15). */}
        <div className="mt-7 grid gap-x-4 gap-y-6 sm:grid-cols-2">
          {PHOTOS.map(({ src, alt, caption }) => (
            <figure key={alt}>
              <div className="overflow-hidden rounded-card border border-line">
                <Image
                  src={src}
                  alt={alt}
                  sizes="(min-width: 640px) 560px, 100vw"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-[13px] leading-snug text-muted">
                {caption}
              </figcaption>
            </figure>
          ))}

          {PENDING_SLOTS.map((label) => (
            <div
              key={label}
              className="flex aspect-[4/3] items-center justify-center rounded-card border-2 border-dashed border-line bg-cream p-6"
            >
              <p className="text-center font-mono text-[11.5px] font-medium leading-relaxed text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
