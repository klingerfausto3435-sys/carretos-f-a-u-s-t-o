# LP Fausto Transportes — Carretos e Pequenas Mudanças em BH

Landing page dedicada a Google Ads, construída a partir do
`MASTER_SPEC_LP_FAUSTO_TRANSPORTES.md`. Objetivo único: levar quem pesquisou
"carreto bh" ao WhatsApp com contexto suficiente para pedir orçamento.

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

> Não rode `npm run build` com o `npm run dev` ligado: o build de produção
> sobrescreve o `.next/` do dev e quebra o servidor. Pare o dev antes, ou
> rode `rm -rf .next` depois.

## Onde mudar o conteúdo

**Todo dado factual está em [`lib/site-config.ts`](lib/site-config.ts).** Nenhum
componente tem nome de marca, telefone ou diferencial escrito direto no JSX.

| Quero mudar | Mexo em |
|---|---|
| Nome da marca, telefone, cidade, anos de experiência | `siteConfig` |
| Bairros da seção de área atendida | `siteConfig.serviceAreas` |
| Ligar o bloco de avaliações | `siteConfig.socialProof` |
| Mensagens pré-preenchidas do WhatsApp | `lib/whatsapp.ts` |
| Perguntas do FAQ | `components/Faq.tsx` |

Se o nome comercial final for outro (pendência nº 1), basta trocar
`brandName` — ele se propaga para header, footer, `<title>`, Open Graph,
JSON-LD e alt text das imagens.

## O que NÃO está na página, de propósito

A spec proíbe escrever como fato qualquer item não confirmado pelo cliente
(§4 e §27). Estes **não aparecem** em lugar nenhum e estão registrados como
`false`/`null` em `siteConfig.pendentes`:

- modelo do veículo, se é baú fechado, mantas/cintas/plástico-bolha
- ajudante incluso, montagem/desmontagem
- formas de pagamento, parcelamento, nota fiscal, seguro
- preço, "a partir de R$", preço fechado sem taxa adicional
- nota no Google, número de avaliações, quantidade de mudanças realizadas
- CNPJ, endereço comercial, horário exato, atendimento 24h ou no mesmo dia
- qualquer superlativo ("melhor de BH", "líder", "zero risco", "100% seguro")

**Para liberar qualquer um:** confirme com o cliente → preencha em
`siteConfig` → só então escreva a copy correspondente.

O bloco de avaliações (`ReviewsSection`) já está pronto e **não renderiza
nada** enquanto `socialProof.enabled` for `false`. Não existe depoimento
fictício nem estrela decorativa na página.

## Antes de publicar

### 1. Fotos que ainda faltam

Duas fotos reais já estão no ar (veículo e responsável). Faltam estas, e os
lugares delas estão marcados com borda tracejada no bloco "O veículo e a
operação":

- [ ] interior / área de carga do baú
- [ ] serviço real em andamento
- [ ] móveis sendo organizados no veículo
- [ ] foto vertical do veículo (útil para criativos de Ads)

Celular serve. Luz do dia, horizontal, sem filtro. Salvar em
`public/fotos/`, converter para WebP e remover a entrada correspondente de
`PENDING_SLOTS` em `components/RealProofGallery.tsx`.

### 2. Identificação comercial

O rodapé e a Política de Privacidade estão sem razão social, CNPJ e endereço
(pendência nº 12). Confirmar e preencher.

### 3. Domínio

`siteConfig.siteUrl` está em `https://faustotransportes.com.br` como
provisório. Trocar antes de publicar — ele alimenta canonical, Open Graph e
JSON-LD.

## Tracking

A página **não instala GA4 nem GTM**. Ela apenas empurra eventos para
`window.dataLayer` e `window.gtag` se eles existirem — sem tag instalada,
tudo vira no-op e o botão do WhatsApp continua funcionando (§19).

Para ativar, adicione a tag do GTM no `app/layout.tsx` e configure:

| Evento | Quando dispara | Usar como |
|---|---|---|
| `click_whatsapp` | clique em qualquer um dos 9 CTAs de WhatsApp | **conversão principal** |
| `click_phone` | clique em qualquer um dos 3 links de telefone | conversão secundária |
| `scroll_50`, `scroll_90` | profundidade de rolagem | diagnóstico, **nunca** conversão |
| `faq_open` | abertura de pergunta do FAQ | diagnóstico |
| `service_card_view` | bloco de serviços entrou na tela | diagnóstico |

Parâmetros em `click_whatsapp`: `placement` (header / hero / service_card /
process / service_area / sticky / final_cta), `service` (generic /
small_move / furniture / carreto), `page_path`, mais `utm_source`,
`utm_medium`, `utm_campaign`, `utm_term`, `utm_content` e `gclid`.

**Cuidado com conversão duplicada (§18):** escolha UMA origem primária. Não
contabilize o mesmo clique como conversão direta do Google Ads **e** como
conversão importada do GA4.

### Atribuição

UTMs e `gclid` são capturados no carregamento e guardados em
`sessionStorage`. Se o usuário navegar para a Política de Privacidade e
voltar, o evento de conversão ainda carrega a campanha e o termo de
pesquisa — é o que permite ligar um serviço fechado de volta à palavra-chave
que pagou o clique.

## Verificado nesta versão

- Build de produção limpo, as duas rotas pré-renderizadas estáticas
- 112 kB de JS no primeiro carregamento
- Zero erro de console em carregamento limpo
- Zero overflow horizontal a 360px (`scrollWidth` = viewport)
- Todos os alvos de toque ≥ 44px
- 36 combinações de texto/fundo testadas, todas passam contraste AA
- 9 CTAs de WhatsApp e 3 de telefone, todos com o número correto, mensagem
  contextual por bloco e disparo único por clique
- Zero links vazios, exatamente um `<h1>`
- Imagem do hero com `priority` (nunca lazy); todas as demais com lazy-load
- Proporções declaradas nas imagens, sem CLS

## Ainda não verificado

- **PageSpeed real no mobile** (§26): precisa de deploy. Rodar o PageSpeed
  Insights na URL de produção antes de ligar a campanha.
- **Revisão manual de conteúdo pelo cliente** (§26): o Klinger precisa ler a
  página inteira e confirmar que não há nada que ele não faça.

## Estrutura

```
app/
  layout.tsx                    fontes, metadata, JSON-LD, Analytics
  page.tsx                      ordem dos blocos
  globals.css                   tokens de cor e tipografia
  politica-de-privacidade/
components/
  Header · Hero · TrustStrip · ServiceIntentCards · QuoteProcess
  WhyChooseUs · RealProofGallery · ReviewsSection (condicional)
  ServiceArea · Faq · FinalCta · Footer · MobileStickyCta
  ui/                           Container, CtaWhatsApp, CtaPhone, icons
lib/
  site-config.ts                fonte única de verdade
  whatsapp.ts                   links wa.me com mensagem pré-preenchida
  track.ts                      eventos e atribuição
```
