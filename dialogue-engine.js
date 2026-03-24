// ===================================================
// DIALOGUE ENGINE — Intent Recognition + Branch Logic
// Multi-turn conversation manager for Walking with God
// ===================================================

window.DialogueEngine = (function() {

  // State
  let currentChapterId = 'lust';
  let currentBranchId = 'opening';
  let conversationHistory = [];
  let intentLog = [];

  // Intent recognition from player text (if free input were used)
  function recognizeIntent(text) {
    const patterns = GAME_DATA.intentPatterns;
    const scores = {};
    for (const [intent, keywords] of Object.entries(patterns)) {
      scores[intent] = keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
    }
    const top = Object.entries(scores).sort((a,b) => b[1]-a[1])[0];
    return top[1] > 0 ? top[0] : 'NEUTRAL';
  }

  // Get current chapter data
  function getCurrentChapter() {
    return GAME_DATA.chapters.find(c => c.id === currentChapterId);
  }

  // Get current branch
  function getCurrentBranch() {
    const ch = getCurrentChapter();
    if (!ch) return null;
    if (currentBranchId === 'opening') return ch.dialogueTrees.opening;
    return ch.dialogueTrees.branches[currentBranchId] || null;
  }

  // Initialize chapter dialogue
  function initChapter(chapterId) {
    currentChapterId = chapterId;
    currentBranchId = 'opening';
    conversationHistory = [];
    intentLog = [];
    renderCurrentBranch();
  }

  // Process a choice selection
  function selectChoice(choiceId) {
    const branch = getCurrentBranch();
    if (!branch) return;

    const choices = branch.choices;
    const choice = choices.find(c => c.id === choiceId);
    if (!choice) return;

    // Log intent
    intentLog.push({ choiceId, intent: choice.intentLabel, alignment: choice.alignment, timestamp: Date.now() });

    // Add player message to chat
    addMessage('player', choice.text, choice.intentLabel);

    // Apply effects
    if (choice.effect) {
      window.GameMain && window.GameMain.applyEffect(choice.effect, choice.alignment);
    }

    // Short delay then show NPC response
    setTimeout(() => {
      addMessage('npc', choice.response);

      // Handle special actions
      if (choice.action) {
        setTimeout(() => handleAction(choice.action), 800);
        return;
      }

      // Navigate to next branch
      if (choice.next) {
        currentBranchId = choice.next;
        setTimeout(() => renderChoices(), 600);
      }
    }, 400);
  }

  // Handle special game actions
  function handleAction(action) {
    switch(action) {
      case 'nextChapter':
        window.GameMain && window.GameMain.advanceChapter();
        break;
      case 'restart':
        window.GameMain && window.GameMain.restartGame();
        break;
      case 'showTalentSummary':
        window.GameMain && window.GameMain.showTalentSummary();
        break;
    }
  }

  // Add message to dialogue UI
  function addMessage(speaker, text, intentLabel) {
    const ch = getCurrentChapter();
    const container = document.getElementById('dialogue-messages');
    if (!container) return;

    const msg = document.createElement('div');
    msg.className = `msg msg-${speaker === 'npc' ? 'npc' : 'player'}`;

    const npcName = ch ? ch.npc.name : 'NPC';
    const color = ch ? ch.color : '#c9a84c';

    if (speaker === 'npc') {
      msg.innerHTML = `
        <div class="msg-name" style="color:${color}">${npcName}</div>
        <div class="msg-bubble" style="border-left-color:${color}">${formatText(text)}</div>
      `;
    } else {
      msg.innerHTML = `
        <div class="msg-name">Lance · 兰西</div>
        <div class="msg-bubble">${formatText(text)}</div>
        ${intentLabel ? `<div style="text-align:right"><span class="intent-tag">${intentLabel}</span></div>` : ''}
      `;
    }

    container.appendChild(msg);
    scrollToBottom();

    // Store history
    conversationHistory.push({ speaker, text, intentLabel, time: Date.now() });
  }

  // Format text (convert \n to <br>)
  function formatText(text) {
    return text.replace(/\n/g, '<br>');
  }

  // Scroll dialogue messages to bottom
  function scrollToBottom() {
    const msgContainer = document.getElementById('dialogue-messages');
    if (msgContainer) {
      msgContainer.scrollTo({ top: msgContainer.scrollHeight, behavior: 'smooth' });
    }
  }

  // Render current branch choices
  function renderChoices() {
    const branch = getCurrentBranch();
    const container = document.getElementById('dialogue-choices');
    if (!container || !branch) return;

    container.innerHTML = '';

    // Show NPC opening text if not already shown (for branch transitions)
    if (branch.npcText && currentBranchId !== 'opening') {
      addMessage('npc', branch.npcText);
    }

    branch.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = `choice-btn ${choice.alignment === 'virtue' ? 'virtue-leaning' : choice.alignment === 'sin' ? 'sin-leaning' : 'neutral'}`;
      btn.textContent = choice.text;
      btn.onclick = () => {
        // Disable all choices after selection
        container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
        container.querySelectorAll('.choice-btn').forEach(b => b.style.opacity = '0.4');
        btn.style.opacity = '1';
        btn.style.borderColor = 'var(--gold)';
        selectChoice(choice.id);
      };
      container.appendChild(btn);
    });

    // Scroll to latest message after choices render
    setTimeout(scrollToBottom, 50);
  }

  // Render the full current branch (opening text + choices)
  function renderCurrentBranch() {
    const branch = getCurrentBranch();
    if (!branch) return;

    // Clear messages
    const msgContainer = document.getElementById('dialogue-messages');
    if (msgContainer) {
      msgContainer.innerHTML = '';
    }

    // Show opening NPC text with typing effect
    typeMessage(branch.npcText || '', () => {
      renderChoices();
    });
  }

  // Typing effect for NPC messages
  function typeMessage(text, callback) {
    const container = document.getElementById('dialogue-messages');
    if (!container) return;

    const ch = getCurrentChapter();
    const color = ch ? ch.color : '#c9a84c';
    const npcName = ch ? ch.npc.name : 'NPC';

    const msg = document.createElement('div');
    msg.className = 'msg msg-npc';

    const nameLine = `<div class="msg-name" style="color:${color}">${npcName}</div>`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble typing-cursor';
    bubble.style.borderLeftColor = color;

    msg.innerHTML = nameLine;
    msg.appendChild(bubble);
    container.appendChild(msg);
    scrollToBottom();

    const formatted = text.replace(/\n/g, '<br>');
    const stripped = text.replace(/<[^>]*>/g, '');
    const speed = 18; // ms per character

    // For long text, use faster display
    if (stripped.length > 200) {
      bubble.innerHTML = formatted;
      bubble.classList.remove('typing-cursor');
      conversationHistory.push({ speaker: 'npc', text, time: Date.now() });
      scrollToBottom();
      setTimeout(callback, 300);
      return;
    }

    let i = 0;
    let currentHtml = '';
    const chars = formatted.split('');

    function type() {
      if (i < chars.length) {
        currentHtml += chars[i];
        bubble.innerHTML = currentHtml + '|';
        i++;
        container.scrollTop = container.scrollHeight;
        setTimeout(type, chars[i-1] === '\n' || chars[i-1] === '。' || chars[i-1] === '——' ? speed * 4 : speed);
      } else {
        bubble.innerHTML = currentHtml;
        bubble.classList.remove('typing-cursor');
        conversationHistory.push({ speaker: 'npc', text, time: Date.now() });
        scrollToBottom();
        if (callback) setTimeout(callback, 200);
      }
    }

    type();
  }

  // Update NPC header
  function updateNPCHeader(chapter) {
    const portrait = document.getElementById('npc-portrait');
    const name = document.getElementById('npc-name');
    const role = document.getElementById('npc-role');

    if (portrait) {
      portrait.textContent = chapter.npc.emoji;
      portrait.style.borderColor = chapter.color;
    }
    if (name) name.textContent = `${chapter.npc.name} · ${chapter.npc.nameCN}`;
    if (role) role.textContent = `${chapter.npc.role} · ${chapter.npc.roleCN}`;
  }

  // Get session stats
  function getSessionStats() {
    const sinChoices = intentLog.filter(l => l.alignment === 'sin').length;
    const virtueChoices = intentLog.filter(l => l.alignment === 'virtue').length;
    const intentCounts = {};
    intentLog.forEach(l => {
      intentCounts[l.intent] = (intentCounts[l.intent] || 0) + 1;
    });
    const dominantIntent = Object.entries(intentCounts).sort((a,b) => b[1]-a[1])[0];
    return {
      totalChoices: intentLog.length,
      sinChoices,
      virtueChoices,
      intentLog,
      dominantIntent: dominantIntent ? dominantIntent[0] : 'NEUTRAL',
      conversationHistory
    };
  }

  // Public API
  return {
    initChapter,
    selectChoice,
    recognizeIntent,
    renderCurrentBranch,
    updateNPCHeader,
    getSessionStats,
    getCurrentChapter: () => getCurrentChapter(),
    addMessage
  };
})();
