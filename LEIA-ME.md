# Espaço Clemonth — landing page de conversão

Página única, sem framework e sem build. Abra `index.html` no navegador e ela funciona.

**No ar em:** https://clemonth.kintechstudio.com.br

---

## Como abrir

**Rápido:** clique duas vezes em `index.html`.

**Com servidor local** (recomendado — o mapa e os vídeos se comportam melhor):

```bash
node _dev/serve.js
```

Depois abra `http://localhost:4321`.

---

## O que tem em cada pasta

O site fica na **raiz** do repositório. É o que faz a Vercel publicar sem nenhuma
configuração no painel: ela procura `index.html` na raiz e acha.

```
espaco-clemonth-LP/
├── index.html               ← A PÁGINA
├── css/style.css
├── js/main.js
├── media/
│   ├── img/                 52 fotos em JPG + WebP (máx. 1800 px) — 22 MB
│   └── video/               só as capas dos depoimentos (os MP4 vêm do
│                            servidor do cliente; ver .gitignore)
├── vercel.json              cache e cabeçalhos de segurança
├── .vercelignore            o que fica no repo mas NÃO vai para o ar
│
├── assets/                  Originais sem tratamento (fora do Git, ver .gitignore)
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

`docs/`, `_dev/`, `_extracao/` e o `LEIA-ME.md` ficam versionados mas **não são publicados** —
estão no `.vercelignore`. Sem isso, o `docs/PITCH-COMERCIAL.md` ficaria acessível por URL
direta no ar, e ele contém o diagnóstico do site atual do cliente.

---

## Como publicar

Já está publicado. O repositório está conectado à Vercel: **todo push na `main` gera um
deploy novo automaticamente.**

- **Produção:** https://clemonth.kintechstudio.com.br
- **Repositório:** https://github.com/MatheusVieiraOli/espaco-clemonth-LP

Se um dia migrar para o domínio do cliente, troque os cinco endereços no `<head>` do
`index.html`: `canonical`, `og:url`, `og:image` e o `url` e `image` do bloco JSON-LD.

### Cuidado ao editar o `vercel.json`

**Não coloque comentários nele.** JSON não tem sintaxe de comentário, e a Vercel valida o
arquivo contra um esquema rígido: qualquer propriedade fora da lista dela derruba o deploy
inteiro com `Invalid request: should NOT have additional property`. O truque comum de usar
uma chave `"//"` para comentar **não funciona aqui**.

O que o arquivo faz hoje:

| Regra | Efeito |
|---|---|
| `/media/(.*)` | cache de 30 dias — fotos quase nunca mudam |
| `/(css\|js)/(.*)` | cache de 1 hora — ainda em ajuste |
| `/` | sempre revalida — texto e telefone novos entram no ar na hora |
| `/(.*)` | cabeçalhos de segurança |

Em outra hospedagem, é um site estático comum: envie o conteúdo da raiz (menos as pastas do
`.vercelignore`) para a pasta pública do servidor. Todos os caminhos são relativos, então
funciona também em subpasta.

---

## Onde mexer para ajustar

| O que | Onde |
|---|---|
| Número de WhatsApp | `js/main.js`, constante `WA` no topo, **e** os links `wa.me/...` no `index.html` |
| Textos | direto no `index.html` |
| Fotos da galeria, categorias e legendas | array `FOTOS` em `js/main.js` |
| Cores e fontes | bloco `:root` no topo de `css/style.css` |
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
