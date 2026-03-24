// ===================================================
// GAME MAIN — Core Game Controller
// Walking with God · Main orchestration layer
// ===================================================

window.GameMain = (function() {

  // State
  let state = {
    currentChapterIndex: 0,
    completedChapters: [],
    soulPurity: 5,
    sinPoints: 0,
    virtuePoints: 0,
    chapterEffects: {}  // track per-chapter effects
  };

  // Chapter color map
  const chapterColors = {
    lust: 'var(--sin-lust)', gluttony: 'var(--sin-gluttony)', sloth: 'var(--sin-sloth)',
    pride: 'var(--sin-pride)', greed: 'var(--sin-greed)', wrath: 'var(--sin-wrath)', envy: 'var(--sin-envy)'
  };

  // Build chapter map (bottom bar)
  function buildChapterMap() {
    const track = document.getElementById('chapters-track');
    if (!track) return;
    track.innerHTML = '';

    GAME_DATA.chapters.forEach((ch, i) => {
      const node = document.createElement('div');
      node.className = `chapter-node ${i === 0 ? 'active' : 'locked'}`;
      node.id = `ch-node-${ch.id}`;

      // connector line styles
      node.style.cssText = `color: ${ch.color}`;
      if (i > 0) node.style.setProperty('--conn-color', 'rgba(255,255,255,0.1)');

      node.innerHTML = `
        <div class="ch-icon" style="color:${ch.color};border-color:${ch.color}">
          ${ch.emoji}
        </div>
        <div class="ch-name" style="color:${ch.color}">${ch.sinName}</div>
        <div class="ch-num" style="color:${ch.color}">Ch.${ch.index}</div>
      `;

      // connector after
      if (i < 6) {
        node.style.setProperty('--after-bg', 'rgba(255,255,255,0.08)');
      }

      node.onclick = () => {
        // Only navigate to unlocked chapters
        if (!node.classList.contains('locked')) {
          navigateToChapter(i);
        }
      };

      track.appendChild(node);
    });
  }

  // Navigate to a chapter by index
  function navigateToChapter(index) {
    if (index < 0 || index >= GAME_DATA.chapters.length) return;

    state.currentChapterIndex = index;
    const chapter = GAME_DATA.chapters[index];

    // Update chapter map
    document.querySelectorAll('.chapter-node').forEach((n, i) => {
      n.classList.remove('active');
      if (i < index) n.classList.add('completed');
      if (i === index) n.classList.add('active');
    });

    // Update header
    const headerChapter = document.getElementById('header-chapter-text');
    if (headerChapter) {
      headerChapter.textContent = `Chapter ${chapter.index} · ${chapter.sinName} · ${chapter.sinNameCN}之殿`;
      headerChapter.style.color = chapter.color;
    }

    // Apply chapter background color theme
    document.documentElement.style.setProperty('--current-sin', chapter.color);

    // Init dialogue
    DialogueEngine.initChapter(chapter.id);
    DialogueEngine.updateNPCHeader(chapter);

    // Unlock sin node in talent tree
    TalentTree.unlockNode(`${chapter.id}_sin`);
    TalentTree.render('talent-svg');
  }

  // Apply effects from dialogue choices
  function applyEffect(effect, alignment) {
    if (effect.virtue) {
      state.virtuePoints += effect.virtue;
      state.soulPurity = Math.min(100, state.soulPurity + effect.virtue * 0.5);
      updateSoulBar();
      TalentTree.progressSin(GAME_DATA.chapters[state.currentChapterIndex].id, effect.virtue);
      TalentTree.render('talent-svg');
      updatePoints();

      if (effect.virtue >= 15) {
        showNotification(`+${effect.virtue} 美德 · 灵魂净化中...`, '#a8d0b8');
      }
    }
    if (effect.sin) {
      state.sinPoints += effect.sin;
      updatePoints();
      if (effect.sin >= 10) {
        showNotification(`+${effect.sin} 罪孽 · 欲望加深`, '#e87060');
      }
    }
  }

  function updateSoulBar() {
    const bar = document.getElementById('soul-bar');
    const val = document.getElementById('soul-val');
    if (bar) bar.style.width = `${state.soulPurity}%`;
    if (val) val.textContent = `${Math.round(state.soulPurity)}%`;
  }

  function updatePoints() {
    const sp = document.getElementById('sin-points');
    const vp = document.getElementById('virtue-points');
    if (sp) sp.textContent = state.sinPoints;
    if (vp) vp.textContent = state.virtuePoints;
  }

  function showNotification(text, color) {
    const notif = document.getElementById('soul-notif');
    if (!notif) return;
    notif.textContent = text;
    notif.style.borderColor = color || 'var(--gold)';
    notif.style.color = color || 'var(--gold)';
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 2800);
  }

  // Advance to next chapter
  function advanceChapter() {
    const currentChapter = GAME_DATA.chapters[state.currentChapterIndex];

    // Mark as completed
    state.completedChapters.push(currentChapter.id);
    TalentTree.completeChapter(currentChapter.id);
    TalentTree.render('talent-svg');

    // Update map
    const node = document.getElementById(`ch-node-${currentChapter.id}`);
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
    }

    const nextIndex = state.currentChapterIndex + 1;
    if (nextIndex < GAME_DATA.chapters.length) {
      // Unlock next chapter
      const nextNode = document.getElementById(`ch-node-${GAME_DATA.chapters[nextIndex].id}`);
      if (nextNode) nextNode.classList.remove('locked');

      state.soulPurity = Math.min(100, state.soulPurity + 8);
      updateSoulBar();

      setTimeout(() => {
        navigateToChapter(nextIndex);
        showNotification(`✝ 进入第${nextIndex+1}章`, GAME_DATA.chapters[nextIndex].color);
      }, 800);
    } else {
      // Game complete
      showNotification('✝ 七章已历，净化完成', '#ffffff');
      setTimeout(() => {
        state.soulPurity = 100;
        updateSoulBar();
      }, 1000);
    }
  }

  function restartGame() {
    state = { currentChapterIndex: 0, completedChapters: [], soulPurity: 5, sinPoints: 0, virtuePoints: 0, chapterEffects: {} };
    updateSoulBar();
    updatePoints();
    // Re-init all chapter nodes to locked except first
    document.querySelectorAll('.chapter-node').forEach((n, i) => {
      n.className = `chapter-node ${i === 0 ? 'active' : 'locked'}`;
    });
    navigateToChapter(0);
  }

  function focusNPC() {
    // Scroll dialogue panel to top and re-render
    const container = document.getElementById('dialogue-messages');
    if (container) container.scrollTop = 0;
    DialogueEngine.renderCurrentBranch();
  }

  function showTalentSummary() {
    const stats = DialogueEngine.getSessionStats();
    const ch = GAME_DATA.chapters[state.currentChapterIndex];
    DialogueEngine.addMessage('npc',
      `📊 灵魂统计\n\n总选择次数: ${stats.totalChoices}\n美德倾向: ${stats.virtueChoices}次\n罪孽倾向: ${stats.sinChoices}次\n主导意图: ${stats.dominantIntent}\n\n灵魂净化度: ${Math.round(state.soulPurity)}%\n累计美德点: ${state.virtuePoints}\n累计罪孽点: ${state.sinPoints}`
    );
  }

  // Initialize game
  function init() {
    // Hide loading
    setTimeout(() => {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.style.display = 'none', 500);
      }
    }, 1200);

    // Init talent tree
    TalentTree.init('talent-svg', (node) => {
      showNotification(`${node.label} · ${node.labelEN}`, node.color);
    });

    // Build chapter map
    buildChapterMap();
  }

  // Start game from intro
  function startGame() {
    const intro = document.getElementById('screen-intro');
    const main = document.getElementById('screen-main');

    if (intro) {
      intro.style.transition = 'opacity 0.8s';
      intro.style.opacity = '0';
      setTimeout(() => {
        intro.classList.remove('active');
        main.classList.add('active');
        navigateToChapter(0);
      }, 800);
    }
  }

  return {
    init, startGame, navigateToChapter, advanceChapter,
    applyEffect, showNotification, focusNPC, showTalentSummary, restartGame
  };
})();

// ─────────────────────────────────────
// INTRO PARTICLE SYSTEM
// ─────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 0.6 - 0.2,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '#c9a84c' : '#e8a4c8'
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

// Global start function (called from HTML button)
function startGame() {
  window.GameMain.startGame();
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  window.GameMain.init();
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
