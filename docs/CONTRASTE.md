# Legibilidade e contraste

Registro do que foi medido e do que mudou. Todos os números são razão de contraste WCAG 2.1,
calculada sobre a cor final composta — não sobre a cor declarada no CSS.

**Mínimos usados:** 4,5 para texto corrido · 3,0 para texto grande (≥24 px, ou ≥18,7 px em
negrito) · 3,0 para bordas de campo, botões e anel de foco.

---

## Como foi medido

Dois métodos, porque os problemas eram de naturezas diferentes.

**1. Texto sobre fotografia** (herói e bloco de orçamento). Não dá para medir isso lendo o
CSS: o fundo é uma foto. O script `contraste.js` recorta com ffmpeg a região exata da imagem
atrás de cada texto, refaz em código a matemática dos gradientes de sobreposição (linear,
radial e véu do cabeçalho, na ordem de pintura) e calcula o contraste pixel a pixel. O valor
reportado é o **percentil 5** — o pior caso realista, não a média, que esconde os pontos
claros da foto.

**2. Texto sobre cor sólida** (todo o resto). Varredura no DOM ao vivo: para cada elemento com
texto próprio, sobe a árvore compondo as camadas de fundo semitransparentes até achar a cor
opaca, e compara. 169 elementos no desktop, mais a passagem em 375 px para pegar a barra fixa
e o menu, que não existem no desktop.

---

## O que estava errado

| Elemento | Antes | Depois | Causa |
|---|---|---|---|
| Links do menu sobre a foto | **3,88** | **10,75** | O topo da foto é céu claro e o gradiente do herói só chegava a 0,46 de opacidade ali |
| Bronze `#A98552` sobre creme | **3,08** | **5,01** | Cor de destaque herdada do site atual, clara demais para fundo claro |
| Texto branco nos botões dourados | **3,40** | **5,55** | Consequência do mesmo bronze |
| Cinza `#6D736E` sobre creme | **4,40** | **5,25** | Faltavam 0,1 para o mínimo |
| Placeholder `#A9AEA9` | **2,05** | **5,25** | Cinza padrão de formulário, claro demais |
| Botão de WhatsApp (barra mobile) | **4,18** | **4,81** | Verde `#6A826C` do site atual, com branco por cima não fecha |
| Borda dos campos do formulário | **1,59** | **3,53** | Linha a 24% de opacidade, quase invisível |
| Borda do botão "Chamar no WhatsApp" | **3,85** | **6,58** | Branco a 42% sobre foto |
| Anel de foco sobre creme | **2,11** | **5,01** | Um único tom dourado para a página inteira |
| Numeral dos passos (1, 2, 3) | some | visível | `-webkit-text-stroke` sem fallback: sem suporte, o número ficava transparente |
| Texto alternativo do `<video>` | 1,29 | 15,7 | Herdava a cor de texto escura sobre fundo escuro |

---

## As decisões

### Dois bronzes, não um

O bronze do logotipo é claro demais para servir de cor de texto sobre creme. Em vez de
abandonar a cor da marca, ela foi desdobrada:

| Token | Valor | Onde | Contraste |
|---|---|---|---|
| `--gold` | `#85622F` | rótulos, botões, numeração, links e citações sobre creme | 5,01 sobre `#F7F3EB` · 4,55 sobre `#EFE8DA` · 5,55 com texto branco |
| `--gold-lt` | `#C7A56F` | os mesmos papéis sobre fundo escuro | 7,49 sobre `#131C17` |
| `--gold-pale` | `#C4B997` | números grandes e o itálico do título | 8,90 sobre `#131C17` |

O `#85622F` foi escolhido por busca: é o tom **mais claro** que ainda passa em 4,5 nas duas
tonalidades de creme da página *e* com texto branco por cima, mantendo a matiz do cobre do
logotipo (R−G / R−B entre 0,34 e 0,44).

### Véu no cabeçalho, não gradiente mais escuro no herói

Escurecer o gradiente do herói resolveria o menu, mas apagaria o céu do entardecer, que é o
que vende a foto. Em vez disso, o cabeçalho ganhou um véu próprio (`.hdr::before`), que se
apaga assim que o header adquire fundo sólido ao rolar. O menu sai de 3,88 para 10,75 sem
tocar no resto da imagem.

### Sombra curta em vez de borrão

O `text-shadow` do título era `0 2px 40px` — um borrão de 40 px, decorativo, que não separava
a letra do fundo. Trocado por duas camadas: uma curta e fechada (3 px) que faz o trabalho de
legibilidade, e uma larga e fraca que mantém o volume. Aplicada a todo texto do herói, não só
ao título.

### Anel de foco que muda com o fundo

`--focus` é uma variável herdada: vale `--gold` por padrão e `--gold-lt` dentro de seções
escuras, do herói, do cabeçalho e do rodapé. O formulário, que é creme dentro de uma seção
escura, volta para `--gold`. Assim o anel nunca fica invisível.

### Chip de filtro selecionado

Bronze escuro sobre seção escura ficaria apagado. Na galeria o chip ativo usa `--gold-lt` como
fundo com texto na cor tinta: destaca-se do fundo em 7,49 e o texto lê em 7,46.

---

## Situação final

| Verificação | Resultado |
|---|---|
| Texto sobre cor sólida, desktop | 169 elementos, **0 reprovados** — pior caso 4,55 |
| Texto sobre cor sólida, 375 px (com barra fixa e menu abertos) | **0 reprovados** |
| Texto sobre fotografia (14 elementos, percentil 5) | **0 reprovados** — pior caso 4,69 |
| Bordas de campo, botões e chips | **0 reprovados** (mínimo 3,0) |
| Anel de foco em 7 contextos diferentes | **0 reprovados** — pior caso 5,01 |

Tudo em AA. Os itens que também alcançam AAA (7,0) são a maioria do texto sobre fundo escuro.

---

## Para refazer a medição depois de mexer nas cores

O script de análise sobre fotografia está em
`_dev/contraste.js`. Ele depende do ffmpeg no PATH.

```bash
node _dev/contraste.js
```

A varredura do DOM é um trecho de JavaScript que roda no console do navegador com a página
aberta; está guardado em `_dev/varredura-contraste.js`.
