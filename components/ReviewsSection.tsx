import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";

/**
 * BLOCO 7 — Avaliações (MASTER_SPEC §10). CONDICIONAL.
 *
 * Enquanto `socialProof.enabled` for false este bloco não existe na página.
 * Nada de "João S., cliente de BH" e nada de cinco estrelas decorativas que
 * pareçam avaliação real (§4). Para ligar: confirmar as pendências #9 e #10,
 * preencher os dados reais em lib/site-config.ts e virar a flag.
 */
export function ReviewsSection() {
  const { socialProof } = siteConfig;

  if (!socialProof.enabled || socialProof.reviews.length === 0) return null;

  return (
    <section className="bg-cream py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink sm:text-[34px]">
          O que dizem os clientes
        </h2>

        {socialProof.rating !== null && socialProof.reviewCount !== null && (
          <p className="mt-2.5 text-[15px] text-muted">
            Nota {socialProof.rating} com base em {socialProof.reviewCount}{" "}
            avaliações
            {socialProof.profileUrl && (
              <>
                {" · "}
                <a
                  href={socialProof.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold decoration-2 underline-offset-4"
                >
                  ver no Google
                </a>
              </>
            )}
          </p>
        )}

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {socialProof.reviews.map((review) => (
            <blockquote
              key={review.author}
              className="rounded-card border border-line bg-white p-5"
            >
              <p className="text-[14.5px] leading-relaxed text-ink">
                “{review.text}”
              </p>
              <footer className="mt-3 text-[13px] font-semibold text-muted">
                {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
