/**
 * PawApp — app.js
 * Lógica completa: navegação, chat, modais, interações
 */

// ══════════════════════════════════════
// NAVEGAÇÃO ENTRE SEÇÕES
// ══════════════════════════════════════

function goSection(name) {
  // Esconde todas as seções
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // Mostra a seção alvo
  const target = document.getElementById('section-' + name);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }

  // Atualiza nav items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.section === name) btn.classList.add('active');
  });

  // Fecha sidebar no mobile
  closeSidebar();
}

// Inicializa nav items
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => goSection(btn.dataset.section));
});

// ══════════════════════════════════════
// SIDEBAR MOBILE
// ══════════════════════════════════════

const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const hamburger      = document.getElementById('hamburger');

hamburger?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('open');
});

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
}

// ══════════════════════════════════════
// CURTIDAS — TOGGLE
// ══════════════════════════════════════

function toggleLike(btnId, countId) {
  const btn   = document.getElementById(btnId);
  const count = document.getElementById(countId);
  if (!btn || !count) return;

  const n = parseInt(count.textContent);

  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    btn.innerHTML = btn.innerHTML.replace('❤️', '🤍');
    count.textContent = n - 1;
  } else {
    btn.classList.add('liked');
    btn.innerHTML = btn.innerHTML.replace('🤍', '❤️');
    count.textContent = n + 1;
    // Animação de bounce
    btn.style.transform = 'scale(1.35)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  }
}

// ══════════════════════════════════════
// FOLLOW / UNFOLLOW
// ══════════════════════════════════════

function toggleFollow(btn) {
  if (btn.classList.contains('following')) {
    btn.classList.remove('following');
    btn.textContent = '+ Seguir';
  } else {
    btn.classList.add('following');
    btn.textContent = 'Seguindo';
    btn.style.transform = 'scale(1.15)';
    setTimeout(() => { btn.style.transform = ''; }, 220);
  }
}

// ══════════════════════════════════════
// FILTROS — CHIPS
// ══════════════════════════════════════

