# Pitch — o que muda com a nova página

Material de apoio para a reunião. Todo diagnóstico abaixo foi verificado no site atual em
**10 de agosto de 2026**, não é suposição.

---

## O diagnóstico em uma frase

O Clemonth tem o produto (lago com ilha, capela, buffet próprio, 16,9 mil seguidores) e não
tem a página. O site atual esconde justamente o que faz o cliente decidir.

---

## 1. Os vídeos de depoimento pesam 798 MB

Os três depoimentos de casais na home são servidos **em resolução original**, exportados de
um editor de celular a 15 Mbps:

| Arquivo | Tamanho | Duração |
|---|---|---|
| `InShot_20210910_174101326.mp4` | **398 MB** | 3 min 37 s |
| `InShot_20211011_160405237.mp4` | **218 MB** | 2 min |
| `InShot_20210813_093838634.mp4` | **182 MB** | 1 min 38 s |

Três agravantes, todos verificáveis:

- As tags são `<video controls src="...">`, **sem `preload="none"`** — o navegador começa a
  buscar dado assim que a home carrega, mesmo se ninguém apertar play.
- **Sem `poster`.** Antes de o vídeo carregar, o visitante vê três retângulos pretos onde
  deveria estar a prova social mais forte da casa.
- Os arquivos **não têm `faststart`**: o índice (`moov`) está no fim do arquivo, depois do
  `mdat`. É o pior cenário possível para reprodução na web.

**O que fiz:** recomprimi para 720 px de largura com `faststart`, `preload="none"` e capa
extraída do próprio vídeo. **798 MB → 35 MB**, com o áudio e o conteúdo intactos. Os
depoimentos continuam sendo os mesmos três casais, agora visíveis no celular.

## 2. Fotos de até 25 MB

`Casamento-J-D-621-1.jpg` tem 25 MB. `A-R-206-2.jpg` tem 20,6 MB. São arquivos de câmera
subidos direto no WordPress. Reprocessados para 1800 px em JPG + WebP: o acervo inteiro de
52 fotos saiu de 113 MB para 22 MB.

Carga inicial da nova página, medida no navegador: **534 KB, 9 requisições, `load` em 391 ms.**

## 3. Nenhum telefone, endereço ou e-mail no site

Percorri as seis páginas. Não existe telefone escrito, endereço, e-mail nem mapa com rota.
O único caminho é o formulário e um botão flutuante de WhatsApp de plugin.

Quem está pesquisando local de casamento abre cinco abas ao mesmo tempo. Se não achar em dez
segundos onde fica e quanto cabe, fecha a aba.

**Na nova página:** WhatsApp no cabeçalho, no herói, no meio do conteúdo, na barra fixa do
celular, no formulário, no rodapé e na seção de localização — com endereço completo, horário
de visita e mapa com botão de rota.

## 4. As perguntas que decidem a compra não têm resposta

Quantas pessoas cabem. Se chover, tem plano B. Se o buffet é da casa. Se tem estacionamento.
Com que antecedência reservar. Quanto custa. **Nenhuma delas é respondida no site atual.**

A nova página tem uma faixa de números logo abaixo do herói (220 sentados · 200 na capela ·
70 vagas · 3 cenários de cerimônia) e uma seção de dúvidas com as oito perguntas reais que
antecedem a visita.

## 5. O formulário manda e-mail, não WhatsApp

O Ninja Forms envia para uma caixa de entrada. No Brasil, para este tipo de compra, a
conversa acontece no WhatsApp — e o próprio Clemonth já sabe disso, porque o botão flutuante
e o link da bio do Instagram apontam para lá.

**Na nova página:** o formulário monta a mensagem pronta e abre a conversa já preenchida com
nome, telefone, tipo de evento, data prevista e número de convidados. A equipe recebe o lead
qualificado, não um "oi, tudo bem?".

## 6. A informação está espalhada em seis páginas

Home, Sobre nós, Nossos espaços, Eventos, Gastronomia, Decoração. Cada clique é uma chance
de perder o visitante. A landing page reúne tudo em um fluxo único, na ordem em que a decisão
é tomada: encantar → provar → tirar objeção → converter.

## 7. A melhor frase da marca não está no site

No Instagram, o Clemonth escreve assim:

> *"Você não precisa de mais um salão. Você precisa do lugar certo."*
> *"Perto de você. Diferente de tudo que você já viu."*

No site, o título é "O LUGAR PERFEITO PARA SEU EVENTO" — que qualquer salão do Brasil poderia
assinar. A nova página usa a voz que eles já criaram.

---

## Como a página foi montada para converter

| Seção | Função |
|---|---|
| Herói com a foto do lago | Mostra em dois segundos o que nenhum concorrente da região tem |
| Faixa de números | Responde "cabe minha festa?" antes de qualquer rolagem longa |
| O espaço + 8 diferenciais | Constrói o valor que justifica o preço |
| Tipos de evento | Faz o visitante se reconhecer |
| Gastronomia e decoração com nome e rosto | Chef Eriberto e Vera Barbosa viram gente, não "equipe" |
| Degustação do menu | Oferta intermediária, de baixo compromisso, para quem ainda não vai fechar |
| O que está incluído | Mata a objeção do "quanto mais vou ter que gastar depois" |
| Galeria filtrável | Deixa a noiva ver casamento e a mãe da debutante ver 15 anos |
| Três depoimentos em vídeo | Prova social sem intermediário |
| Como funciona | Reduz o medo do processo |
| Dúvidas | Remove as oito últimas objeções |
| Formulário → WhatsApp | Converte no canal onde a venda realmente acontece |
| Barra fixa no celular | WhatsApp e "agendar visita" sempre a um toque |

---

## Argumentos para a reunião

1. **Comece pelo celular.** Abra o site atual no 4G, na frente deles, e role até os
   depoimentos. Depois abra a nova página. A diferença dispensa slide.
2. **Mostre os 798 MB.** É um número que ninguém do outro lado sabe que existe, e explica
   por que o site "trava".
3. **Pergunte quantos leads chegam por e-mail e quantos por WhatsApp.** A resposta abre
   sozinha a conversa sobre o formulário.
4. **Não ataque quem fez o site.** O site é de 2021, feito em Elementor, e cumpriu o papel
   dele. O que mudou foi o comportamento de quem compra.
5. **A página está pronta e é deles.** Não é maquete: abre o `index.html` e funciona, com as
   fotos e os vídeos da casa. Isso encurta a decisão.

---

## Próximos passos sugeridos

1. Confirmar os dados da pendência 1 do `LEIA-ME.md` (capacidade, vagas, horário).
2. Trocar as fotos com marca d'água de terceiros por versões liberadas.
2b. **Ensaio da casa vazia** (meio dia de fotógrafo). O acervo atual não tem uma única foto do
   salão vazio, da capela, do camarim ou do estacionamento — é o que a noiva quer ver antes
   de marcar a visita, e é um serviço adicional fácil de vender junto com a página.
3. Publicar em domínio ou subdomínio e ligar Google Analytics + Pixel (o Pixel
   `467199081612977` já existe e pode ser reaproveitado).
4. Rodar um teste de duas semanas medindo conversas iniciadas no WhatsApp, comparando com o
   volume atual do formulário.
