# Espaço Clemonth — landing page de conversão

Página única, sem framework e sem build. Abra `site/index.html` no navegador e ela funciona.

---

## Como abrir

**Rápido:** clique duas vezes em `site/index.html`.

**Com servidor local** (recomendado — o mapa e os vídeos se comportam melhor):

```bash
node _dev/serve.js
```

Depois abra `http://localhost:4321`.

---

## O que tem em cada pasta

```
Espaço Clemonth/
├── site/                    ← ISTO É A ENTREGA. Sobe inteiro pro servidor.
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   └── media/
│       ├── img/             52 fotos em JPG + WebP (máx. 1800 px) — 22 MB
│       └── video/           3 depoimentos comprimidos + capas — 35 MB
│
├── assets/                  Originais baixados do site, sem tratamento
│   ├── img/                 52 fotos em resolução de câmera — 113 MB
│   └── video/               3 vídeos originais — 798 MB
│
├── _extracao/               HTML e CSS originais do site atual (referência)
├── _dev/
│   ├── serve.js                   Servidor local de desenvolvimento
│   ├── contraste.js               Mede contraste de texto sobre fotografia
│   └── varredura-contraste.js     Varre o DOM inteiro atrás de texto ilegível
└── docs/
    ├── PITCH-COMERCIAL.md   ← leia antes da reunião
    ├── IDENTIDADE-VISUAL.md
    ├── CONTEUDO-EXTRAIDO.md
    └── CONTRASTE.md         legibilidade: o que foi medido e por quê
```

Para publicar, só a pasta `site/` importa. As outras são material de trabalho.

---

## Como publicar

É um site estático. Funciona em qualquer lugar:

- **Netlify / Vercel / Cloudflare Pages** — arraste a pasta `site/` na tela. Sai no ar em minutos, de graça.
- **Hospedagem própria** — envie o conteúdo de `site/` para a raiz (ou para uma subpasta, os caminhos são todos relativos).
- **Junto do WordPress atual** — dá para publicar em `espacoclemonth.com.br/visita/` sem mexer no site existente, o que é útil para rodar tráfego pago sem risco.

Antes de publicar, troque o `<link rel="canonical">` e a `og:url` no `<head>` do `index.html`
pelo endereço definitivo.

---

## Onde mexer para ajustar

| O que | Onde |
|---|---|
| Número de WhatsApp | `site/js/main.js`, constante `WA` no topo, **e** os links `wa.me/...` no `index.html` |
| Textos | direto no `site/index.html` |
| Fotos da galeria, categorias e legendas | array `FOTOS` em `site/js/main.js` |
| Cores e fontes | bloco `:root` no topo de `site/css/style.css` |
| — se mexer nas cores | rode as duas verificações de contraste antes de publicar (ver `docs/CONTRASTE.md`) |
| Campos do formulário | `<form id="form">` no HTML + montagem da mensagem em `main.js` |

### Trocar o formulário de WhatsApp por envio real

Hoje o formulário monta a mensagem e abre a conversa no WhatsApp — é o caminho de maior
conversão no Brasil e não precisa de servidor. Para também gravar o lead num CRM ou
planilha, basta um `fetch()` para o endpoint antes do `window.open` (o ponto exato está
comentado no final do handler de `submit`, em `main.js`).

---

## Pendências para confirmar com o cliente

1. **Números da casa.** `220 convidados sentados`, `200 lugares na capela`, `70 vagas` e
   `3 espaços para cerimônia` vieram do cadastro que a própria casa fez no casamentos.com.br,
   não do site oficial. Estão na faixa logo abaixo do herói e nas dúvidas frequentes.
   **Confirmar antes de publicar.**
2. **Telefone.** Uso o `(21) 99927-9258`, que aparece tanto no botão do site quanto na bio do
   Instagram. Um diretório lista também `(21) 97907-0110`. Verificar se os dois estão ativos.
2b. **Número do endereço: 943 ou 923?** Todos os diretórios dizem **943**, e é o que está na
   página. Mas o convite fotografado em `assets/img/Copia-de-_MG_5645-1-scaled.jpg` (casamento
   de Rafaela e Rafael, 14/11/2020, no próprio Clemonth) está impresso como
   *"Estrada Santa Veridiana, **923** - Santa Cruz"*. Vale confirmar antes de publicar, porque
   o número vai para o mapa, para a rota e para os dados estruturados do Google.
3. **Direitos das fotos.** Parte do acervo tem marca d'água de *Marcio Rosa Fotografia* e
   *RichardPhoto*. Deixei essas imagens fora das posições de destaque, mas o ideal é pedir os
   arquivos limpos ou substituir.
4. **O que entra no pacote.** A lista de "o que já vem com o espaço" foi montada a partir da
   proposta declarada no site ("solução completa, personalizável"). Precisa bater com o
   contrato real antes de ir ao ar.
5. **Horário de visita.** `Seg a sex 9h–17h, sáb até 15h` veio de diretório. Confirmar.
6. **Logotipo em vetor.** Só existe PNG. Pedir o SVG ou o arquivo original para telas grandes.
7. **Faltam fotos de duas categorias.** O acervo do site é forte em decoração (15 fotos) e
   gastronomia (8), mas magro no resto: só **3 fotos do espaço em si** e **2 de festas de 15
   anos**. Não existe nenhuma foto do salão vazio, da capela, do camarim nem do
   estacionamento — justamente o que quem pesquisa quer ver antes de agendar a visita.
   Vale sugerir um ensaio de meio dia com a casa vazia; rende para o site, para o Instagram e
   para os anúncios.
8. **Promessas feitas em nome da casa.** Três frases comprometem a operação e precisam do
   aval do cliente antes de publicar:
   - *"Resposta no mesmo dia útil"* (bloco do formulário)
   - *"Sem cobrança escondida aparecendo depois"* (passo 2 de "Como funciona")
   - *"Visitas com hora marcada"* (abaixo dos botões do herói)

---

## O que já foi feito

- Extração completa das seis páginas do site atual, do Instagram e dos cadastros da casa
- 52 fotos e 3 vídeos baixados, tratados e otimizados para web (798 MB de vídeo → 35 MB)
- Identidade visual reconstruída a partir do logotipo e do CSS existente
- Página única com 13 seções, escrita com o vocabulário da própria casa
- Formulário com validação, máscara de telefone e envio para o WhatsApp com mensagem pronta
- Galeria com filtro por categoria, carregamento em lotes e lightbox com teclado
- Dados estruturados `EventVenue` para o Google, Open Graph para compartilhamento
- Responsivo de 320 px a telas largas, com barra fixa de ação no celular
- `prefers-reduced-motion` respeitado, foco visível, navegação por teclado
- Carga inicial medida: **534 KB, 9 requisições, `load` em 391 ms**
- Contraste auditado e corrigido: 169 elementos sobre cor sólida + 14 sobre fotografia,
  todos em WCAG AA, incluindo bordas de campo e anel de foco (ver `docs/CONTRASTE.md`)