function setFilter(el) {
  const parent = el.closest('.filter-bar') || el.closest('.vet-status-filter');
  if (!parent) return;
  parent.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// ══════════════════════════════════════
// HEADER TABS (Lojas)
// ══════════════════════════════════════

function setHTab(el) {
  const parent = el.closest('.header-tabs');
  if (!parent) return;
  parent.querySelectorAll('.htab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ══════════════════════════════════════
// CONV TABS (Mensagens)
// ══════════════════════════════════════

function setCTab(el) {
  const parent = el.closest('.conv-tabs');
  if (!parent) return;
  parent.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ══════════════════════════════════════
// ABRIR CONVERSA (Mensagens)
// ══════════════════════════════════════

function openConv(el, name, icon) {
  // Remove active de todas as conversas
  document.querySelectorAll('.conv-item').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  // Remove badge de não lidos
  const badge = el.querySelector('.conv-unread');
  if (badge) badge.remove();

  // Atualiza header do chat
  const nameEl = document.getElementById('conv-name');
  const avEl   = document.getElementById('conv-av');
  if (nameEl) nameEl.textContent = name;
  if (avEl)   avEl.textContent   = icon;
}

// ══════════════════════════════════════
// CHAT — CONSULTA ONLINE
// ══════════════════════════════════════

function sendMsg(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;

  const msgs = document.getElementById('chat-msgs');
  if (!msgs) return;

  // Adiciona mensagem enviada
  const msgEl = document.createElement('div');
  msgEl.className = 'msg sent';
  msgEl.innerHTML = `<div class="msg-bubble">${escapeHtml(input.value)}</div>`;
  msgs.appendChild(msgEl);
  input.value = '';

  // Scroll para o final
  msgs.scrollTop = msgs.scrollHeight;

  // Limpa área de anexo
  clearAttach();

  // Simula resposta do veterinário
  simulateVetResponse(msgs);
}

function simulateVetResponse(msgs) {
  const responses = [
    'Entendido! Vou verificar isso para você. 🩺',
    'Obrigado pela informação! Pode me enviar uma foto para eu avaliar melhor?',
    'Isso é relativamente comum em golden retrievers. Não se preocupe! 😊',
    'Recomendo observar por mais 24h e me dar um retorno. 📋',
    'Vou gerar uma prescrição para você agora. 💊',
  ];

  const typing = document.createElement('div');
  typing.className = 'msg received';
  typing.innerHTML = '<div class="msg-bubble" style="opacity:.5">Digitando... ✍️</div>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    typing.innerHTML = `<div class="msg-bubble">${responses[Math.floor(Math.random() * responses.length)]}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1400);
}

// ══════════════════════════════════════
// CHAT — MENSAGENS GERAIS
// ══════════════════════════════════════

function sendMsgConv(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('msgs-input');
  if (!input || !input.value.trim()) return;

  const msgs = document.getElementById('msgs-chat');
  if (!msgs) return;

  const msgEl = document.createElement('div');
  msgEl.className = 'msg sent';
  msgEl.innerHTML = `<div class="msg-bubble">${escapeHtml(input.value)}</div>`;
  msgs.appendChild(msgEl);
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  // Resposta automática simples
  const replies = [
    'Claro! Vou verificar e te respondo em breve. 😊',
    'Entendido! Obrigado pelo contato. 🐾',
    'Ótimo! Qualquer dúvida pode chamar aqui.',
    'Perfeito! Fique à vontade para perguntar qualquer coisa.',
  ];

  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'msg received';
    reply.innerHTML = `<div class="msg-bubble">${replies[Math.floor(Math.random() * replies.length)]}</div>`;
    msgs.appendChild(reply);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}

// ══════════════════════════════════════
// ANEXAR ARQUIVO
// ══════════════════════════════════════

function attachFile() {
  const area = document.getElementById('attach-area');
  if (area) {
    area.style.display = 'block';
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function clearAttach() {
  const area = document.getElementById('attach-area');
  if (area) area.style.display = 'none';
}

// ══════════════════════════════════════
// SELECIONAR VETERINÁRIO
// ══════════════════════════════════════

function selectVet(el) {
  document.querySelectorAll('.vet-card').forEach(c => c.classList.remove('active-vet'));
  el.classList.add('active-vet');

  // Atualiza nome no chat
  const nameEl = el.querySelector('.vet-name-big');
  const chatName = document.querySelector('.chat-vet-name');
  if (nameEl && chatName) {
    chatName.textContent = nameEl.textContent.trim();
  }
}

// ══════════════════════════════════════
// MODAIS
// ══════════════════════════════════════

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function closeModalOuter(event, id) {
  // Fecha apenas se clicar no overlay (fundo), não no conteúdo
  if (event.target.id === id) closeModal(id);
}

// Fecha modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ══════════════════════════════════════
// VISIBILIDADE DO POST
// ══════════════════════════════════════

document.addEventListener('click', (e) => {
  const vis = e.target.closest('.vis-opt');
  if (!vis) return;
  document.querySelectorAll('.vis-opt').forEach(v => v.classList.remove('active'));
  vis.classList.add('active');
});

// ══════════════════════════════════════
// CALENDÁRIO — DIAS CLICÁVEIS
// ══════════════════════════════════════

document.querySelectorAll('.cal-day:not(.empty)').forEach(day => {
  day.addEventListener('click', function () {
    document.querySelectorAll('.cal-day').forEach(d => {
      if (!d.classList.contains('today')) d.style.background = '';
      d.style.color = '';
      d.style.fontWeight = '';
    });
    if (!this.classList.contains('today')) {
      this.style.background = 'rgba(92,184,122,.15)';
      this.style.color = 'var(--accent)';
      this.style.fontWeight = '700';
    }
  });
});

// ══════════════════════════════════════
// COUNTDOWN — OFERTA RELÂMPAGO
// ══════════════════════════════════════

function updateCountdown() {
  const el = document.querySelector('.banner-tag');
  if (!el) return;

  // Tempo inicial em segundos (2h 14min 33s)
  if (!window._countdownSecs) window._countdownSecs = 2 * 3600 + 14 * 60 + 33;
  if (window._countdownSecs <= 0) return;

  window._countdownSecs--;
  const h = Math.floor(window._countdownSecs / 3600);
  const m = Math.floor((window._countdownSecs % 3600) / 60);
  const s = window._countdownSecs % 60;

  el.textContent = `⚡ Oferta relâmpago · Termina em ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

setInterval(updateCountdown, 1000);

// ══════════════════════════════════════
// MAPA — PINOS INTERATIVOS
// ══════════════════════════════════════

document.querySelectorAll('.map-pin').forEach(pin => {
  pin.addEventListener('click', function () {
    // Destaca o pino clicado
    document.querySelectorAll('.map-pin').forEach(p => {
      p.style.background = '';
      p.style.color = '';
    });
    this.style.background = 'var(--accent)';
    this.style.color = '#fff';

    // Remove destaque após 2s
    setTimeout(() => {
      this.style.background = '';
      this.style.color = '';
    }, 2000);
  });
});

// ══════════════════════════════════════
// GRÁFICO DE PESO — ANIMAÇÃO
// ══════════════════════════════════════

function animateWeightBars() {
  const bars = document.querySelectorAll('.wc-bar');
  bars.forEach((bar, i) => {
    const target = bar.style.height;
    bar.style.height = '0%';
    setTimeout(() => {
      bar.style.height = target;
    }, 100 + i * 120);
  });
}

// ══════════════════════════════════════
// OBSERVER — ATIVA ANIMAÇÕES AO ENTRAR NA VIEW
// ══════════════════════════════════════

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('weight-chart')) {
        animateWeightBars();
      }
      if (entry.target.classList.contains('mini-bar-fill')) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => { entry.target.style.width = width; }, 100);
      }
    }
  });
}, { threshold: 0.3 });

// Observa elementos animáveis
document.querySelectorAll('.weight-chart, .mini-bar-fill').forEach(el => {
  observer.observe(el);
});

// ══════════════════════════════════════
// NOTIFICAÇÃO — SOS SIMULADO
// ══════════════════════════════════════

function showSOSToast() {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 24px; right: 24px;
    background: #E05555;
    color: #fff;
    padding: 14px 20px;
    border-radius: 14px;
    font-size: .84rem;
    font-weight: 700;
    font-family: 'Sora', sans-serif;
    box-shadow: 0 8px 32px rgba(224,85,85,.4);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    animation: slideInToast .4s cubic-bezier(.16,1,.3,1);
    max-width: 320px;
  `;
  toast.innerHTML = '🆘 <div><div>SOS Ativo: Rex está perdido!</div><div style="font-size:.72rem;opacity:.8;font-weight:400">📍 2,3 km de você — Toque para ajudar</div></div>';

  // Adiciona animação
  const style = document.createElement('style');
  style.textContent = `@keyframes slideInToast { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }`;
  document.head.appendChild(style);

  toast.addEventListener('click', () => {
    goSection('sos');
    toast.remove();
  });

  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 8000);
}

// Dispara o toast após 4 segundos de uso
setTimeout(showSOSToast, 4000);

// ══════════════════════════════════════
// UTILS
// ══════════════════════════════════════

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ══════════════════════════════════════
// INICIALIZAÇÃO
// ══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Garante feed ativo
  goSection('feed');

  // Scroll suave nas stories
  const stories = document.querySelector('.stories-row');
  if (stories) {
    let isDragging = false, startX, scrollLeft;
    stories.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.pageX - stories.offsetLeft;
      scrollLeft = stories.scrollLeft;
    });
    stories.addEventListener('mouseleave', () => isDragging = false);
    stories.addEventListener('mouseup', () => isDragging = false);
    stories.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      stories.scrollLeft = scrollLeft - (e.pageX - stories.offsetLeft - startX);
    });
  }

  console.log('🐾 PawApp iniciado com sucesso!');
});
