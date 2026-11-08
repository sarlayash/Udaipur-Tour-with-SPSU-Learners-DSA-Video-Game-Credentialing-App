// Interactive Visualizer Engine for DSA Algorithms in Udaipur Quest
// Supports 10 distinct algorithm visualizer animations with step-by-step playback

import { sound } from './audio.js';

export class VisualizerEngine {
  constructor(containerEl, statusEl, stepCommentEl) {
    this.container = containerEl;
    this.statusEl = statusEl;
    this.stepCommentEl = stepCommentEl;
    this.currentZone = null;
    this.steps = [];
    this.currentStepIdx = 0;
    this.isPlaying = false;
    this.timer = null;
    this.speedMs = 800;
  }

  setSpeed(ms) {
    this.speedMs = ms;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  loadZone(zone) {
    this.pause();
    this.currentZone = zone;
    this.currentStepIdx = 0;
    this.steps = this.generateSteps(zone);
    this.render();
  }

  generateSteps(zone) {
    switch (zone.visualizer.type) {
      case 'array':
        return this.generateArrayTwoPointerSteps();
      case 'linkedlist':
        return this.generateLinkedListSteps();
      case 'stack-queue':
        return this.generateStackSteps();
      case 'recursion-tree':
        return this.generateNQueensSteps();
      case 'sorting':
        return this.generateSortingSteps();
      case 'tree':
        return this.generateTreeSteps();
      case 'heap-hash':
        return this.generateHeapSteps();
      case 'graph':
        return this.generateGraphSteps();
      case 'dp':
        return this.generateKnapsackSteps();
      case 'synthesis':
        return this.generateLRUSteps();
      default:
        return [{ comment: 'Ready to visualize algorithm.' }];
    }
  }

  // --- Step Generators ---
  generateArrayTwoPointerSteps() {
    const arr = [12, 28, 35, 42, 59, 64, 78, 91];
    const target = 70; // 28 + 42 = 70
    const steps = [];
    let left = 0, right = arr.length - 1;

    steps.push({
      type: 'array',
      arr,
      left,
      right,
      target,
      sum: arr[left] + arr[right],
      matched: false,
      comment: `Initial State: Left = 0 (val: ${arr[left]}), Right = ${right} (val: ${arr[right]}). Target sum: ${target}.`
    });

    while (left < right) {
      const sum = arr[left] + arr[right];
      if (sum === target) {
        steps.push({
          type: 'array',
          arr,
          left,
          right,
          target,
          sum,
          matched: true,
          comment: `🎯 MATCH FOUND! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${target}!`
        });
        break;
      } else if (sum < target) {
        steps.push({
          type: 'array',
          arr,
          left,
          right,
          target,
          sum,
          matched: false,
          comment: `Sum ${sum} < ${target}. To increase sum, increment Left pointer: left = ${left + 1}.`
        });
        left++;
      } else {
        steps.push({
          type: 'array',
          arr,
          left,
          right,
          target,
          sum,
          matched: false,
          comment: `Sum ${sum} > ${target}. To decrease sum, decrement Right pointer: right = ${right - 1}.`
        });
        right--;
      }
    }
    return steps;
  }

  generateLinkedListSteps() {
    const values = [10, 25, 40, 55, 70];
    const steps = [];

    steps.push({
      type: 'linkedlist',
      nodes: [...values],
      pointers: { prev: -1, curr: 0, nextTemp: 1 },
      reversedEdges: [],
      comment: 'Start list reversal: prev = NULL, curr = 10, nextTemp = 25.'
    });

    for (let i = 0; i < values.length; i++) {
      const nextTempIdx = i < values.length - 1 ? i + 1 : -1;
      steps.push({
        type: 'linkedlist',
        nodes: [...values],
        pointers: { prev: i - 1, curr: i, nextTemp: nextTempIdx },
        reversedEdges: Array.from({ length: i }, (_, k) => k),
        comment: `Store nextTemp = ${nextTempIdx !== -1 ? values[nextTempIdx] : 'NULL'}. Re-orient curr.next to point back to prev (${i > 0 ? values[i - 1] : 'NULL'}).`
      });

      steps.push({
        type: 'linkedlist',
        nodes: [...values],
        pointers: { prev: i, curr: nextTempIdx, nextTemp: nextTempIdx !== -1 && nextTempIdx < values.length - 1 ? nextTempIdx + 1 : -1 },
        reversedEdges: Array.from({ length: i + 1 }, (_, k) => k),
        comment: `Advance pointers: prev = ${values[i]}, curr = ${nextTempIdx !== -1 ? values[nextTempIdx] : 'NULL'}.`
      });
    }

    steps.push({
      type: 'linkedlist',
      nodes: [...values],
      pointers: { prev: values.length - 1, curr: -1, nextTemp: -1 },
      reversedEdges: Array.from({ length: values.length }, (_, k) => k),
      comment: 'Reversal complete! New head is 70. Whole list points in reverse order.'
    });

    return steps;
  }

  generateStackSteps() {
    const chars = ['{', '[', '(', ')', ']', '}'];
    const steps = [];
    const stack = [];

    steps.push({
      type: 'stack',
      stack: [],
      currentChar: '',
      remaining: [...chars],
      status: 'start',
      comment: 'Validating bracket symmetry of City Palace arches: "{[()]}".'
    });

    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (ch === '{' || ch === '[' || ch === '(') {
        stack.push(ch);
        steps.push({
          type: 'stack',
          stack: [...stack],
          currentChar: ch,
          remaining: chars.slice(i + 1),
          status: 'push',
          comment: `Encountered open bracket '${ch}' -> Push onto LIFO Stack. Top is '${ch}'.`
        });
      } else {
        const popped = stack.pop();
        steps.push({
          type: 'stack',
          stack: [...stack],
          currentChar: ch,
          remaining: chars.slice(i + 1),
          status: 'pop',
          comment: `Encountered '${ch}' -> Popped top '${popped}'. Matches expected pair! Stack size is now ${stack.length}.`
        });
      }
    }

    steps.push({
      type: 'stack',
      stack: [],
      currentChar: 'DONE',
      remaining: [],
      status: 'valid',
      comment: '✅ Stack is completely empty! All brackets matched symmetrically with perfect LIFO balance.'
    });

    return steps;
  }

