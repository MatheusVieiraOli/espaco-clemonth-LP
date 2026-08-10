/* =========================================================
   ESPAÇO CLEMONTH — interações da landing page
   Sem dependências externas.
   ========================================================= */
(function () {
  'use strict';

  window.__clemonth = true;          // avisa ao fallback do <head> que o script carregou

  var WA = '5521999279258';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------
     Ano do rodapé
     --------------------------------------------------------- */
  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Header fixo
     --------------------------------------------------------- */
  var hdr = $('#hdr');
  var onScroll = function () {
    hdr.classList.toggle('is-stuck', window.scrollY > 60);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------------
     Menu mobile
     --------------------------------------------------------- */
  var burger = $('#burger');
  var mnav   = $('#mnav');
  var toggleMenu = function (open) {
    burger.setAttribute('aria-expanded', String(open));
    mnav.hidden = !open;
    document.body.classList.toggle('is-locked', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  burger.addEventListener('click', function () {
    toggleMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  $$('a', mnav).forEach(function (a) {
    a.addEventListener('click', function () { toggleMenu(false); });
  });

  /* ---------------------------------------------------------
     Revelação ao rolar
     --------------------------------------------------------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('is-in'); }, Math.min(i * 70, 280));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------------------------------------------------
     Galeria
     --------------------------------------------------------- */
  var FOTOS = [
    { f: 'img-3939',        c: 'casamento',   s: 'w', a: 'Cerimônia de casamento à noite na ilha do lago, com arco de flores e passadeira sobre a ponte' },
    { f: 'a-r-206-2',       c: 'espaco',      s: 'w', a: 'Vista do lago com a ilha e o quiosque de cobertura de palha ao entardecer' },
    { f: 'duf5121',         c: 'casamento',   s: 't', a: 'Noivos saindo da cerimônia entre os convidados' },
    { f: 'copia-de-0332',   c: '15anos',      s: 't', a: 'Entrada da debutante pela ponte do lago com efeitos de luz' },
    { f: 'a-r-67-scaled',   c: 'espaco',      s: '',  a: 'Piscina com deck de madeira e coqueiros' },
    { f: 'duf4391',         c: 'casamento',   s: '',  a: 'Mesa longa montada no salão com arranjos suspensos' },
    { f: 'mg-3798-scaled',  c: 'gastronomia', s: '',  a: 'Canapés de camarão em travessa de prata' },
    { f: '15-anos-11',      c: '15anos',      s: '',  a: 'Salão montado com mesas longas e arranjos altos em tons de vermelho' },
    { f: 'decoracao-1',     c: 'casamento',   s: '',  a: 'Mesa dos noivos posta no jardim, com plaquinhas nas cadeiras' },
    { f: 'a-r-210-scaled',  c: 'gastronomia', s: 'w', a: 'Mesa de recepção montada no jardim ao entardecer' },
    { f: 'copia-de-0040',   c: 'gastronomia', s: '',  a: 'Doce fino em forminha sobre bandeja espelhada' },
    { f: 'duf4394',         c: 'casamento',   s: '',  a: 'Mesa longa posta no salão, com louça e taçaria da casa' },
    { f: '0063',            c: 'decoracao',   s: '',  a: 'Vera Barbosa entre os arranjos florais da casa' },
    { f: 'casamento-j-d-622', c: 'casamento', s: '',  a: 'Mesa de doces finos com arranjos de flores' },
    { f: 'img-3621',        c: 'decoracao',   s: 'w', a: 'Mesas espelhadas postas no salão com vista para o jardim' },
    { f: 'casamento-j-d-621-1', c: 'casamento', s: '', a: 'Bombons e doces sobre aparador clássico' },
    { f: '0062',            c: 'gastronomia', s: '',  a: 'Bar montado com frutas frescas e bebidas' },
    { f: 'a-r-13-scaled',   c: 'espaco',      s: '',  a: 'Área externa do Espaço Clemonth' },
    { f: '0202',            c: 'gastronomia', s: '',  a: 'Serviço de gastronomia da casa' },
    { f: 'decoracao-12',    c: 'decoracao',   s: '',  a: 'Ambiente decorado pela equipe da casa' },
    { f: 'mg-3820-2',       c: 'gastronomia', s: '',  a: 'Prato preparado pela cozinha do Clemonth' },
    { f: 'decoracao-4',     c: 'decoracao',   s: '',  a: 'Detalhe de decoração de mesa' },
    { f: 'copia-de-mg-5645-1-scaled', c: 'casamento', s: 't', a: 'Convite, votos e detalhes do noivo dispostos sobre o deck de madeira' },
    { f: 'decoracao-7',     c: 'decoracao',   s: '',  a: 'Composição floral montada para o evento' },
    { f: '0205',            c: 'gastronomia', s: '',  a: 'Detalhe do serviço de mesa' },
    { f: 'decoracao-9',     c: 'decoracao',   s: '',  a: 'Ambiente decorado pela equipe da casa' },
    { f: 'decoracao-15-scaled', c: 'decoracao', s: 'w', a: 'Cenário montado para cerimônia' },
    { f: 'decoracao-11',    c: 'decoracao',   s: '',  a: 'Detalhe de decoração do salão' },
    { f: 'whatsapp-image-2021-10-19-at-16-46-38-1', c: 'gastronomia', s: '', a: 'Bar de frutas e bebidas montado para a festa' },
    { f: 'decoracao-17',    c: 'decoracao',   s: '',  a: 'Arranjo de mesa preparado pela casa' },
    { f: 'decoracao-6',     c: 'decoracao',   s: '',  a: 'Ambiente decorado pela equipe da casa' },
    { f: 'decoracao-20-scaled', c: 'decoracao', s: '', a: 'Detalhe de decoração de ambiente' },
    { f: 'decoracao-13',    c: 'decoracao',   s: '',  a: 'Cenário decorado para a festa' },
    { f: 'decoracao-18',    c: 'decoracao',   s: '',  a: 'Detalhe floral da decoração' },
    { f: 'decoracao-3',     c: 'decoracao',   s: '',  a: 'Ambiente decorado pela equipe da casa' },
    { f: 'whatsapp-image-2021-11-11-at-19-04-22-5', c: 'decoracao', s: '', a: 'Montagem de ambiente para evento' }
  ];

  var LOTE  = 12;
  var gal   = $('#gal');
  var more  = $('#galMore');
  var filtro = 'todos';
  var mostrados = LOTE;

  function montar() {
    var html = FOTOS.map(function (o, i) {
      var cls = 'gal__i' + (o.s === 'w' ? ' gal__i--w' : o.s === 't' ? ' gal__i--t' : '');
      return '<button type="button" class="' + cls + '" data-c="' + o.c + '" data-i="' + i + '" aria-label="Ampliar foto">' +
             '<picture>' +
               '<source srcset="media/img/' + o.f + '.webp" type="image/webp">' +
               '<img src="media/img/' + o.f + '.jpg" alt="' + o.a + '" loading="lazy" decoding="async">' +
             '</picture></button>';
    }).join('');
    gal.innerHTML = html;
  }

  function aplicar() {
    var visiveis = 0;
    $$('.gal__i', gal).forEach(function (el) {
      var bate = filtro === 'todos' || el.dataset.c === filtro;
      var cabe = bate && visiveis < mostrados;
      if (bate) visiveis++;
      el.classList.toggle('is-out', !cabe);
    });
    var total = filtro === 'todos'
      ? FOTOS.length
      : FOTOS.filter(function (o) { return o.c === filtro; }).length;
    more.hidden = mostrados >= total;
  }

  if (gal) {
    montar();
    aplicar();

    $$('.filters__b').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.filters__b').forEach(function (x) {
          x.classList.remove('is-on');
          x.setAttribute('aria-pressed', 'false');
        });
        b.classList.add('is-on');
        b.setAttribute('aria-pressed', 'true');
        filtro = b.dataset.f;
        mostrados = LOTE;
        aplicar();
      });
    });

    more.addEventListener('click', function () {
      mostrados += LOTE;
      aplicar();
    });
  }

  /* ---------------------------------------------------------
     Lightbox
     --------------------------------------------------------- */
  var lb    = $('#lb');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var atual = 0;

  function listaVisivel() {
    return $$('.gal__i', gal).filter(function (el) { return !el.classList.contains('is-out'); });
  }

  function abrir(el) {
    var lista = listaVisivel();
    atual = lista.indexOf(el);
    pintar();
    lb.hidden = false;
    document.body.classList.add('is-locked');
    $('#lbX').focus();
  }

  function pintar() {
    var lista = listaVisivel();
    if (!lista.length) return;
    if (atual < 0) atual = lista.length - 1;
    if (atual >= lista.length) atual = 0;
    var o = FOTOS[+lista[atual].dataset.i];
    lbImg.src = 'media/img/' + o.f + '.jpg';
    lbImg.alt = o.a;
    lbCap.textContent = o.a;
  }

  function fechar() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.classList.remove('is-locked');
  }

  if (gal) {
    gal.addEventListener('click', function (e) {
      var el = e.target.closest('.gal__i');
      if (el) abrir(el);
    });
  }
  $('#lbX').addEventListener('click', fechar);
  $('#lbP').addEventListener('click', function () { atual--; pintar(); });
  $('#lbN').addEventListener('click', function () { atual++; pintar(); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.tagName === 'FIGURE') fechar();
  });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape')     fechar();
    if (e.key === 'ArrowLeft')  { atual--; pintar(); }
    if (e.key === 'ArrowRight') { atual++; pintar(); }
  });

  /* ---------------------------------------------------------
     Máscara de telefone
     --------------------------------------------------------- */
  var fone = $('#fone');
  if (fone) {
    fone.addEventListener('input', function () {
      var d = fone.value.replace(/\D/g, '').slice(0, 11);
      var v = '';
      if (d.length)      v = '(' + d.slice(0, 2);
      if (d.length >= 3) v += ') ' + d.slice(2, d.length > 10 ? 7 : 6);
      if (d.length >= 7) v += '-' + d.slice(d.length > 10 ? 7 : 6);
      fone.value = v;
    });
  }

  /* ---------------------------------------------------------
     Formulário → WhatsApp
     --------------------------------------------------------- */
  var form = $('#form');
  var erro = $('#formErr');

  function dataBR(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var campos = [
        { el: $('#nome'), nome: 'seu nome' },
        { el: $('#fone'), nome: 'seu WhatsApp' },
        { el: $('#tipo'), nome: 'o tipo de evento' }
      ];
      var faltando = [];

      campos.forEach(function (c) {
        var vazio = !c.el.value.trim();
        c.el.parentElement.classList.toggle('is-bad', vazio);
        if (vazio) faltando.push(c.nome);
      });

      var dig = $('#fone').value.replace(/\D/g, '');
      if (dig && dig.length < 10) {
        $('#fone').parentElement.classList.add('is-bad');
        if (faltando.indexOf('seu WhatsApp') === -1) faltando.push('um WhatsApp com DDD');
      }

      if (faltando.length) {
        erro.hidden = false;
        erro.textContent = 'Falta preencher: ' + faltando.join(', ') + '.';
        var ruim = $('.f.is-bad input, .f.is-bad select', form);
        if (ruim) ruim.focus();
        return;
      }
      erro.hidden = true;

      var l = [];
      l.push('Olá! Vim pelo site do Espaço Clemonth e gostaria de agendar uma visita.');
      l.push('');
      l.push('Nome: ' + $('#nome').value.trim());
      l.push('WhatsApp: ' + $('#fone').value.trim());
      l.push('Tipo de evento: ' + $('#tipo').value);
      if ($('#data').value)          l.push('Data prevista: ' + dataBR($('#data').value));
      if ($('#pessoas').value)       l.push('Convidados: ' + $('#pessoas').value);
      if ($('#email').value.trim())  l.push('E-mail: ' + $('#email').value.trim());
      if ($('#msg').value.trim())    l.push('', $('#msg').value.trim());

      var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(l.join('\n'));

      /* ---- PONTO DE INTEGRAÇÃO ----------------------------------------
         Para gravar o lead num CRM, planilha ou e-mail além de abrir o
         WhatsApp, descomente e aponte para o seu endpoint. O envio é
         disparado sem travar a abertura da conversa.

         fetch('https://SEU-ENDPOINT/leads', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             nome:     $('#nome').value.trim(),
             telefone: $('#fone').value.trim(),
             tipo:     $('#tipo').value,
             data:     $('#data').value,
             pessoas:  $('#pessoas').value,
             email:    $('#email').value.trim(),
             mensagem: $('#msg').value.trim(),
             origem:   location.href
           }),
           keepalive: true
         }).catch(function () {});
      ------------------------------------------------------------------ */

      var btn = $('button[type="submit"]', form);
      btn.textContent = 'Abrindo o WhatsApp…';
      window.open(url, '_blank', 'noopener');
      setTimeout(function () { btn.textContent = 'Quero receber a proposta'; }, 2500);
    });

    $$('#form input, #form select').forEach(function (el) {
      el.addEventListener('input', function () {
        el.parentElement.classList.remove('is-bad');
      });
    });
  }

  /* ---------------------------------------------------------
     Rolagem suave compensando o header fixo
     --------------------------------------------------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      var y = alvo.getBoundingClientRect().top + window.pageYOffset - (hdr.offsetHeight - 2);
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

})();
