// ===================================================
// WALKING WITH GOD — GAME DATA ENGINE
// Seven Deadly Sins × Seven Virtues × Talent Tree
// Based on: Dante's Inferno + Rocinha Favela Context
// ===================================================

window.GAME_DATA = {

  // ─────────────────────────────────────────────
  // CHAPTER DEFINITIONS — 7 Sin Chapters
  // Architecture reference: Exploded View / Section
  // ─────────────────────────────────────────────
  chapters: [
    {
      id: 'lust',
      index: 1,
      sinName: 'LUST',
      sinNameCN: '色欲',
      virtueCounterpart: 'CHASTITY',
      virtueCN: '贞洁',
      color: '#e8a4c8',
      emoji: '🌹',
      architectureRef: 'Ground floor · Chapel / De(Dressing Room)',
      spaceMechanism: '共享 · Sharing',
      spaceHeight: 'Level 0 — Entry',
      pathDifficulty: '易达 (Open Access)',
      unlockCondition: null, // always open
      description: '色欲：人们通过欲望吸引他人，参与礼仪式，寻觅引导。家庭的议室与Dressing空间，无法完全彻底礼开始，整体身体氛围。',
      descriptionEN: 'Lust draws people inward through desire, ceremony, and the longing for connection. The Chapel creates a threshold between worldly desire and spiritual beginning.',
      npc: {
        name: 'Guardian',
        nameCN: '守门人',
        role: 'Guardian of Lust',
        roleCN: '色欲守门人',
        emoji: '👁',
        personality: '妖冶、诱惑、隐藏着深沉悲悯',
        sinAffinity: 0.8,
        intentTriggers: {
          curiosity: 0.9,
          resistance: 0.3,
          submission: 0.7,
          question: 0.6
        }
      },
      trial: {
        name: '镜厅试炼',
        nameEN: 'The Hall of Mirrors',
        rule: '你被置于一个所有墙面皆为镜子的空间。每一面镜子映照的是你想要之物，而非你本身的样貌。',
        mechanism: '空间监督 + 自我暴露',
        objective: '找到真正属于你的镜像，而非欲望的倒影',
        spatialCue: '光线从上方倾泻，镜面随情绪起伏角度',
        mechanics: ['共享', '监督', '暴露'],
        reward: { virtue: 15, sin: 5 }
      },
      dialogueTrees: {
        opening: {
          npcText: '欢迎来到第一章，旅者。\n\n我是色欲之殿的守门人。\n\n在这里，所有人都携带着渴望。你的渴望，\n将决定你能走多远。',
          choices: [
            {
              id: 'lust_c1',
              text: '我对欲望没有兴趣，我只想通过。',
              type: 'resistance',
              alignment: 'virtue',
              intentLabel: 'DENIAL',
              response: '有趣。逃避从不是净化的路径。\n\n那些试图绕过欲望的人，往往在更深处迷失。\n\n告诉我：你最后一次真诚地渴望某件事，是什么时候？',
              effect: { virtue: 5, sin: -2 },
              next: 'lust_branch_a'
            },
            {
              id: 'lust_c2',
              text: '我承认——我来这里，是因为我渴望被理解。',
              type: 'submission',
              alignment: 'neutral',
              intentLabel: 'CONFESSION',
              response: '终于，一个诚实的灵魂。\n\n"被理解"是最纯粹也最危险的欲望之一——\n它可以孕育爱，也可以蜕变为控制。\n\n你愿意在镜厅中直视自己的渴望吗？',
              effect: { virtue: 8, sin: 3 },
              next: 'lust_branch_b'
            },
            {
              id: 'lust_c3',
              text: '色欲不应被净化，它是生命的本质。',
              type: 'curiosity',
              alignment: 'sin',
              intentLabel: 'INDULGENCE',
              response: '你的话让我心动……也让我担忧。\n\n生命的本质是流动，而非停滞。\n\n欲望若不被引导，将把你困在自己造的牢笼里。\n\n进入镜厅，你将亲眼见证这一点。',
              effect: { virtue: 2, sin: 10 },
              next: 'lust_branch_c'
            },
            {
              id: 'lust_c4',
              text: '这座建筑是什么？它为何建在贫民窟里？',
              type: 'question',
              alignment: 'neutral',
              intentLabel: 'INQUIRY',
              response: '洞察者。\n\n这里是里约 Rocinha——\n世界上最密集的渴望聚集地之一。\n\n十万人的欲望堆叠成山，\n这座建筑从那山的中心生长出来，\n像一根刺穿迷雾的脊柱。\n\n你准备好了解它的七层秘密了吗？',
              effect: { virtue: 10, sin: 2 },
              next: 'lust_branch_d'
            }
          ]
        },
        branches: {
          lust_branch_a: {
            npcText: '拒绝欲望，也是一种欲望——\n渴望纯洁，渴望逃离，渴望更高的自我。\n\n进入镜厅。让镜子告诉你，你真正想要什么。',
            choices: [
              { id: 'la_1', text: '我选择进入。', type: 'neutral', alignment: 'virtue', intentLabel: 'ACCEPTANCE', response: '勇气可嘉。镜厅已为你开启。', effect: { virtue: 8 }, next: 'trial_start' },
              { id: 'la_2', text: '我还需要更多时间思考。', type: 'neutral', alignment: 'neutral', intentLabel: 'HESITATION', response: '时间在此处不流逝，也不等待。\n你已经在思考了——这本身就是开始。', effect: { virtue: 3 }, next: 'trial_start' }
            ]
          },
          lust_branch_b: {
            npcText: '"被理解"——多么人性的渴望。\n\n在这座建筑里，每一面墙都在聆听。\n每一个空间都在回应你的内心。\n\n你要如何在镜厅中寻找那个理解你的存在？',
            choices: [
              { id: 'lb_1', text: '通过展示真实的自己。', type: 'submission', alignment: 'virtue', intentLabel: 'AUTHENTICITY', response: '这是最短的路，也是最难走的路。去吧。', effect: { virtue: 12 }, next: 'trial_start' },
              { id: 'lb_2', text: '通过观察镜中的倒影。', type: 'curiosity', alignment: 'sin', intentLabel: 'OBSERVATION', response: '小心，旅者。倒影只映照外表，不映照灵魂。', effect: { sin: 5 }, next: 'trial_start' }
            ]
          },
          lust_branch_c: {
            npcText: '那么，你相信欲望的力量。\n\n好——进入镜厅，让欲望引导你。\n\n但记住：当欲望让你原地打转时，\n你是否有勇气选择转向？',
            choices: [
              { id: 'lc_1', text: '我愿意接受这个挑战。', type: 'neutral', alignment: 'sin', intentLabel: 'CHALLENGE', response: '真正的强者才敢承认欲望。进入。', effect: { sin: 8, virtue: 5 }, next: 'trial_start' }
            ]
          },
          lust_branch_d: {
            npcText: '里约·罗辛哈。\n\n十三万灵魂，挤在四平方公里的山坡上。\n\n他们的欲望——食物、安全、尊严、爱——\n构成了这座建筑的地基。\n\n你看到的每一堵墙，都是某人渴望的化身。\n\n现在，进入镜厅，加入这场集体的坦白。',
            choices: [
              { id: 'ld_1', text: '我理解了。带我进入第一章试炼。', type: 'neutral', alignment: 'neutral', intentLabel: 'READINESS', response: '镜厅，为洞察者开启。', effect: { virtue: 15, sin: 2 }, next: 'trial_start' }
            ]
          },
          trial_start: {
            npcText: '🪞 镜厅试炼已开启\n\n规则：空间中有七面镜子，每面映照一种欲望。\n你必须找到那面映照你"真实渴望"的镜子——\n而非你以为自己想要的。\n\n每选择一面错误的镜子，空间就会缩小一层。\n\n你的选择……是什么？',
            choices: [
              { id: 'ts_1', text: '走向映照"权力"的镜子', type: 'curiosity', alignment: 'sin', intentLabel: 'POWER_DESIRE', response: '镜面开裂。"权力"是遮盖其他欲望的面具。\n空间缩小了一层。继续寻找。', effect: { sin: 8 }, next: 'trial_end' },
              { id: 'ts_2', text: '走向映照"归属"的镜子', type: 'submission', alignment: 'virtue', intentLabel: 'BELONGING', response: '"归属感"——最被压制的人类欲望。\n镜面发出金光。\n\n你通过了第一章试炼。', effect: { virtue: 20, sin: 0 }, next: 'trial_end' },
              { id: 'ts_3', text: '走向映照"成就"的镜子', type: 'neutral', alignment: 'neutral', intentLabel: 'ACHIEVEMENT', response: '"成就"是美德，也是陷阱。\n镜面微微颤抖——半对半错。\n\n你获得了通过，但不完整。', effect: { virtue: 10, sin: 5 }, next: 'trial_end' }
            ]
          },
          trial_end: {
            npcText: '第一章，已经留下了你的印记。\n\n带着你所学到的，继续前行吧——\n\n第二章的贪食之殿，正在等待你。',
            choices: [
              { id: 'te_1', text: '前往第二章：贪食', type: 'neutral', alignment: 'neutral', intentLabel: 'PROCEED', response: '路途开始了。', effect: { virtue: 5 }, action: 'nextChapter' }
            ]
          }
        }
      }
    },

    {
      id: 'gluttony',
      index: 2,
      sinName: 'GLUTTONY',
      sinNameCN: '暴食',
      virtueCounterpart: 'TEMPERANCE',
      virtueCN: '节制',
      color: '#f4c96e',
      emoji: '🍂',
      architectureRef: 'Upper dome · Shared dining platform',
      spaceMechanism: '共享 · 监督',
      spaceHeight: 'Level 2 — Elevated',
      pathDifficulty: '螺旋上升路径',
      unlockCondition: 'lust_completed',
      description: '暴食之空间采用螺旋形公共餐台，也使它"消化与充刈"——公共饮食，从重重置在他人注视下的调查室开始。引导穿越者，引导跟踪路径行进，引导每个空间工代表"节制"这过程。',
      descriptionEN: 'Gluttony space is structured around a spiral shared dining platform. The act of consumption becomes public, observed, and ultimately transformed into temperance.',
      npc: {
        name: 'Cerberus',
        nameCN: '刻耳柏洛斯',
        role: 'Guardian of Gluttony',
        roleCN: '暴食守门犬',
        emoji: '🐺',
        personality: '贪婪、热情、渴望被喂养，却不知满足为何物',
        sinAffinity: 0.9
      },
      trial: {
        name: '公共饮食试炼',
        nameEN: 'The Communal Feast',
        rule: '圆形桌上摆满食物。你只能取走足够自己所需的份额。但其他人也在看——他们可以索取你选择放弃的部分。',
        mechanism: '共享 + 社会监督',
        objective: '在他人注视下，节制地取用，并主动分享剩余',
        spatialCue: '螺旋形上升路径，视野逐渐开阔，暴食者停滞在下层',
        mechanics: ['共享', '监督', '路径高差'],
        reward: { virtue: 18, sin: 5 }
      },
      dialogueTrees: {
        opening: {
          npcText: '嗯哼——终于来了新的灵魂。\n\n我是刻耳柏洛斯，三头犬，暴食之殿的守卫。\n\n你看那螺旋台阶——往上走，越走越高，视野越开阔。\n\n但每一步，都需要你放下一些东西才能继续。\n\n你，携带了什么多余的重量？',
          choices: [
            { id: 'g1', text: '我携带的不是食物，是执念。', type: 'submission', alignment: 'virtue', intentLabel: 'SELF_AWARENESS', response: '执念……是所有"暴食"中最重的一种。\n你能说出你最难放下的执念吗？', effect: { virtue: 10 }, next: 'gluttony_branch_a' },
            { id: 'g2', text: '我不明白为何节制是美德。', type: 'curiosity', alignment: 'sin', intentLabel: 'QUESTIONING', response: '因为节制不是压制欲望——\n而是选择欲望的方式与时机。\n\n来，坐上圆桌，亲身体验何为"足够"。', effect: { sin: 5, virtue: 3 }, next: 'gluttony_branch_b' },
            { id: 'g3', text: '贫民窟的人们用暴食逃避痛苦，你如何评判他们？', type: 'question', alignment: 'virtue', intentLabel: 'EMPATHY', response: '这是最好的问题。\n\n他们不是在逃避——他们在用唯一可得到的方式填补空洞。\n\n这座建筑建在Rocinha的核心，正是为了回应这个问题。\n\n节制不是剥夺，而是给予人们足够的尊严来"选择"。', effect: { virtue: 15 }, next: 'gluttony_branch_c' }
          ]
        },
        branches: {
          gluttony_branch_a: { npcText: '放下执念，走上螺旋——每一层都会更轻。', choices: [{ id: 'ga1', text: '开始试炼', type: 'neutral', alignment: 'virtue', intentLabel: 'PROCEED', response: '公共饮食试炼已开启。', effect: { virtue: 5 }, next: 'g_trial' }] },
          gluttony_branch_b: { npcText: '圆桌已摆好。你将亲身体验"足够"与"过量"的边界。', choices: [{ id: 'gb1', text: '接受体验', type: 'neutral', alignment: 'neutral', intentLabel: 'ACCEPTANCE', response: '好奇心将带你通过。', effect: { virtue: 3, sin: 3 }, next: 'g_trial' }] },
          gluttony_branch_c: { npcText: '你理解了建筑的核心意图。带着这份理解进入试炼。', choices: [{ id: 'gc1', text: '进入公共饮食试炼', type: 'neutral', alignment: 'virtue', intentLabel: 'READINESS', response: '慈悲者更易通过节制之门。', effect: { virtue: 12 }, next: 'g_trial' }] },
          g_trial: {
            npcText: '🍽 公共饮食试炼\n\n圆桌上有12份食物，你需要选择取用多少：\n\n你感到饥饿，但不至于极度饥饿。',
            choices: [
              { id: 'gt1', text: '只取1份（够我一人的量）', type: 'submission', alignment: 'virtue', intentLabel: 'RESTRAINT', response: '你留下了11份给他人。\n\n其他人开始感谢你——你的节制创造了慷慨。\n\n螺旋台阶向你敞开，光线从顶部涌入。', effect: { virtue: 20 }, next: 'g_end' },
              { id: 'gt2', text: '取3份（以防万一）', type: 'neutral', alignment: 'neutral', intentLabel: 'CAUTION', response: '理性的选择。\n\n但你注意到最后来的旅者什么都没得到。\n\n台阶向你开放，但比想象中陡峭。', effect: { virtue: 10, sin: 5 }, next: 'g_end' },
              { id: 'gt3', text: '取6份（我不确定后面还有没有食物）', type: 'curiosity', alignment: 'sin', intentLabel: 'HOARDING', response: '恐惧驱使的囤积——这正是Rocinha人们日复一日的困境。\n\n你体验了他们的感受。\n\n但螺旋台阶在你脚下颤抖。理解，不等于可以通过。', effect: { sin: 12, virtue: 5 }, next: 'g_end' }
            ]
          },
          g_end: { npcText: '第二章，已烙入你的记忆。\n\n上方，懒惰之空间，正等待着那些停滞的灵魂。', choices: [{ id: 'ge1', text: '前往第三章：懒惰', type: 'neutral', alignment: 'neutral', intentLabel: 'PROCEED', response: '继续前行。', effect: { virtue: 3 }, action: 'nextChapter' }] }
        }
      }
    },

    {
      id: 'sloth',
      index: 3,
      sinName: 'SLOTH',
      sinNameCN: '懒惰',
      virtueCounterpart: 'DILIGENCE',
      virtueCN: '勤勉',
      color: '#8fb8d4',
      emoji: '⏳',
      architectureRef: 'Interior labyrinth · Elevated maze with height variance',
      spaceMechanism: '路径高差 · 可达性变化',
      spaceHeight: 'Level 1-3 · Varied elevation',
      pathDifficulty: '迷宫路径，高差阻碍（需攀爬）',
      unlockCondition: 'gluttony_completed',
      description: '懒惰者人进入复杂迷宫，习惯于在布满障碍下，几乎停止独立感应到健康，停止在位否置。',
      descriptionEN: 'The slothful find themselves in a maze of increasing difficulty. Stagnation is literally built into the architecture — you cannot progress without effort.',
      npc: {
        name: 'Belphegor',
        nameCN: '别伏尔',
        role: 'Lord of Sloth',
        roleCN: '懒惰之主',
        emoji: '💤',
        personality: '慵懒、睿智、以惰性为哲学的古老守卫',
        sinAffinity: 0.7
      },
      trial: {
        name: '迷宫攀越试炼',
        nameEN: 'The Labyrinth of Inertia',
        rule: '迷宫中有多条路径。最短的路对应最高的垂直障碍，必须攀越。最长的路对应最平缓的坡道，但会耗费你大量时间。',
        mechanism: '路径高差 + 可达性抉择',
        objective: '选择路径本身即是关于勤勉的表态',
        spatialCue: '立体三维迷宫，高差从±0到+8m，光照从顶部渗入',
        mechanics: ['路径高差', '可达性', '时间惩罚'],
        reward: { virtue: 15, sin: 8 }
      },
      dialogueTrees: {
        opening: {
          npcText: '……嗯……你也来了？\n\n我是别伏尔，懒惰之主。\n\n（打了个哈欠）\n\n在我的领地里，时间流逝得很慢——\n慢到你甚至可以合理化不行动的理由。\n\n你有多久没有主动迈出一步了？',
          choices: [
            { id: 's1', text: '我一直在等待合适的时机。', type: 'submission', alignment: 'sin', intentLabel: 'PROCRASTINATION', response: '"合适的时机"——懒惰最精妙的谎言。\n\n在Rocinha的山坡上，等待不会带来机会。\n每天早上，人们必须爬坡才能生存。\n\n你的"时机"，已经在你等待的途中逝去了。', effect: { sin: 8, virtue: 3 }, next: 'sloth_branch_a' },
            { id: 's2', text: '我行动了，但结果不尽如人意，所以停下了。', type: 'neutral', alignment: 'neutral', intentLabel: 'DISCOURAGEMENT', response: '这不是懒惰，这是伤痛。\n\n两者非常相似——但解法完全不同。\n\n懒惰需要推动，伤痛需要愈合。\n\n告诉我，你停下的那一刻，发生了什么？', effect: { virtue: 8 }, next: 'sloth_branch_b' },
            { id: 's3', text: '懒惰是现代病，不是罪。', type: 'curiosity', alignment: 'sin', intentLabel: 'DEFENSE', response: '半对。\n\n懒惰是症状，现代性是病因之一。\n\n但"理解原因"不能替代"迈出一步"。\n\n迷宫已为你开放。你选择哪条路，\n将决定你理解的深度。', effect: { sin: 5, virtue: 5 }, next: 'sloth_trial' }
          ]
        },
        branches: {
          sloth_branch_a: { npcText: '合适的时机就是现在。迷宫在等你。', choices: [{ id: 'sa1', text: '进入迷宫', type: 'neutral', alignment: 'virtue', intentLabel: 'ACTION', response: '第一步，总是最难的。', effect: { virtue: 8 }, next: 'sloth_trial' }] },
          sloth_branch_b: { npcText: '受伤的灵魂，迷宫为你提供了一条特殊的路径——不是最难的，但需要你自己找到它。', choices: [{ id: 'sb1', text: '我会找到属于我的路。', type: 'submission', alignment: 'virtue', intentLabel: 'RESOLVE', response: '这就够了。前进吧。', effect: { virtue: 12 }, next: 'sloth_trial' }] },
          sloth_trial: {
            npcText: '⏳ 迷宫攀越试炼\n\n眼前三条路：\n🔵 短路 · 需攀越3m高墙 · 约5分钟\n🟡 中路 · 坡道 · 约15分钟\n🔴 长路 · 无障碍平路 · 约45分钟\n\n你的选择：',
            choices: [
              { id: 'st1', text: '选择短路（攀越高墙）', type: 'submission', alignment: 'virtue', intentLabel: 'CHALLENGE', response: '双手抓住岩石，身体向上——\n\n这是Rocinha居民每天的隐喻：\n向上攀爬，不是为了征服，而是为了生存。\n\n你通过了。', effect: { virtue: 22, sin: 0 }, next: 's_end' },
              { id: 'st2', text: '选择中路（坡道）', type: 'neutral', alignment: 'neutral', intentLabel: 'BALANCE', response: '稳健的选择。\n坡道上，你看见了墙壁上的涂鸦——\n那是其他旅者留下的话语。\n\n"我来过这里，我继续前行。"', effect: { virtue: 12, sin: 3 }, next: 's_end' },
              { id: 'st3', text: '选择长路（无障碍）', type: 'curiosity', alignment: 'sin', intentLabel: 'AVOIDANCE', response: '你到达了终点，但花了太多时间。\n\n在等待的过程中，你错过了两次可以帮助他人的机会。\n\n懒惰的代价，不只属于自己。', effect: { sin: 15, virtue: 5 }, next: 's_end' }
            ]
          },
          s_end: { npcText: '……不错，你走完了迷宫。\n\n（我其实也走过这条路……很久很久以前。）\n\n第四章——傲慢之殿——在更高处。', choices: [{ id: 'se1', text: '前往第四章：傲慢', type: 'neutral', alignment: 'neutral', intentLabel: 'PROCEED', response: '向上，继续向上。', effect: { virtue: 3 }, action: 'nextChapter' }] }
        }
      }
    },

    {
      id: 'pride',
      index: 4,
      sinName: 'PRIDE',
      sinNameCN: '傲慢',
      virtueCounterpart: 'HUMILITY',
      virtueCN: '谦逊',
      color: '#c4a8e0',
      emoji: '👑',
      architectureRef: 'Central octagonal hall · Panopticon-like observation',
      spaceMechanism: '暴露 · 全景监视',
      spaceHeight: 'Level 4 — Elevated central node',
      pathDifficulty: '所有人互相可见，无遮蔽',
      unlockCondition: 'sloth_completed',
      description: '傲慢者进入全景式讲堂，收集他人声音，辩驳、炫耀、博取他人的声誉。受影响到，数以傲慢的对抗到自然会议，体验被他人学习与自我观察的开始。',
      descriptionEN: 'In the Panopticon hall, every position is visible to all. Pride shrinks under mutual observation. The architecture itself enforces humility.',
      npc: {
        name: 'Lucifer',
        nameCN: '路西法',
        role: 'The Fallen Pride',
        roleCN: '坠落的傲慢',
        emoji: '⚡',
        personality: '曾经最辉煌，如今最深知傲慢之代价',
        sinAffinity: 0.95
      },
      trial: {
        name: '全景告解试炼',
        nameEN: 'The Panopticon Confession',
        rule: '你站在中央，所有人都看着你。你必须当众承认一件让你感到羞耻的事。',
        mechanism: '完全暴露 + 主动示弱',
        objective: '在被注视的恐惧中，选择谦逊而非防御',
        spatialCue: '八角形大厅，中心透明，每个方向都有旁观者',
        mechanics: ['暴露', '监督', '共享'],
        reward: { virtue: 25, sin: 5 }
      },
      dialogueTrees: {
        opening: {
          npcText: '我曾是最美丽的光。\n\n我是路西法——不是你们文化中那个满嘴谎言的形象，\n而是那个因为无法接受比自己更伟大的存在\n而陨落的存在。\n\n傲慢是这样的：\n它不告诉你它是傲慢，\n它告诉你，你只是在维护你的尊严。\n\n你有没有这样想过？',
          choices: [
            { id: 'p1', text: '我的确曾以为自己高人一等。', type: 'submission', alignment: 'virtue', intentLabel: 'ADMISSION', response: '这是勇气，不是软弱。\n\n进入八角大厅——\n那里，所有人都能看见彼此，\n没有人可以躲藏在优越感的阴影里。', effect: { virtue: 15 }, next: 'pride_trial' },
            { id: 'p2', text: '傲慢与自信的边界在哪里？', type: 'question', alignment: 'neutral', intentLabel: 'INQUIRY', response: '这是最重要的问题。\n\n自信说："我能做到。"\n傲慢说："只有我能做到。"\n\n自信是能量的积累，\n傲慢是对他人价值的否定。\n\n你现在更接近哪一端？', effect: { virtue: 10 }, next: 'pride_branch_b' },
            { id: 'p3', text: '我认为谦逊有时是虚假的表演。', type: 'curiosity', alignment: 'sin', intentLabel: 'CHALLENGE', response: '你说得对——表演性谦逊是另一种傲慢。\n\n真正的谦逊是：\n在全然被看见时，仍然选择倾听他人。\n\n八角大厅，正是这样一个空间。进来吧。', effect: { sin: 5, virtue: 8 }, next: 'pride_trial' }
          ]
        },
        branches: {
          pride_branch_b: { npcText: '既然你已在思考，就带着这个问题进入大厅。答案会在被他人注视时自然显现。', choices: [{ id: 'pb1', text: '进入八角大厅', type: 'neutral', alignment: 'neutral', intentLabel: 'ENTER', response: '思考是开始。进入是行动。', effect: { virtue: 8 }, next: 'pride_trial' }] },
          pride_trial: {
            npcText: '👑 全景告解试炼\n\n你站在八角大厅的中央。\n四周是透明墙面，其他旅者在观看。\n\n现在，你需要当众完成一件事：',
            choices: [
              { id: 'pt1', text: '（公开承认）"我曾经为了显示自己的优越，伤害了一个我本可以帮助的人。"', type: 'submission', alignment: 'virtue', intentLabel: 'PUBLIC_CONFESSION', response: '大厅陷入沉默。\n\n随后，轻轻的掌声——\n不是嘲讽，而是共鸣。\n\n每个观看者，都在你的话语中\n看见了自己的倒影。\n\n光从顶部倾泻下来。你通过了。', effect: { virtue: 30 }, next: 'p_end' },
              { id: 'pt2', text: '（展示技艺）我选择展示我最擅长的能力，让他们见识我的价值。', type: 'curiosity', alignment: 'sin', intentLabel: 'SHOWCASE', response: '精彩的表演。掌声热烈。\n\n但路西法在你耳边低语：\n"他们看见了你的技艺，\n没有人看见了你。"\n\n大厅为你开启，但未完全解锁。', effect: { sin: 10, virtue: 8 }, next: 'p_end' },
              { id: 'pt3', text: '（沉默）我无法在他人面前示弱，这违背我的本性。', type: 'resistance', alignment: 'sin', intentLabel: 'RESISTANCE', response: '沉默也是一种回答。\n\n大厅感受到了你的抗拒，\n为你留了一扇侧门——\n更难走，但仍然可以通过。\n\n傲慢的墙，只能从内部打破。', effect: { sin: 18 }, next: 'p_end' }
            ]
          },
          p_end: { npcText: '第四章已成为你旅程的一部分。\n\n贪婪之所，在对角线的另一端——\n你能找到通往它的路吗？', choices: [{ id: 'pe1', text: '前往第五章：贪婪', type: 'neutral', alignment: 'neutral', intentLabel: 'PROCEED', response: '旅程继续。', effect: { virtue: 5 }, action: 'nextChapter' }] }
        }
      }
    },

    {
      id: 'greed',
      index: 5,
      sinName: 'GREED',
      sinNameCN: '贪婪',
      virtueCounterpart: 'CHARITY',
      virtueCN: '慷慨',
      color: '#a8c48a',
      emoji: '⚖️',
      architectureRef: 'Trading hall · Multi-level vertical exchange space',
      spaceMechanism: '交换 · 层级权力',
      spaceHeight: 'Level 3-5 · Vertical power gradient',
      pathDifficulty: '垂直高差决定议价权',
      unlockCondition: 'pride_completed',
      description: '贪婪的人奢望金钱会给足，这是一个收藏财富的双向次交换集市，垂直向上，越朝顶部，如果你越多，你得到，你越多，越高，要求更高。',
      descriptionEN: 'The Greed hall is a vertical exchange space. The higher you are, the more you command — but also the more you owe. Architecture expresses the power dynamics of wealth.',
      npc: {
        name: 'Midas',
        nameCN: '迈达斯',
        role: 'The Golden Trader',
        roleCN: '黄金交易者',
        emoji: '💰',
        personality: '精明、渴望、知道一切东西的价格，却不知任何东西的价值',
        sinAffinity: 0.85
      },
      trial: {
        name: '垂直交换试炼',
        nameEN: 'The Vertical Exchange',
        rule: '你在最底层，持有10枚金币。每上一层，可以进行一次交换。规则是：你必须给出比你得到的更多。',
        mechanism: '强制慷慨 + 垂直移动',
        objective: '在不断给予中，发现真正的获得',
        spatialCue: '垂直交易塔，越高视野越广，越低越封闭',
        mechanics: ['交换', '路径高差', '共享'],
        reward: { virtue: 20, sin: 8 }
      },
      dialogueTrees: {
        opening: {
          npcText: '欢迎来到交换之塔，旅者。\n\n我是迈达斯——那个点什么都变成黄金的人。\n\n（苦笑）直到我的女儿也变成了金子。\n\n贪婪的故事，从来都以同一种方式结束：\n你最终得到了你想要的一切，\n却失去了真正重要的东西。\n\n那么，你想要什么？',
          choices: [
            { id: 'gr1', text: '我想要足够安全的物质保障。', type: 'neutral', alignment: 'neutral', intentLabel: 'SECURITY', response: '"足够"——这个词，贪婪从不承认。\n\n在Rocinha的街道上，"足够"是每天睁眼第一个问题。\n\n告诉我：你的"足够"，比他们多多少？', effect: { virtue: 8, sin: 5 }, next: 'greed_branch_a' },
            { id: 'gr2', text: '我什么都不需要，我只想让他人获益。', type: 'submission', alignment: 'virtue', intentLabel: 'SELFLESSNESS', response: '（扬了扬眉毛）\n\n这是我听过最接近慷慨的答案。\n\n但慷慨不是放弃，是选择如何给予。\n\n交换之塔，为慷慨者提供最快的上升路径。', effect: { virtue: 20 }, next: 'greed_trial' },
            { id: 'gr3', text: '我认为追求财富本身没有错。', type: 'curiosity', alignment: 'sin', intentLabel: 'DEFENSE', response: '正确——追求本身无罪。\n\n但当追求压过了对他人的感知，\n贪婪就悄然替换了雄心。\n\n进入交换塔，你将在结构中感受这个边界。', effect: { sin: 8, virtue: 3 }, next: 'greed_trial' }
          ]
        },
        branches: {
          greed_branch_a: { npcText: '思考"足够"是最重要的一步。带着这个问题进入交换塔。', choices: [{ id: 'gra1', text: '进入交换试炼', type: 'neutral', alignment: 'neutral', intentLabel: 'ENTER', response: '交换塔开启。', effect: { virtue: 5 }, next: 'greed_trial' }] },
          greed_trial: {
            npcText: '⚖️ 垂直交换试炼\n\n你有10枚金币，站在底层。\n\n第一层交换：你可以用5枚金币换取一个"机会"，\n或者给出7枚金币，换取一个"连接"（认识一位顶层的人）。\n\n你的选择：',
            choices: [
              { id: 'grt1', text: '给出7枚，换取"连接"（慷慨交换）', type: 'submission', alignment: 'virtue', intentLabel: 'GENEROUS_EXCHANGE', response: '你给出了更多，却上升得更快。\n\n顶层的人记住了你——不是因为你的金币，\n而是因为你的慷慨。\n\n这才是真正的"资产"。', effect: { virtue: 25 }, next: 'gr_end' },
              { id: 'grt2', text: '给出5枚，换取"机会"（等量交换）', type: 'neutral', alignment: 'neutral', intentLabel: 'FAIR_EXCHANGE', response: '公平的交换。你上升了一层。\n\n但你注意到，用7枚换连接的旅者\n已经到达了更高处，视野更开阔。', effect: { virtue: 12, sin: 5 }, next: 'gr_end' },
              { id: 'grt3', text: '拒绝交换，保留全部10枚金币', type: 'resistance', alignment: 'sin', intentLabel: 'HOARDING', response: '你保住了所有金币，却无法上升。\n\n在贪婪的塔里，停滞就是下降。\n\n迈达斯在你身后轻声说：\n"我的女儿，永远保存在我的记忆中——\n但我永远无法触碰她了。"', effect: { sin: 20 }, next: 'gr_end' }
            ]
          },
          gr_end: { npcText: '交换之塔，已将你的选择记入账本。\n\n愤怒之空间，在建筑的中心横向延伸——\n所有路径都将通过那里。', choices: [{ id: 'gre1', text: '前往第六章：愤怒', type: 'neutral', alignment: 'neutral', intentLabel: 'PROCEED', response: '钢铁与火焰之间的路径，已为你开启。', effect: { virtue: 3 }, action: 'nextChapter' }] }
        }
      }
    },

    {
      id: 'wrath',
      index: 6,
      sinName: 'WRATH',
      sinNameCN: '愤怒',
      virtueCounterpart: 'PATIENCE',
      virtueCN: '忍耐',
      color: '#e87060',
      emoji: '🔥',
      architectureRef: 'Central maze court · Chaotic path intersections',
      spaceMechanism: '冲突 · 摩擦 · 速度惩罚',
      spaceHeight: 'Level 2 — Horizontal spread',
      pathDifficulty: '路径交叉，强制接触他人，冲突机率高',
      unlockCondition: 'greed_completed',
      description: '愤怒的人奢望进行控制花费时间，也像一进一步被捆绑迷宫花样，愤怒是快速反应情绪缓慢，引导与敌人来达到情绪上的共同认知。',
      descriptionEN: 'The Wrath space forces unavoidable encounters. The faster you move, the more collisions you cause. Patience is the only way through.',
      npc: {
        name: 'Ares',
        nameCN: '阿瑞斯',
        role: 'Warden of Wrath',
        roleCN: '愤怒的看守',
        emoji: '⚔️',
        personality: '愤怒是他的语言，但他深知愤怒从何处生长',
        sinAffinity: 0.9
      },
      trial: {
        name: '冲突迷宫试炼',
        nameEN: 'The Collision Maze',
        rule: '迷宫路径交叉，你会不断遇到其他旅者。每次冲突，你可以选择：让步、对抗、或沉默通过。',
        mechanism: '强制接触 + 情绪管理',
        objective: '在连续摩擦中，保持意图的清醒',
        spatialCue: '红色钢铁结构，地面微微振动（模拟愤怒共鸣），交叉路口有镜面',
        mechanics: ['冲突', '速度惩罚', '监督'],
        reward: { virtue: 22, sin: 10 }
      },
      dialogueTrees: {
        opening: {
          npcText: '（声音低沉如雷）\n\n旅者。\n\n我是阿瑞斯，我不喜欢废话。\n\n愤怒是被压迫的人的语言——\n在Rocinha，每一条窄巷里都有它的回响。\n\n你上一次真正愤怒，是为了什么？',
          choices: [
            { id: 'w1', text: '为了不公正。有人受苦，而我无能为力。', type: 'submission', alignment: 'virtue', intentLabel: 'RIGHTEOUS_ANGER', response: '义愤。\n\n这是愤怒中最干净的形式——\n当痛苦转化为行动，而非破坏。\n\n进入冲突迷宫，带着这份义愤，\n看看它能否在压力下保持纯粹。', effect: { virtue: 15 }, next: 'wrath_trial' },
            { id: 'w2', text: '为了被无视，被贬低，不被看见。', type: 'neutral', alignment: 'neutral', intentLabel: 'WOUNDED_PRIDE', response: '这是愤怒最古老的根源——\n渴望被承认。\n\n在Rocinha，这是每一个人的故事。\n\n带着这份理解进入迷宫。\n你将遇见与你有同样渴望的灵魂。', effect: { virtue: 10, sin: 5 }, next: 'wrath_trial' },
            { id: 'w3', text: '我尽量不愤怒，我压制它。', type: 'resistance', alignment: 'sin', intentLabel: 'SUPPRESSION', response: '（轻声，几乎像在叹气）\n\n压制的愤怒，是最危险的愤怒。\n\n冲突迷宫，专为你这样的人设计。\n\n你不能压制在这里——迷宫会强迫它浮现。\n\n准备好了吗？', effect: { sin: 10, virtue: 5 }, next: 'wrath_trial' }
          ]
        },
        branches: {
          wrath_trial: {
            npcText: '🔥 冲突迷宫试炼\n\n你在十字路口，正面遇见另一个旅者。\n他的路径和你完全重叠——\n你们无法同时通过这个节点。\n\n他看起来疲惫而烦躁，眼神中有防御。\n\n你的回应：',
            choices: [
              { id: 'wt1', text: '（退后一步，示意他先过）"你先走。"', type: 'submission', alignment: 'virtue', intentLabel: 'PATIENCE', response: '你退后了。\n\n他愣了一瞬——然后缓和了。\n"谢谢。"\n\n迷宫路径因为这个交换，\n在你们两人面前都变宽了一倍。', effect: { virtue: 25 }, next: 'w_end' },
              { id: 'wt2', text: '（对视）"我们找找有没有其他路。"', type: 'neutral', alignment: 'virtue', intentLabel: 'COLLABORATION', response: '你们一起在附近找到了一条隐藏路径。\n\n带着共同找到的路，\n两个人都前进得比单独行动更快。', effect: { virtue: 20, sin: 0 }, next: 'w_end' },
              { id: 'wt3', text: '（推开他）"让开，我不想耽搁。"', type: 'curiosity', alignment: 'sin', intentLabel: 'AGGRESSION', response: '他没有阻抗，但迷宫记录了你的选择。\n\n前方的路开始收窄——\n每一个暴力的选择，都在缩减你的空间。', effect: { sin: 20, virtue: 0 }, next: 'w_end' }
            ]
          },
          w_end: { npcText: '愤怒，你已穿越。\n\n最高处——嫉妒之塔——就在建筑的顶端。\n\n那是最后一扇门。', choices: [{ id: 'we1', text: '前往第七章：嫉妒', type: 'neutral', alignment: 'neutral', intentLabel: 'PROCEED', response: '顶层，等待着你。', effect: { virtue: 5 }, action: 'nextChapter' }] }
        }
      }
    },

    {
      id: 'envy',
      index: 7,
      sinName: 'ENVY',
      sinNameCN: '嫉妒',
      virtueCounterpart: 'KINDNESS',
      virtueCN: '善意',
      color: '#7cc4b8',
      emoji: '🜃',
      architectureRef: 'Top tower · Comparative display gallery, maximum height',
      spaceMechanism: '比较 · 最高可达性 · 最大暴露',
      spaceHeight: 'Level MAX — Peak',
      pathDifficulty: '最难达到，需完成前六章',
      unlockCondition: 'wrath_completed',
      description: '嫉妒者从比较自身价值的全，在与与他人共居的理解社会价值位置，不断寻找差别与自身寻找"平等"自身价值点。认为，通过合适"分析"自身与他人的差距，理解被嫉妒与嫉妒他人，了解其中原因。',
      descriptionEN: 'Envy is the last and highest sin. The tower forces comparison — but through understanding why you compare, you transcend it. Kindness is the final act of purification.',
      npc: {
        name: 'Cain',
        nameCN: '该隐',
        role: 'The First Envious',
        roleCN: '第一个嫉妒者',
        emoji: '🌿',
        personality: '人类历史上第一个嫉妒者，携带着最古老的伤口',
        sinAffinity: 0.95
      },
      trial: {
        name: '比较之塔终极试炼',
        nameEN: 'The Tower of Comparison',
        rule: '你站在塔顶，能看见所有人走过的路径。你必须回答：如果你可以拥有另一个人的人生，你会选择谁？然后，说出为什么你不会真的交换。',
        mechanism: '最大化比较 + 主动放弃比较',
        objective: '理解嫉妒的根源，选择以善意转化嫉妒',
        spatialCue: '全景塔顶，360度视野，整个建筑尽收眼底',
        mechanics: ['比较', '最大暴露', '路径俯瞰'],
        reward: { virtue: 35, sin: 0 }
      },
      dialogueTrees: {
        opening: {
          npcText: '……终于，你到了这里。\n\n我是该隐。我杀了我的兄弟，因为上帝看见了他，\n却似乎没有看见我。\n\n嫉妒的本质，不是渴望拥有他人之物——\n而是渴望被平等地看见。\n\n（沉默）\n\n你经历了六层试炼，来到了这里。\n在你俯瞰的所有旅者中，\n有没有人，让你感到——不公平？',
          choices: [
            { id: 'e1', text: '有。有些人轻而易举得到我拼命争取的东西。', type: 'submission', alignment: 'neutral', intentLabel: 'HONEST_ENVY', response: '谢谢你的诚实。\n\n这种感受，你并不孤独——\n这是人类最普遍、最被压抑的情绪。\n\n那个"轻而易举"的人——\n你知道他们付出了什么吗？\n你知道他们失去了什么吗？', effect: { virtue: 15, sin: 5 }, next: 'envy_branch_a' },
            { id: 'e2', text: '我不嫉妒任何人，我只想成为更好的自己。', type: 'resistance', alignment: 'virtue', intentLabel: 'GROWTH_FOCUS', response: '（久久地看着你）\n\n这是最接近从嫉妒中解脱的答案——\n\n但我想问：\n是否有过某个瞬间，\n"成为更好的自己"的动力，\n来自于不想输给某个人？', effect: { virtue: 12 }, next: 'envy_branch_b' },
            { id: 'e3', text: '在Rocinha，嫉妒是生存的燃料。', type: 'question', alignment: 'sin', intentLabel: 'CONTEXT', response: '是的。\n\n在极端贫困中，嫉妒是唯一的镜子——\n它让人看见：有人过得比这更好，\n所以这种生活可以改变。\n\n但当嫉妒转化为对他人的破坏，\n它就从工具变成了监狱。\n\n你能看见这条边界吗？', effect: { virtue: 18, sin: 8 }, next: 'envy_branch_c' }
          ]
        },
        branches: {
          envy_branch_a: { npcText: '每个人的人生都是你看不见的冰山。善意，是能穿透水面看见冰山全貌的光。', choices: [{ id: 'ea1', text: '我准备好了最后的试炼', type: 'neutral', alignment: 'virtue', intentLabel: 'READINESS', response: '比较之塔，为你开启最终门。', effect: { virtue: 10 }, next: 'envy_trial' }] },
          envy_branch_b: { npcText: '承认这一刻的诚实——它是通向善意的入口。', choices: [{ id: 'eb1', text: '我承认。带我进入最后试炼。', type: 'submission', alignment: 'virtue', intentLabel: 'ADMISSION', response: '这份勇气，足以打开最后的门。', effect: { virtue: 15 }, next: 'envy_trial' }] },
          envy_branch_c: { npcText: '你见过Rocinha，你理解了语境。带着这份理解进入终极试炼。', choices: [{ id: 'ec1', text: '进入比较之塔', type: 'neutral', alignment: 'neutral', intentLabel: 'ENTER', response: '最高处，等待你的回答。', effect: { virtue: 12 }, next: 'envy_trial' }] },
          envy_trial: {
            npcText: '🜃 比较之塔终极试炼\n\n你俯瞰整个建筑，整个Rocinha。\n\n如果可以，你会选择拥有哪一种人生？\n\n然后——说出你为什么最终不会交换。',
            choices: [
              { id: 'et1', text: '"我会选择那个被爱包围的人的人生。"\n但最终不会交换——因为我的挣扎，塑造了只属于我的东西。', type: 'submission', alignment: 'virtue', intentLabel: 'SELF_VALUE', response: '（该隐沉默了很久）\n\n你找到了嫉妒的解药——\n不是否认渴望，\n而是认识到：你的独特性，\n恰恰包含你的痛苦与挣扎。\n\n整座建筑开始发光。\n\n你穿越了全部七章。', effect: { virtue: 40 }, next: 'final_end' },
              { id: 'et2', text: '"我会选择那个从不需要为生存挣扎的人的人生。"\n但最终不会交换——因为我不知道那代价是什么。', type: 'neutral', alignment: 'virtue', intentLabel: 'WISDOM', response: '智慧之选。\n\n不知道代价，就不能真正渴望。\n\n嫉妒的消解，往往来自这一刻的认知。\n\n你通过了最后的试炼。', effect: { virtue: 30 }, next: 'final_end' },
              { id: 'et3', text: '（沉默。我想不出理由不交换。）', type: 'resistance', alignment: 'sin', intentLabel: 'TRAPPED', response: '（该隐走近，轻声说）\n\n我曾经也是这样。\n\n那就带着这份困惑继续——\n它会在某一天，成为你理解他人的钥匙。\n\n通过是因为你的诚实，而非你的答案。', effect: { virtue: 20, sin: 10 }, next: 'final_end' }
            ]
          },
          final_end: {
            npcText: '✝ 旅者——\n\n你穿越了七章试炼。\n\n从色欲到嫉妒，从地基到塔顶，\n从里约贫民窟的尘埃，到神曲的最后一层。\n\n你的灵魂，已经被这座建筑见证。\n\n净化，不是抹去欲望——\n而是理解欲望，并选择超越它。\n\nWalking with God。\n\n你已经在路上了。', choices: [
              { id: 'fe1', text: '重新开始旅程', type: 'neutral', alignment: 'neutral', intentLabel: 'RESTART', response: '每一次旅程，你都会看见不同的东西。', effect: { virtue: 5 }, action: 'restart' },
              { id: 'fe2', text: '查看我的灵魂积分与天赋树', type: 'neutral', alignment: 'neutral', intentLabel: 'REVIEW', response: '你的选择，已经刻入天赋树。', effect: {}, action: 'showTalentSummary' }
            ]
          }
        }
      }
    }
  ],

  // ─────────────────────────────────────────────
  // TALENT TREE — 天赋树节点定义
  // 结构: 7根(对应7宗罪) × 3层深度(罪→中间→美德)
  // ─────────────────────────────────────────────
  talentTree: {
    nodes: [
      // ROOT (center)
      { id: 'root', label: '灵魂', labelEN: 'Soul', x: 120, y: 290, tier: 0, sin: null, type: 'root', color: '#c9a84c', requires: [] },

      // SIN NODES (tier 1) — 7 deadly sins
      { id: 'lust_sin', label: '色欲', labelEN: 'Lust', x: 40, y: 200, tier: 1, sin: 'lust', type: 'sin', color: '#e8a4c8', requires: ['root'] },
      { id: 'gluttony_sin', label: '暴食', labelEN: 'Gluttony', x: 120, y: 160, tier: 1, sin: 'gluttony', type: 'sin', color: '#f4c96e', requires: ['root'] },
      { id: 'sloth_sin', label: '懒惰', labelEN: 'Sloth', x: 200, y: 200, tier: 1, sin: 'sloth', type: 'sin', color: '#8fb8d4', requires: ['root'] },
      { id: 'pride_sin', label: '傲慢', labelEN: 'Pride', x: 210, y: 290, tier: 1, sin: 'pride', type: 'sin', color: '#c4a8e0', requires: ['root'] },
      { id: 'greed_sin', label: '贪婪', labelEN: 'Greed', x: 200, y: 380, tier: 1, sin: 'greed', type: 'sin', color: '#a8c48a', requires: ['root'] },
      { id: 'wrath_sin', label: '愤怒', labelEN: 'Wrath', x: 120, y: 420, tier: 1, sin: 'wrath', type: 'sin', color: '#e87060', requires: ['root'] },
      { id: 'envy_sin', label: '嫉妒', labelEN: 'Envy', x: 40, y: 380, tier: 1, sin: 'envy', type: 'sin', color: '#7cc4b8', requires: ['root'] },

      // UNDERSTANDING NODES (tier 2) — intermediate transformation
      { id: 'lust_mid', label: '认知', labelEN: 'Awareness', x: 20, y: 130, tier: 2, sin: 'lust', type: 'mid', color: '#e8c4d8', requires: ['lust_sin'] },
      { id: 'gluttony_mid', label: '分享', labelEN: 'Share', x: 80, y: 90, tier: 2, sin: 'gluttony', type: 'mid', color: '#f8dfa0', requires: ['gluttony_sin'] },
      { id: 'sloth_mid', label: '行动', labelEN: 'Action', x: 190, y: 110, tier: 2, sin: 'sloth', type: 'mid', color: '#b8d8e8', requires: ['sloth_sin'] },
      { id: 'pride_mid', label: '聆听', labelEN: 'Listen', x: 240, y: 250, tier: 2, sin: 'pride', type: 'mid', color: '#d8c8f0', requires: ['pride_sin'] },
      { id: 'greed_mid', label: '给予', labelEN: 'Give', x: 240, y: 380, tier: 2, sin: 'greed', type: 'mid', color: '#c8ddb8', requires: ['greed_sin'] },
      { id: 'wrath_mid', label: '理解', labelEN: 'Understand', x: 160, y: 490, tier: 2, sin: 'wrath', type: 'mid', color: '#f4b0a0', requires: ['wrath_sin'] },
      { id: 'envy_mid', label: '欣赏', labelEN: 'Appreciate', x: 20, y: 460, tier: 2, sin: 'envy', type: 'mid', color: '#b0dcd6', requires: ['envy_sin'] },

      // VIRTUE NODES (tier 3) — 7 virtues
      { id: 'chastity', label: '贞洁', labelEN: 'Chastity', x: 10, y: 65, tier: 3, sin: 'lust', type: 'virtue', color: '#f0d0e8', requires: ['lust_mid'] },
      { id: 'temperance', label: '节制', labelEN: 'Temperance', x: 60, y: 30, tier: 3, sin: 'gluttony', type: 'virtue', color: '#fce8b0', requires: ['gluttony_mid'] },
      { id: 'diligence', label: '勤勉', labelEN: 'Diligence', x: 175, y: 40, tier: 3, sin: 'sloth', type: 'virtue', color: '#c8e4f0', requires: ['sloth_mid'] },
      { id: 'humility', label: '谦逊', labelEN: 'Humility', x: 230, y: 190, tier: 3, sin: 'pride', type: 'virtue', color: '#e8dcf8', requires: ['pride_mid'] },
      { id: 'charity', label: '慷慨', labelEN: 'Charity', x: 230, y: 430, tier: 3, sin: 'greed', type: 'virtue', color: '#d8edc8', requires: ['greed_mid'] },
      { id: 'patience', label: '忍耐', labelEN: 'Patience', x: 150, y: 545, tier: 3, sin: 'wrath', type: 'virtue', color: '#f8c8b8', requires: ['wrath_mid'] },
      { id: 'kindness', label: '善意', labelEN: 'Kindness', x: 10, y: 520, tier: 3, sin: 'envy', type: 'virtue', color: '#c8f0e8', requires: ['envy_mid'] },

      // FINAL NODE — Purification
      { id: 'purification', label: '净化', labelEN: 'Purification', x: 120, y: 290, tier: 4, sin: null, type: 'final', color: '#ffffff', requires: ['chastity','temperance','diligence','humility','charity','patience','kindness'] }
    ],
    connections: [
      // root to sins
      ['root','lust_sin'],['root','gluttony_sin'],['root','sloth_sin'],['root','pride_sin'],
      ['root','greed_sin'],['root','wrath_sin'],['root','envy_sin'],
      // sins to mids
      ['lust_sin','lust_mid'],['gluttony_sin','gluttony_mid'],['sloth_sin','sloth_mid'],
      ['pride_sin','pride_mid'],['greed_sin','greed_mid'],['wrath_sin','wrath_mid'],['envy_sin','envy_mid'],
      // mids to virtues
      ['lust_mid','chastity'],['gluttony_mid','temperance'],['sloth_mid','diligence'],
      ['pride_mid','humility'],['greed_mid','charity'],['wrath_mid','patience'],['envy_mid','kindness']
    ]
  },

  // Intent recognition patterns
  intentPatterns: {
    DENIAL: ['不需要', '无所谓', '不感兴趣', '不想', '拒绝', '不认为'],
    CONFESSION: ['承认', '我承认', '确实', '是的', '你说得对', '我知道'],
    INQUIRY: ['为什么', '如何', '是什么', '怎么', '背景', '历史', '解释'],
    CURIOSITY: ['有趣', '想了解', '好奇', '告诉我', '想知道'],
    RESISTANCE: ['不对', '不同意', '这是错的', '我不这样认为', '反驳'],
    SUBMISSION: ['我明白', '我理解', '我会', '我愿意', '接受'],
    INDULGENCE: ['享受', '本质', '不应该', '欲望是', '没有错'],
    EMPATHY: ['他们', '人们', '贫民', '社会', '不公', '理解他人']
  }
};
