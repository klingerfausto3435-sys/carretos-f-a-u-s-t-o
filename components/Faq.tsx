"use client";

import { Container } from "./ui/Container";
import { trackDiagnostic } from "@/lib/track";

/**
 * BLOCO 9 — FAQ comercial (MASTER_SPEC §10).
 *
 * Só perguntas que a spec marca como seguras. As que dependem de confirmação
 * (ajudante incluso, baú, embalagem, montagem, pagamento, nota fiscal,
 * seguro) estão FORA até o cliente responder as pendências do §27.
 *
 * Usa <details>/<summary> nativo: acessível por teclado e sem JS de acordeão.
 */
const QUESTIONS = [
  {
    q: "Como peço um orçamento?",
    a: "Pelo WhatsApp. Envie fotos ou um vídeo do que precisa transportar, o endereço de origem, o de destino e a data. Com isso dá para entender o serviço e passar um valor que faz sentido.",
  },
  {
    q: "Vocês atendem aos finais de semana?",
    a: "Sim, há atendimento também aos fins de semana, conforme a agenda disponível. Vale confirmar a data no WhatsApp.",
  },
  {
    q: "Atendem minha região?",
    a: "O atendimento é em Belo Horizonte e região próxima, com maior atuação em São Bento, Santa Lúcia, Anchieta, Sion, Luxemburgo, Gutierrez e bairros vizinhos. Para confirmar o seu endereço, é só mandar mensagem.",
  },
  {
    q: "O que devo enviar para o orçamento ficar mais preciso?",
    a: "Fotos ou vídeo dos itens, uma lista do que vai, origem e destino, o andar e se tem elevador quando for o caso, e a data pretendida. Quanto mais claro o volume, menos surpresa no dia.",
  },
  {
    q: "Com quanto tempo de antecedência devo pedir orçamento?",
    a: "Não existe prazo obrigatório. Quanto antes as informações chegarem, melhor fica o planejamento e maior a chance de a data que você quer estar livre.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-cream py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink sm:text-[34px]">
          Perguntas frequentes
        </h2>

        <div className="mt-7 divide-y divide-line border-y border-line">
          {QUESTIONS.map(({ q, a }) => (
            <details
              key={q}
              className="group py-1.5"
              onToggle={(event) => {
                if ((event.currentTarget as HTMLDetailsElement).open) {
                  trackDiagnostic("faq_open", { question: q });
                }
              }}
            >
              {/* min-h-12 + py: sem isso o alvo de toque ficava em 28px, abaixo
                  dos ~44px exigidos pelo §11. */}
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2.5 font-display text-[15.5px] font-bold leading-snug text-ink marker:content-none">
                {q}
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-line bg-white text-[18px] font-normal leading-none text-ink transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mb-3 mt-0.5 max-w-3xl pr-10 text-[14.5px] leading-relaxed text-muted">
                {a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
