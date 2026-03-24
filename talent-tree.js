// ===================================================
// TALENT TREE RENDERER — SVG-based visualization
// Walking with God · Seven Deadly Sins System
// ===================================================

window.TalentTree = (function() {

  const NS = 'http://www.w3.org/2000/svg';
  let unlockedNodes = new Set(['root']);
  let sinAccumulator = {};  // per-sin accumulation
  let onNodeClick = null;

  // Initialize SVG tree
  function init(svgId, clickCallback) {
    onNodeClick = clickCallback;
    GAME_DATA.chapters.forEach(ch => { sinAccumulator[ch.id] = 0; });
    render(svgId);
  }

  // Render full tree
  function render(svgId) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    svg.innerHTML = '';

    const data = GAME_DATA.talentTree;

    // Draw connections first (behind nodes)
    const connGroup = createEl('g', { class: 'connections' });
    data.connections.forEach(([fromId, toId]) => {
      const from = data.nodes.find(n => n.id === fromId);
      const to = data.nodes.find(n => n.id === toId);
      if (!from || !to) return;

      const isUnlocked = unlockedNodes.has(fromId) && unlockedNodes.has(toId);
      const isPartial = unlockedNodes.has(fromId) && !unlockedNodes.has(toId);

      const line = createEl('line', {
        x1: from.x, y1: from.y, x2: to.x, y2: to.y,
        stroke: isUnlocked ? from.color : (isPartial ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'),
        'stroke-width': isUnlocked ? 1.5 : 1,
        'stroke-dasharray': isUnlocked ? 'none' : '3,3',
        opacity: isUnlocked ? 0.8 : 0.4
      });

      // Glow for unlocked
      if (isUnlocked) {
        line.style.filter = `drop-shadow(0 0 3px ${from.color})`;
      }

      connGroup.appendChild(line);
    });
    svg.appendChild(connGroup);

    // Draw nodes
    const nodeGroup = createEl('g', { class: 'nodes' });
    data.nodes.forEach(node => {
      if (node.id === 'purification') return; // special — drawn last
      drawNode(nodeGroup, node);
    });

    // Draw purification node last (center overlay)
    const purif = data.nodes.find(n => n.id === 'purification');
    if (purif) drawNode(nodeGroup, purif);

    svg.appendChild(nodeGroup);
  }

  function drawNode(group, node) {
    const isUnlocked = unlockedNodes.has(node.id);
    const isRoot = node.type === 'root';
    const isFinal = node.type === 'final';
    const isVirtue = node.type === 'virtue';

    const g = createEl('g', {
      class: `talent-node ${isUnlocked ? 'unlocked' : 'locked'} ${isRoot ? 'active' : ''}`,
      transform: `translate(${node.x}, ${node.y})`,
      'data-id': node.id
    });

    if (node.id !== 'purification') {
      // Background glow (unlocked only)
      if (isUnlocked) {
        const glow = createEl('circle', {
          cx: 0, cy: 0,
          r: isRoot ? 22 : isVirtue ? 16 : 13,
          fill: node.color,
          opacity: 0.15,
          filter: `url(#glow-${node.id.replace(/[^a-z]/gi,'_')})`
        });
        group.appendChild(glow); // separate from g for z-order
      }

      // Main circle
      const r = isRoot ? 16 : isVirtue ? 11 : 9;
      const circle = createEl('circle', {
        cx: 0, cy: 0, r,
        fill: isUnlocked ? (isVirtue ? node.color : `${node.color}33`) : 'rgba(30,25,20,0.8)',
        stroke: node.color,
        'stroke-width': isUnlocked ? (isRoot ? 2.5 : 1.5) : 0.8,
        opacity: isUnlocked ? 1 : 0.35
      });

      if (isUnlocked) {
        circle.style.filter = `drop-shadow(0 0 ${isRoot ? 10 : 5}px ${node.color})`;
      }

      g.appendChild(circle);

      // Icon or symbol
      const symbol = getNodeSymbol(node);
      if (symbol) {
        const txt = createEl('text', {
          x: 0, y: 1,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'font-size': isRoot ? '10' : isVirtue ? '8' : '7',
          fill: isUnlocked ? '#fff' : node.color,
          opacity: isUnlocked ? 1 : 0.4,
          'pointer-events': 'none'
        });
        txt.textContent = symbol;
        g.appendChild(txt);
      }

      // Label
      const labelY = isRoot ? 24 : r + 8;
      const label = createEl('text', {
        x: 0, y: labelY,
        'text-anchor': 'middle',
        'font-size': isRoot ? '7.5' : '6',
        fill: isUnlocked ? node.color : 'rgba(255,255,255,0.25)',
        'font-family': 'Cinzel, serif',
        'letter-spacing': '0.05em',
        'pointer-events': 'none'
      });
      label.textContent = node.label;
      g.appendChild(label);

      // Click handler
      g.style.cursor = isUnlocked ? 'pointer' : 'default';
      g.addEventListener('click', () => {
        if (isUnlocked && onNodeClick) onNodeClick(node);
      });

      group.appendChild(g);
    } else {
      // Purification — special overlay node in center
      const isFullyUnlocked = unlockedNodes.has('purification');
      const virtueNodes = ['chastity','temperance','diligence','humility','charity','patience','kindness'];
      const completedVirtues = virtueNodes.filter(v => unlockedNodes.has(v)).length;
      const progress = completedVirtues / 7;

      // Pulsing ring for purification progress
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
        const r2 = 35;
        const x2 = node.x + Math.cos(angle) * r2;
        const y2 = node.y + Math.sin(angle) * r2;
        const vId = virtueNodes[i];
        const isDone = unlockedNodes.has(vId);
        const sin = GAME_DATA.chapters[i];
        const dot = createEl('circle', {
          cx: x2, cy: y2, r: 3,
          fill: isDone ? sin.color : 'rgba(255,255,255,0.1)',
          opacity: isDone ? 1 : 0.3
        });
        if (isDone) dot.style.filter = `drop-shadow(0 0 4px ${sin.color})`;
        group.appendChild(dot);
      }

      // Center purification
      const pCircle = createEl('circle', {
        cx: node.x, cy: node.y, r: 18,
        fill: isFullyUnlocked ? 'rgba(255,255,255,0.2)' : 'transparent',
        stroke: isFullyUnlocked ? '#fff' : `rgba(255,255,255,${0.05 + progress * 0.4})`,
        'stroke-width': 1,
        'stroke-dasharray': isFullyUnlocked ? 'none' : '4,2'
      });
      if (isFullyUnlocked) pCircle.style.filter = 'drop-shadow(0 0 15px white)';
      group.appendChild(pCircle);

      const pText = createEl('text', {
        x: node.x, y: node.y + 1,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': '9',
        fill: isFullyUnlocked ? '#fff' : `rgba(255,255,255,${0.1 + progress * 0.6})`,
        'font-family': 'Cinzel, serif',
        'pointer-events': 'none'
      });
      pText.textContent = isFullyUnlocked ? '✝' : `${completedVirtues}/7`;
      group.appendChild(pText);

      const pLabel = createEl('text', {
        x: node.x, y: node.y + 28,
        'text-anchor': 'middle',
        'font-size': '6',
        fill: `rgba(255,255,255,${0.1 + progress * 0.5})`,
        'font-family': 'Cinzel, serif',
        'letter-spacing': '0.1em'
      });
      pLabel.textContent = '净化';
      group.appendChild(pLabel);
    }
  }

  function getNodeSymbol(node) {
    const symbols = {
      root: '✦',
      lust_sin: '♥', gluttony_sin: '◎', sloth_sin: '◻', pride_sin: '▲', greed_sin: '◆', wrath_sin: '⚡', envy_sin: '☽',
      lust_mid: '○', gluttony_mid: '◑', sloth_mid: '▷', pride_mid: '◉', greed_mid: '⟡', wrath_mid: '◈', envy_mid: '◐',
      chastity: '✧', temperance: '⊕', diligence: '⟶', humility: '⊘', charity: '✦', patience: '∞', kindness: '✿'
    };
    return symbols[node.id] || node.labelEN[0];
  }

  // Unlock a node and its prerequisites
  function unlockNode(nodeId) {
    const node = GAME_DATA.talentTree.nodes.find(n => n.id === nodeId);
    if (!node) return;

    // Check requirements
    const canUnlock = node.requires.every(req => unlockedNodes.has(req));
    if (!canUnlock) return false;

    unlockedNodes.add(nodeId);
    return true;
  }

  // Progress sin-specific nodes based on accumulated points
  function progressSin(sinId, amount) {
    sinAccumulator[sinId] = (sinAccumulator[sinId] || 0) + amount;

    // Auto-unlock nodes based on progress thresholds
    const sinNode = `${sinId}_sin`;
    const midNode = `${sinId}_mid`;
    const virtueMap = {
      lust: 'chastity', gluttony: 'temperance', sloth: 'diligence',
      pride: 'humility', greed: 'charity', wrath: 'patience', envy: 'kindness'
    };
    const virtueNode = virtueMap[sinId];

    if (sinAccumulator[sinId] >= 5 && !unlockedNodes.has(sinNode)) {
      unlockNode(sinNode);
    }
    if (sinAccumulator[sinId] >= 15 && !unlockedNodes.has(midNode)) {
      unlockNode(midNode);
    }
    if (sinAccumulator[sinId] >= 30 && !unlockedNodes.has(virtueNode)) {
      unlockNode(virtueNode);
      // Check for full purification
      const virtues = Object.values(virtueMap);
      if (virtues.every(v => unlockedNodes.has(v))) {
        unlockNode('purification');
      }
    }
  }

  // Mark chapter as completed — unlock all nodes for that sin
  function completeChapter(sinId) {
    const sinNode = `${sinId}_sin`;
    const midNode = `${sinId}_mid`;
    const virtueMap = {
      lust: 'chastity', gluttony: 'temperance', sloth: 'diligence',
      pride: 'humility', greed: 'charity', wrath: 'patience', envy: 'kindness'
    };

    unlockNode(sinNode);
    unlockNode(midNode);
    const vn = virtueMap[sinId];
    if (vn) unlockNode(vn);

    // Check purification
    const virtues = Object.values(virtueMap);
    if (virtues.every(v => unlockedNodes.has(v))) {
      unlockNode('purification');
    }
  }

  function createEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
    return el;
  }

  function getUnlocked() { return new Set(unlockedNodes); }

  return { init, render, unlockNode, progressSin, completeChapter, getUnlocked };
})();
