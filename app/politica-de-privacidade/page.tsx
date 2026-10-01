import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { PreserveQueryLink } from "@/components/ui/PreserveQueryLink";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${siteConfig.brandName}`,
  description: `Como a ${siteConfig.brandName} trata os dados de quem pede orçamento pelo site.`,
  robots: { index: false, follow: true },
};

/**
 * Página exigida pelo §19 e pelo critério de aceite do §26.
 *
 * ATENÇÃO: o bloco de identificação do controlador está incompleto de
 * propósito — razão social, CNPJ e endereço são pendências do §27. Preencher
 * em lib/site-config.ts antes de publicar.
 */
export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-cream py-12 sm:py-16">
      <Container className="max-w-3xl">
        <PreserveQueryLink
          href="/"
          className="text-[13.5px] font-medium text-muted underline decoration-gold decoration-2 underline-offset-4 hover:text-ink"
        >
          ← Voltar para a página inicial
        </PreserveQueryLink>

        <h1 className="mt-6 font-display text-[30px] font-extrabold leading-tight text-ink sm:text-[38px]">
          Política de Privacidade
        </h1>

        <div className="mt-7 space-y-7 text-[15px] leading-relaxed text-ink/85">
          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Quem é o responsável pelos dados
            </h2>
            <p className="mt-2">
              Este site é operado por {siteConfig.brandName}, prestador de
              serviços de carreto, frete e pequenas mudanças em{" "}
              {siteConfig.city}/{siteConfig.state}. O contato para qualquer
              assunto relacionado a dados pessoais é o WhatsApp ou o telefone{" "}
              {siteConfig.phoneDisplay}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Quais dados são coletados
            </h2>
            <p className="mt-2">
              Este site não possui formulário de cadastro e não pede os seus
              dados para que você navegue. Os dados pessoais que chegam até nós
              são os que você mesmo envia na conversa de WhatsApp ou informa
              por telefone ao pedir um orçamento, como nome, telefone,
              endereços de origem e destino, data pretendida e descrição ou
              fotos do que precisa ser transportado.
            </p>
            <p className="mt-2">
              Além disso, ferramentas de medição de audiência e de publicidade
              podem registrar dados de navegação, como páginas visitadas,
              origem da visita, parâmetros de campanha e identificadores de
              clique de anúncio. Esses dados são usados de forma agregada para
              entender o desempenho dos anúncios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Para que os dados são usados
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Responder ao seu pedido de orçamento.</li>
              <li>Combinar e executar o serviço de transporte contratado.</li>
              <li>
                Manter o histórico do atendimento para tratar dúvidas e
                reclamações posteriores.
              </li>
              <li>
                Medir o desempenho dos anúncios e melhorar a página, sem
                identificar você individualmente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Compartilhamento
            </h2>
            <p className="mt-2">
              Os seus dados não são vendidos nem cedidos para terceiros com
              finalidade comercial. A conversa acontece dentro do WhatsApp, que
              possui política própria de privacidade, e as ferramentas de
              medição são fornecidas pelo Google, que também possui política
              própria.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Por quanto tempo ficam guardados
            </h2>
            <p className="mt-2">
              As conversas e os registros de atendimento são mantidos pelo
              tempo necessário para a prestação do serviço e para o
              cumprimento de obrigações legais. Depois disso podem ser
              apagados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Seus direitos
            </h2>
            <p className="mt-2">
              A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante a
              você o direito de confirmar a existência de tratamento, acessar
              os seus dados, corrigir dados incompletos ou desatualizados,
              solicitar anonimização, bloqueio ou eliminação de dados
              desnecessários, e revogar o consentimento. Para exercer qualquer
              um desses direitos, basta pedir pelo WhatsApp ou pelo telefone{" "}
              {siteConfig.phoneDisplay}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Cookies
            </h2>
            <p className="mt-2">
              Este site pode usar cookies e tecnologias semelhantes para medir
              o desempenho dos anúncios. Você pode bloquear ou apagar cookies
              nas configurações do seu navegador, sem que isso impeça o uso da
              página ou o contato pelo WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[19px] font-bold text-ink">
              Atualizações
            </h2>
            <p className="mt-2">
              Esta política pode ser atualizada. A versão vigente é sempre a
              publicada nesta página.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