  generateNQueensSteps() {
    // 4-Queens visual step progression
    return [
      {
        type: 'nqueens',
        board: [
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        comment: 'Saheliyon-ki-Bari 4-Queens: Place 4 non-attacking Queens on the 4x4 royal garden grid.'
      },
      {
        type: 'nqueens',
        board: [
          ['Q', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        comment: 'Row 0: Place Queen at (0, 0).'
      },
      {
        type: 'nqueens',
        board: [
          ['Q', '.', '.', '.'],
          ['.', '.', 'Q', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        comment: 'Row 1: Columns 0 & 1 are attacked. Place Queen at (1, 2).'
      },
      {
        type: 'nqueens',
        board: [
          ['Q', '.', '.', '.'],
          ['.', '.', 'Q', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        conflict: true,
        comment: 'Row 2: All 4 columns (0, 1, 2, 3) are under attack! Dead end reached. Initiating Backtrack.'
      },
      {
        type: 'nqueens',
        board: [
          ['.', 'Q', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        comment: 'Backtracked to Row 0: Try next candidate column (0, 1).'
      },
      {
        type: 'nqueens',
        board: [
          ['.', 'Q', '.', '.'],
          ['.', '.', '.', 'Q'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        comment: 'Row 1: Place Queen at safe square (1, 3).'
      },
      {
        type: 'nqueens',
        board: [
          ['.', 'Q', '.', '.'],
          ['.', '.', '.', 'Q'],
          ['Q', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        comment: 'Row 2: Place Queen at safe square (2, 0).'
      },
      {
        type: 'nqueens',
        board: [
          ['.', 'Q', '.', '.'],
          ['.', '.', '.', 'Q'],
          ['Q', '.', '.', '.'],
          ['.', '.', 'Q', '.']
        ],
        solved: true,
        comment: '👑 SOLUTION FOUND! Row 3: Queen placed at (3, 2). All 4 Queens positioned safely without conflicts!'
      }
    ];
  }

  generateSortingSteps() {
    // Merge Sort divide & conquer demo
    return [
      {
        type: 'sorting',
        bars: [68, 23, 89, 14, 52, 37, 75, 41],
        active: [],
        comment: 'Jag Mandir Divide & Conquer: Initial unsorted array of royal artifact IDs.'
      },
      {
        type: 'sorting',
        bars: [68, 23, 89, 14, 52, 37, 75, 41],
        split: [0, 3, 4, 7],
        comment: 'Divide Phase: Split into Left half [68, 23, 89, 14] and Right half [52, 37, 75, 41].'
      },
      {
        type: 'sorting',
        bars: [23, 68, 14, 89, 37, 52, 41, 75],
        active: [0, 1, 2, 3],
        comment: 'Recursive Base Sorts: Sorted sub-pairs [23, 68] & [14, 89] on left, [37, 52] & [41, 75] on right.'
      },
      {
        type: 'sorting',
        bars: [14, 23, 68, 89, 37, 41, 52, 75],
        active: [0, 1, 2, 3],
        comment: 'Merge Left: Merged into sorted left quadrant [14, 23, 68, 89].'
      },
      {
        type: 'sorting',
        bars: [14, 23, 68, 89, 37, 41, 52, 75],
        active: [4, 5, 6, 7],
        comment: 'Merge Right: Merged into sorted right quadrant [37, 41, 52, 75].'
      },
      {
        type: 'sorting',
        bars: [14, 23, 37, 41, 52, 68, 75, 89],
        sorted: true,
        comment: '✨ Final 2-Pointer Merge Complete! Array is sorted in guaranteed O(n log n) time.'
      }
    ];
  }

  generateTreeSteps() {
    return [
      {
        type: 'tree',
        highlight: 50,
        visited: [50],
        comment: 'Sajjangarh BST Traversal: Visiting Root node (50).'
      },
      {
        type: 'tree',
        highlight: 30,
        visited: [50, 30],
        comment: 'Traversing Left Subtree: Visiting node (30). In BST, 30 < 50.'
      },
      {
        type: 'tree',
        highlight: 20,
        visited: [50, 30, 20],
        comment: 'Visiting Leftmost Leaf (20): Inorder output starts with 20.'
      },
      {
        type: 'tree',
        highlight: 40,
        visited: [50, 30, 20, 40],
        comment: 'Visiting Right child of 30: Node (40).'
      },
      {
        type: 'tree',
        highlight: 70,
        visited: [50, 30, 20, 40, 70],
        comment: 'Traversing Right Subtree: Node (70). In BST, 70 > 50.'
      },
      {
        type: 'tree',
        highlight: 60,
        visited: [50, 30, 20, 40, 70, 60],
        comment: 'Visiting Left child of 70: Node (60).'
      },
      {
        type: 'tree',
        highlight: 80,
        visited: [50, 30, 20, 40, 70, 60, 80],
        sortedList: [20, 30, 40, 50, 60, 70, 80],
        comment: '🌲 Inorder Traversal Complete! Result: [20, 30, 40, 50, 60, 70, 80] (Perfect ascending order).'
      }
    ];
  }

  generateHeapSteps() {
    return [
      {
        type: 'heap',
        heap: [12, 24, 30, 45, 60, 55, 80],
        comment: 'Bagore Ki Haveli Min-Heap: Root holds minimum element (12). Parent index i -> Left: 2i+1, Right: 2i+2.'
      },
      {
        type: 'heap',
        heap: [80, 24, 30, 45, 60, 55],
        action: 'extract-min',
        comment: 'Extract-Min: Popped 12. Replaced root with last element (80). Heap property temporarily violated.'
      },
      {
        type: 'heap',
        heap: [24, 80, 30, 45, 60, 55],
        action: 'sift-down',
        comment: 'Sift-Down Step 1: Compare 80 with children 24 and 30. 24 is smallest child -> Swap 80 with 24.'
      },
      {
        type: 'heap',
        heap: [24, 45, 30, 80, 60, 55],
        action: 'sift-down-complete',
        comment: 'Sift-Down Step 2: Compare 80 with children 45 and 60. 45 is smaller -> Swap 80 with 45. Min-Heap order restored in O(log n)!'
      }
    ];
  }

  generateGraphSteps() {
    return [
      {
        type: 'graph',
        current: 'SPSU',
        visited: ['SPSU'],
        distances: { SPSU: 0, 'Fateh Sagar': 20, 'City Palace': Infinity, 'Jag Mandir': Infinity, 'Sajjangarh': Infinity, 'Karni Mata': Infinity },
        comment: 'Dijkstra Shortest Path: Start at SPSU Campus (Distance = 0). Initializing Priority Queue.'
      },
      {
        type: 'graph',
        current: 'Fateh Sagar',
        visited: ['SPSU', 'Fateh Sagar'],
        distances: { SPSU: 0, 'Fateh Sagar': 20, 'City Palace': 30, 'Sajjangarh': 35, 'Jag Mandir': Infinity, 'Karni Mata': Infinity },
        comment: 'Relaxed edges from SPSU: Reached Fateh Sagar (dist 20). Discovered paths to City Palace (20+10=30) and Sajjangarh (20+15=35).'
      },
      {
        type: 'graph',
        current: 'City Palace',
        visited: ['SPSU', 'Fateh Sagar', 'City Palace'],
        distances: { SPSU: 0, 'Fateh Sagar': 20, 'City Palace': 30, 'Sajjangarh': 35, 'Jag Mandir': 35, 'Karni Mata': 38 },
        comment: 'Visited City Palace (dist 30): Discovered Jag Mandir boat route (30+5=35) and Karni Mata (30+8=38).'
      },
      {
        type: 'graph',
        current: 'Jag Mandir',
        visited: ['SPSU', 'Fateh Sagar', 'City Palace', 'Jag Mandir'],
        distances: { SPSU: 0, 'Fateh Sagar': 20, 'City Palace': 30, 'Sajjangarh': 35, 'Jag Mandir': 35, 'Karni Mata': 38 },
        shortestPath: ['SPSU', 'Fateh Sagar', 'City Palace', 'Jag Mandir'],
        comment: '⛵ Destination Reached! Shortest route: SPSU -> Fateh Sagar -> City Palace -> Jag Mandir (Total weight: 35 km).'
      }
    ];
  }

  generateKnapsackSteps() {
    return [
      {
        type: 'dp',
        row: 1, col: 1,
        item: { name: 'Emerald Crest', wt: 1, val: 15 },
        comment: 'Kumbhalgarh DP Table: Item 1 (Wt: 1, Val: 15). For capacities >= 1, taking it yields value 15.'
      },
      {
        type: 'dp',
        row: 2, col: 3,
        item: { name: 'Silver Shield', wt: 3, val: 50 },
        comment: 'Item 2 (Wt: 3, Val: 50): At capacity 4, choose max(dp[1][4], 50 + dp[1][4-3]) = max(15, 50+15) = 65.'
      },
      {
        type: 'dp',
        row: 3, col: 4,
        item: { name: 'Gold Dagger', wt: 4, val: 60 },
        comment: 'Item 3 (Wt: 4, Val: 60): At capacity 7, combine Item 3 (4kg, 60) + Item 2 (3kg, 50) = 110.'
      },
      {
        type: 'dp',
        row: 4, col: 8,
        item: { name: 'Royal Armor', wt: 5, val: 90 },
        maxVal: 155,
        comment: '🏰 Bottom-Right DP Cell dp[4][8] = 155! Optimal knapsack selection achieved without recalculating subproblems.'
      }
    ];
  }

  generateLRUSteps() {
    return [
      {
        type: 'synthesis',
        cache: [
          { key: 'A', val: 'Turing Hall' },
          { key: 'B', val: 'Pichola Boat' },
          { key: 'C', val: 'Durbar Key' }
        ],
        action: 'get',
        targetKey: 'B',
        comment: 'LRU Cache Operation: `get("B")`. Hash map finds node "B" in O(1). Node moved to MRU Head of Doubly Linked List.'
      },
      {
        type: 'synthesis',
        cache: [
          { key: 'B', val: 'Pichola Boat' },
          { key: 'A', val: 'Turing Hall' },
          { key: 'C', val: 'Durbar Key' }
        ],
        action: 'put',
        targetKey: 'D',
        comment: 'Capacity is 3. Operation: `put("D", "Monsoon Palace")`. Cache is full! Evict LRU tail "C" in O(1) and insert "D" at Head.'
      },
      {
        type: 'synthesis',
        cache: [
          { key: 'D', val: 'Monsoon Palace' },
          { key: 'B', val: 'Pichola Boat' },
          { key: 'A', val: 'Turing Hall' }
        ],
        action: 'completed',
        comment: '🌟 Synthesis Mastered: Hash Map + Doubly Linked List achieves O(1) get, put and evict simultaneously.'
      }
    ];
  }

  // --- Rendering UI ---
  render() {
    if (!this.container || !this.currentZone) return;
    const step = this.steps[this.currentStepIdx] || {};

    if (this.statusEl) {
      this.statusEl.textContent = `Step ${this.currentStepIdx + 1} of ${this.steps.length}`;
    }
    if (this.stepCommentEl) {
      this.stepCommentEl.textContent = step.comment || '';
    }

    let html = '';
    switch (step.type) {
      case 'array':
        html = this.renderArrayStep(step);
        break;
      case 'linkedlist':
        html = this.renderLinkedListStep(step);
        break;
      case 'stack':
        html = this.renderStackStep(step);
        break;
      case 'nqueens':
        html = this.renderNQueensStep(step);
        break;
      case 'sorting':
        html = this.renderSortingStep(step);
        break;
      case 'tree':
        html = this.renderTreeStep(step);
        break;
      case 'heap':
        html = this.renderHeapStep(step);
        break;
      case 'graph':
        html = this.renderGraphStep(step);
        break;
      case 'dp':
        html = this.renderDPStep(step);
        break;
      case 'synthesis':
        html = this.renderSynthesisStep(step);
        break;
      default:
        html = `<div class="vis-default"><p>${step.comment || 'Interactive Visualizer'}</p></div>`;
    }

    this.container.innerHTML = html;
  }

  renderArrayStep(s) {
    return `
      <div class="vis-wrapper array-vis">
        <div class="vis-metric-bar">
          <span class="vis-metric">Target Sum: <strong>${s.target}</strong></span>
          <span class="vis-metric">Current Sum: <strong class="${s.matched ? 'text-gold' : ''}">${s.sum}</strong></span>
          <span class="vis-metric">Left Index: <strong>${s.left}</strong></span>
          <span class="vis-metric">Right Index: <strong>${s.right}</strong></span>
        </div>
        <div class="array-strip">
          ${s.arr.map((val, idx) => {
            const isLeft = idx === s.left;
            const isRight = idx === s.right;
            const isMatch = s.matched && (isLeft || isRight);
            let cls = 'array-cell';
            if (isMatch) cls += ' match-cell';
            else if (isLeft) cls += ' left-ptr-cell';
            else if (isRight) cls += ' right-ptr-cell';
            return `
              <div class="${cls}">
                <div class="cell-idx">[${idx}]</div>
                <div class="cell-val">${val}</div>
                <div class="cell-label">${isLeft ? 'LEFT 👆' : isRight ? 'RIGHT 👆' : ''}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderLinkedListStep(s) {
    return `
      <div class="vis-wrapper ll-vis">
        <div class="ll-pointer-summary">
          <span>prev: <strong>${s.pointers.prev !== -1 ? s.nodes[s.pointers.prev] : 'NULL'}</strong></span>
          <span>curr: <strong>${s.pointers.curr !== -1 ? s.nodes[s.pointers.curr] : 'NULL'}</strong></span>
          <span>nextTemp: <strong>${s.pointers.nextTemp !== -1 ? s.nodes[s.pointers.nextTemp] : 'NULL'}</strong></span>
        </div>
        <div class="ll-nodes-chain">
          ${s.nodes.map((val, idx) => {
            const isPrev = idx === s.pointers.prev;
            const isCurr = idx === s.pointers.curr;
            const isNext = idx === s.pointers.nextTemp;
            const isReversed = s.reversedEdges.includes(idx);
            let nodeCls = 'll-node';
            if (isCurr) nodeCls += ' ll-curr';
            if (isPrev) nodeCls += ' ll-prev';
            if (isNext) nodeCls += ' ll-next';
            return `
              <div class="ll-node-box">
                <div class="${nodeCls}">
                  <span class="ll-val">${val}</span>
                  <span class="ll-next-dot">•</span>
                </div>
                <div class="ll-sub-label">${isCurr ? 'curr' : isPrev ? 'prev' : isNext ? 'next' : ''}</div>
              </div>
              ${idx < s.nodes.length - 1 ? `
                <div class="ll-arrow ${isReversed ? 'arrow-reversed' : 'arrow-forward'}">
                  ${isReversed ? '⮜' : '➔'}
                </div>
              ` : `
                <div class="ll-arrow">➔ <span class="null-badge">NULL</span></div>
              `}
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderStackStep(s) {
    return `
      <div class="vis-wrapper stack-vis">
        <div class="stack-layout">
          <div class="stack-tube">
            <div class="tube-label">LIFO Call Stack</div>
            <div class="tube-content">
              ${s.stack.length === 0 ? '<div class="tube-empty">(Empty Stack)</div>' : ''}
              ${s.stack.map((item, idx) => `
                <div class="stack-plate ${idx === s.stack.length - 1 ? 'stack-top' : ''}">
                  ${item} ${idx === s.stack.length - 1 ? '<span class="top-tag">TOP</span>' : ''}
                </div>
              `).reverse().join('')}
            </div>
          </div>
          <div class="stack-stream">
            <div class="stream-title">Parsing Stream</div>
            <div class="stream-char-box">Current Symbol: <strong class="highlight-char">${s.currentChar || '—'}</strong></div>
            <div class="stream-remaining">Remaining: ${s.remaining.join(' ') || '(End of string)'}</div>
          </div>
        </div>
      </div>
    `;
  }

  renderNQueensStep(s) {
    return `
      <div class="vis-wrapper queens-vis">
        <div class="chess-board-4x4">
          ${s.board.map((row, r) => `
            <div class="chess-row">
              ${row.map((cell, c) => {
                const isDark = (r + c) % 2 === 1;
                const hasQueen = cell === 'Q';
                return `
                  <div class="chess-cell ${isDark ? 'cell-dark' : 'cell-light'} ${hasQueen ? 'cell-queen' : ''}">
                    ${hasQueen ? '👑' : ''}
                  </div>
                `;
              }).join('')}
            </div>
          `).join('')}
        </div>
        ${s.conflict ? '<div class="vis-alert conflict-alert">⚠️ Row conflict! Backtracking...</div>' : ''}
        ${s.solved ? '<div class="vis-alert solved-alert">🎉 Valid N-Queens Placement Found!</div>' : ''}
      </div>
    `;
  }

  renderSortingStep(s) {
    const maxVal = Math.max(...s.bars);
    return `
      <div class="vis-wrapper sorting-vis">
        <div class="bars-container">
          ${s.bars.map((val, idx) => {
            const heightPct = Math.round((val / maxVal) * 100);
            const isActive = s.active && s.active.includes(idx);
            return `
              <div class="sort-bar-column">
                <div class="sort-bar ${isActive ? 'bar-active' : ''} ${s.sorted ? 'bar-sorted' : ''}" style="height: ${heightPct}%;">
                  <span class="bar-num">${val}</span>
                </div>
                <div class="bar-index">[${idx}]</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderTreeStep(s) {
    return `
      <div class="vis-wrapper tree-vis">
        <div class="tree-svg-container">
          <svg viewBox="0 0 400 220" class="tree-svg">
            <!-- Edges -->
            <line x1="200" y1="35" x2="100" y2="95" stroke="#475569" stroke-width="3" />
            <line x1="200" y1="35" x2="300" y2="95" stroke="#475569" stroke-width="3" />
            <line x1="100" y1="95" x2="50" y2="165" stroke="#475569" stroke-width="3" />
            <line x1="100" y1="95" x2="150" y2="165" stroke="#475569" stroke-width="3" />
            <line x1="300" y1="95" x2="250" y2="165" stroke="#475569" stroke-width="3" />
            <line x1="300" y1="95" x2="350" y2="165" stroke="#475569" stroke-width="3" />

            <!-- Nodes -->
            ${this.renderTreeNode(200, 35, 50, s.highlight === 50)}
            ${this.renderTreeNode(100, 95, 30, s.highlight === 30)}
            ${this.renderTreeNode(300, 95, 70, s.highlight === 70)}
            ${this.renderTreeNode(50, 165, 20, s.highlight === 20)}
            ${this.renderTreeNode(150, 165, 40, s.highlight === 40)}
            ${this.renderTreeNode(250, 165, 60, s.highlight === 60)}
            ${this.renderTreeNode(350, 165, 80, s.highlight === 80)}
          </svg>
        </div>
        ${s.sortedList ? `
          <div class="inorder-box">
            <strong>Inorder Sequence:</strong> [${s.sortedList.join(', ')}]
          </div>
        ` : ''}
      </div>
    `;
  }

  renderTreeNode(cx, cy, val, isHighlighted) {
    return `
      <g class="tree-node ${isHighlighted ? 'node-highlight' : ''}">
        <circle cx="${cx}" cy="${cy}" r="20" fill="${isHighlighted ? '#f59e0b' : '#1e293b'}" stroke="#38bdf8" stroke-width="2.5" />
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="bold">${val}</text>
      </g>
    `;
  }

  renderHeapStep(s) {
    return `
      <div class="vis-wrapper heap-vis">
        <div class="heap-array-view">
          <div class="heap-label">Heap Array Representation (Parent i ➔ Left 2i+1, Right 2i+2)</div>
          <div class="heap-cells">
            ${s.heap.map((v, i) => `
              <div class="heap-cell ${i === 0 ? 'heap-root-cell' : ''}">
                <div class="heap-idx">i=${i}</div>
                <div class="heap-val">${v}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderGraphStep(s) {
    return `
      <div class="vis-wrapper graph-vis">
        <div class="graph-status-grid">
          <div class="graph-node-chips">
            <strong>Tentative Shortest Distances:</strong>
            <div class="chips-row">
              ${Object.entries(s.distances).map(([node, dist]) => `
                <div class="dist-chip ${s.current === node ? 'chip-active' : ''}">
                  <span class="chip-name">${node}</span>:
                  <span class="chip-val">${dist === Infinity ? '∞' : dist + ' km'}</span>
                </div>
              `).join('')}
            </div>
          </div>
          ${s.shortestPath ? `
            <div class="route-banner">
              🏆 Shortest Route: <strong>${s.shortestPath.join(' ➔ ')}</strong>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderDPStep(s) {
    return `
      <div class="vis-wrapper dp-vis">
        <div class="dp-header-card">
          <span>Active Item: <strong>${s.item ? s.item.name : 'All Items'}</strong></span>
          <span>Weight: <strong>${s.item ? s.item.wt + ' kg' : '—'}</strong></span>
          <span>Value: <strong>${s.item ? s.item.val + ' Mohurs' : '—'}</strong></span>
        </div>
        <div class="dp-table-preview">
          <table class="dp-grid">
            <thead>
              <tr><th>Item \\ Wt</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
            </thead>
            <tbody>
              <tr><td>Base (0)</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
              <tr class="${s.row >= 1 ? 'row-filled' : ''}"><td>Emerald (1)</td><td>0</td><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td><td>15</td></tr>
              <tr class="${s.row >= 2 ? 'row-filled' : ''}"><td>Shield (3)</td><td>0</td><td>15</td><td>15</td><td>50</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td></tr>
              <tr class="${s.row >= 3 ? 'row-filled' : ''}"><td>Dagger (4)</td><td>0</td><td>15</td><td>15</td><td>50</td><td>65</td><td>75</td><td>75</td><td>110</td><td>125</td></tr>
              <tr class="${s.row >= 4 ? 'row-filled' : ''}"><td>Armor (5)</td><td>0</td><td>15</td><td>15</td><td>50</td><td>65</td><td>90</td><td>105</td><td>110</td><td class="dp-target-cell">155</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderSynthesisStep(s) {
    return `
      <div class="vis-wrapper lru-vis">
        <div class="lru-header">
          <span>Capacity: 3</span>
          <span>Action: <strong>${s.action ? s.action.toUpperCase() : 'IDLE'}</strong></span>
          <span>Key: <strong>${s.targetKey || '—'}</strong></span>
        </div>
        <div class="lru-structure">
          <div class="lru-tag head-tag">MRU (Most Recent)</div>
          <div class="lru-chain">
            ${s.cache.map((item, idx) => `
              <div class="lru-node ${idx === 0 ? 'mru-node' : ''}">
                <div class="lru-key">Key: "${item.key}"</div>
                <div class="lru-val">${item.val}</div>
              </div>
              ${idx < s.cache.length - 1 ? '<div class="lru-bidirectional">⇄</div>' : ''}
            `).join('')}
          </div>
          <div class="lru-tag tail-tag">LRU (Eviction Target)</div>
        </div>
      </div>
    `;
  }

  // --- Step Controls ---
  next() {
    if (this.currentStepIdx < this.steps.length - 1) {
      this.currentStepIdx++;
      sound.playStep();
      this.render();
      return true;
    } else {
      this.pause();
      sound.playSuccess();
      return false;
    }
  }

  prev() {
    if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      sound.playClick();
      this.render();
      return true;
    }
    return false;
  }

  reset() {
    this.pause();
    this.currentStepIdx = 0;
    sound.playClick();
    this.render();
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    sound.playClick();
    this.timer = setInterval(() => {
      const hasMore = this.next();
      if (!hasMore) {
        this.pause();
      }
    }, this.speedMs);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}
