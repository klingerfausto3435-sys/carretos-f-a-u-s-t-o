import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Tag do Google (gtag.js) da conta de Google Ads.
 *
 * Carrega com `afterInteractive`: o script sobe depois que a página fica
 * utilizável, então não disputa banda com a imagem do hero nem atrasa o LCP,
 * que o §18 do contexto mestre fixa em 2,5 s.
 *
 * O CTA do WhatsApp NÃO depende disto. `lib/track.ts` chama `window.gtag`
 * com optional chaining — se a tag falhar, for bloqueada por adblock ou
 * recusada por consentimento, o botão continua levando ao WhatsApp e só o
 * registro do evento se perde (§19).
 *
 * Para desligar: `googleTagId: null` em lib/site-config.ts.
 */
export function GoogleTag() {
  const id = siteConfig.googleTagId;
  if (!id) return null;

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
