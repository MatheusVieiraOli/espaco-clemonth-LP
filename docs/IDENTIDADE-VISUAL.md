# Identidade visual — Espaço Clemonth

Sistema visual reconstruído a partir da marca existente (logotipo, CSS do site atual e
material do Instagram). Nada aqui foi inventado: cada valor tem origem rastreável.

---

## 1. Logotipo

| Arquivo | Origem | Uso |
|---|---|---|
| `media/img/logo-nova.png` | `wp-content/uploads/2021/11/LOGO-NOVA.png` | Versão **branca**, para fundos escuros. Usada no cabeçalho e no rodapé. |
| `media/img/cropped-colorido-png-270x270.png` | `wp-content/uploads/2021/10/cropped-colorido-png` | Versão **colorida** (cobre sobre transparente), com o ornamento floral completo. Usada como favicon. |

**Construção da marca:** moldura ornamental simétrica de inspiração damasco/art nouveau,
em degradê de cobre, envolvendo a palavra `CLEMONTH` em serifa clássica com entreletra
larga, e a linha `ESPAÇO DE EVENTOS` em caixa alta menor, separada por filetes horizontais.

**Falta na marca atual:** não existe versão vetorial (SVG) nem versão monocromática.
As duas foram pedidas ao cliente na lista de pendências do `LEIA-ME.md`.

---

## 2. Paleta

Origem rastreável na coluna do meio. Todos os valores passaram por verificação de
contraste — o critério está em `CONTRASTE.md`.

| Token | Hex | Origem | Uso na página |
|---|---|---|---|
| `--gold` | `#85622F` | cobre do logotipo, escurecido até passar em AA sobre creme | rótulos, botões, filetes, números e links **sobre fundo claro** |
| `--gold-lt` | `#C7A56F` | cobre claro do logotipo | os mesmos papéis **sobre fundo escuro**, hover, chip ativo |
| `--gold-pale` | `#C4B997` | **cor de destaque do Elementor do site atual** | números grandes, itálico do título |
| `--sage` | `#627863` | **`rgba(106,130,108,1)`, botão de WhatsApp do site atual**, escurecido para AA | botão de WhatsApp da barra fixa |
| `--ink` | `#131C17` | verde profundo da vegetação das fotos | fundos escuros, cabeçalho fixo |
| `--ink-2` | `#1B261F` | derivado | cartões sobre fundo escuro |
| `--cream` | `#F7F3EB` | derivado do papel/off-white do logotipo | fundo das seções claras |
| `--cream-2` | `#EFE8DA` | derivado | blocos destacados, molduras |
| `--text` | `#2B302C` | derivado | texto corrido |
| `--muted` | `#61675F` | derivado | texto de apoio |
| `--muted-lt` | `#B8BFB6` | derivado | texto de apoio sobre fundo escuro |

**Dois bronzes, não um.** O cobre do logotipo é claro demais para virar cor de texto sobre
creme — dava 3,08 de contraste, abaixo do mínimo de 4,5. Em vez de trocar a cor da marca,
ela foi desdobrada: `--gold` para fundo claro, `--gold-lt` para fundo escuro. Os dois têm a
mesma matiz de cobre. Trocar um pelo outro no contexto errado quebra a legibilidade.

O verde e o bronze não competem: o bronze só aparece em elementos de ação e em detalhes
tipográficos. O fundo nunca é bronze.

---

## 3. Tipografia

O site atual usa **Roboto** e **Roboto Slab**, que vêm por padrão do WordPress/Elementor.
São fontes neutras de interface e não conversam com o logotipo. A landing page troca por
um par que sustenta o posicionamento da casa:

| Papel | Fonte | Pesos | Por quê |
|---|---|---|---|
| Títulos e citações | **Cormorant Garamond** | 300, 400, 500, itálico | Serifa de alto contraste, da mesma família visual do logotipo. Funciona em corpo grande sem parecer datada. |
| Texto, botões e rótulos | **Jost** | 300, 400, 500 | Sans geométrica com desenho refinado. Entreletra larga em caixa alta remete ao `ESPAÇO DE EVENTOS` do logotipo. |

Escala fluida com `clamp()`: o H1 varia de 2,6 rem a 5,1 rem conforme a largura da tela.
Corpo de texto entre 15,5 px e 17 px, entrelinha 1.72.

Rótulos de seção (`.eyebrow`) sempre em caixa alta, 0.7 rem, entreletra `.24em`, cor dourada,
acompanhados de um filete horizontal.

---

## 4. Elementos gráficos

- **Filete de bronze** de 1 px separando blocos, listas e itens de FAQ. Substitui bordas grossas e sombras.
- **Véu no topo** (`.hdr::before`): gradiente que escurece a faixa do cabeçalho sobre a foto do
  herói e some quando o header ganha fundo sólido. Existe por legibilidade, não por estilo.
- **Moldura flutuante** (`.frame--float`): imagem secundária sobreposta à principal, com
  borda de 8 px na cor do fundo. Cria profundidade sem sombra pesada.
- **Numeração serifada** nos diferenciais (`01`–`08`) e nos passos (contorno vazado).
- **Sem** cantos arredondados, gradientes coloridos, ícones genéricos ou emoji.

## 5. Movimento

- Zoom lento de 26 s na foto do herói (`scale 1.09 → 1`).
- Revelação ao rolar: 26 px de deslocamento vertical + opacidade, 0.85 s, escalonada em até 280 ms.
- Botões: preenchimento que sobe de baixo para cima em 0.42 s.
- Tudo respeita `prefers-reduced-motion: reduce`.

---

## 6. Fotografia

O acervo tem duas assinaturas visíveis: **Marcio Rosa Fotografia** e **RichardPhoto**.
As imagens com marca d'água foram mantidas fora das posições de destaque (herói, cartões
principais) e usadas apenas na galeria, em tamanho reduzido. Ver pendência 3 no `LEIA-ME.md`.

Direção de arte das fotos da casa: luz natural quente, verde saturado, ouro e madeira.
A paleta da página foi calibrada para não brigar com isso.
