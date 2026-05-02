/**
 * PawApp — app.js
 * Lógica de navegação entre telas e interações da UI
 */

// ──────────────────────────────────────
// NAVEGAÇÃO DE TELAS
// ──────────────────────────────────────

/** Mostra a tela pelo nome e esconde todas as outras */
function showScreen(name) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));

  const target = document.getElementById('screen-' + name);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }

  // Atualiza botões externos
  document.querySelectorAll('.snav-btn').forEach(btn => {
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
  });

  updateClock();
}

// ──────────────────────────────────────
// CURTIDAS — TOGGLE
// ──────────────────────────────────────

/**
 * Alterna curtida em um post
 * @param {string} btnId  - ID do botão
 * @param {string} countId - ID do contador
 */
function toggleLike(btnId, countId) {
  const btn   = document.getElementById(btnId);
  const count = document.getElementById(countId);
  const current = parseInt(count.textContent);

  if (btn.classList.contains('liked')) {
    // Descurtir
    btn.classList.remove('liked');
    btn.innerHTML = btn.innerHTML.replace('❤️', '🤍');
    count.textContent = current - 1;
    animateLike(btn, false);
  } else {
    // Curtir
    btn.classList.add('liked');
    btn.innerHTML = btn.innerHTML.replace('🤍', '❤️');
    count.textContent = current + 1;
    animateLike(btn, true);
  }
}

/** Animação de bounce ao curtir */
function animateLike(btn, isLike) {
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => { btn.style.transform = 'scale(1)'; }, 180);
}

// ──────────────────────────────────────
// TABS DO PERFIL
// ──────────────────────────────────────

/**
 * Troca a aba ativa no perfil
 * @param {HTMLElement} el  - botão clicado
 * @param {string} targetId - id do conteúdo a exibir
 */
function switchPTab(el, targetId) {
  // Tabs
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  // Conteúdo
  document.querySelectorAll('.ptab-content').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');
}

// ──────────────────────────────────────
// FILTER CHIPS — EXPLORAR
// ──────────────────────────────────────

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-chip')) {
    const parent = e.target.closest('.explore-filters');
    if (!parent) return;
    parent.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ──────────────────────────────────────
// VISIBILIDADE DO POST — RADIO CUSTOM
// ──────────────────────────────────────

document.addEventListener('click', (e) => {
  const vis = e.target.closest('.vis-opt');
  if (!vis) return;
  document.querySelectorAll('.vis-opt').forEach(v => v.classList.remove('active'));
  vis.classList.add('active');
});

// ──────────────────────────────────────
// RELÓGIO DA STATUS BAR
// ──────────────────────────────────────

function updateClock() {
  const el = document.querySelector('.status-time');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  el.textContent = `${h}:${m}`;
}

// Atualiza a cada minuto
updateClock();
setInterval(updateClock, 60000);

// ──────────────────────────────────────
// PREVIEW DE IMAGEM — NOVO POST
// ──────────────────────────────────────

const newpostPreview = document.querySelector('.newpost-preview');
if (newpostPreview) {
  newpostPreview.addEventListener('click', () => {
    // Simula seleção de imagem mostrando um gradiente aleatório
    const gradients = [
      'linear-gradient(135deg, #f6d365, #fda085)',
      'linear-gradient(135deg, #84fab0, #8fd3f4)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
    ];
    const rand = gradients[Math.floor(Math.random() * gradients.length)];
    newpostPreview.style.background = rand;
    newpostPreview.style.border = 'none';

    const placeholder = newpostPreview.querySelector('.preview-placeholder');
    if (placeholder) {
      placeholder.innerHTML = '<span style="font-size:3rem">✅</span><p style="color:#fff;font-weight:700">Foto adicionada!</p>';
    }
  });
}

// ──────────────────────────────────────
// FERRAMENTA DE POSTS — FEEDBACK VISUAL
// ──────────────────────────────────────

document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    this.style.background = 'var(--accent-lt)';
    this.style.borderColor = 'var(--accent)';
    this.style.color = 'var(--accent)';
    setTimeout(() => {
      this.style.background = '';
      this.style.borderColor = '';
      this.style.color = '';
    }, 600);
  });
});

// ──────────────────────────────────────
// EFEITO DE SCROLL SUAVE NAS STORIES
// ──────────────────────────────────────

const storiesWrap = document.querySelector('.stories-wrap');
if (storiesWrap) {
  // Drag-to-scroll nas stories
  let isDown = false;
  let startX;
  let scrollLeft;

  storiesWrap.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - storiesWrap.offsetLeft;
    scrollLeft = storiesWrap.scrollLeft;
  });

  storiesWrap.addEventListener('mouseleave', () => { isDown = false; });
  storiesWrap.addEventListener('mouseup', () => { isDown = false; });
  storiesWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storiesWrap.offsetLeft;
    storiesWrap.scrollLeft = scrollLeft - (x - startX);
  });
}

// ──────────────────────────────────────
// FOLLOW BUTTON — TOGGLE
// ──────────────────────────────────────

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('follow-btn')) return;
  const btn = e.target;

  if (btn.classList.contains('following')) {
    btn.classList.remove('following');
    btn.textContent = '+ Seguir';
  } else {
    btn.classList.add('following');
    btn.textContent = 'Seguindo';
    // Mini animação
    btn.style.transform = 'scale(1.15)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  }
});

// ──────────────────────────────────────
// PUBLICAR POST — FEEDBACK
// ──────────────────────────────────────

const publishBtn = document.querySelector('.btn-publish');
if (publishBtn) {
  publishBtn.addEventListener('click', () => {
    publishBtn.textContent = '✅ Publicado!';
    setTimeout(() => {
      publishBtn.textContent = 'Publicar';
      showScreen('home');
    }, 800);
  });
}

// ──────────────────────────────────────
// INICIALIZAÇÃO
// ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Garante que a tela inicial esteja visível
  showScreen('onboarding');
  console.log('🐾 PawApp iniciado com sucesso!');
});
