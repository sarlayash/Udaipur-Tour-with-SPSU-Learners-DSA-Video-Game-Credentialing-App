// Udaipur Tour with SPSU Learners - DSA Realm & Zone Data
// Comprehensive DSA concepts, visualizer steps, challenges, and Udaipur landmarks

export const ZONES = [
  {
    id: 1,
    key: 'spsu-campus',
    title: 'SPSU Campus, Bhatewar',
    subtitle: 'The Gateway: Arrays, Memory Contiguity & Two-Pointers',
    landmark: 'Sir Padampat Singhania University Turing Quad',
    lore: 'Nestled in the tranquil Aravalli valley of Udaipur, the journey begins at SPSU. Just as students occupy sequential dormitory rooms in Hall 1, primitive arrays occupy contiguous blocks in physical RAM.',
    concept: 'Arrays & Two-Pointer Logic',
    color: '#3b82f6',
    icon: '🎓',
    badge: {
      id: 'badge-array',
      name: 'Turing Array Scholar',
      icon: '🏛️',
      desc: 'Mastered contiguous memory & Two-Pointer traversal at SPSU Campus • Powered By Kapil'
    },
    xpReward: 200,
    theory: {
      overview: 'An Array is a contiguous linear data structure where elements of the same type are placed in adjoining memory addresses. The address of element at index i is calculated instantaneously using the base address: Address(i) = BaseAddress + (i * ElementSize). This yields instant O(1) random access.',
      keyPoints: [
        'Contiguous RAM layout enables CPU cache spatial locality.',
        'O(1) access by index; O(n) worst-case insertion or deletion due to shifting.',
        'Dynamic Arrays (C++ vector, Java ArrayList, Python list) auto-grow by doubling capacity (amortized O(1) append).',
        'Two-Pointer Technique: Converging pointers (e.g. Two Sum on sorted array) or Fast & Slow pointers reduce O(n²) checks to O(n).'
      ],
      complexities: {
        access: 'O(1)',
        search: 'O(n) [Linear] / O(log n) [Sorted]',
        insertion: 'O(n) [Shifting required]',
        deletion: 'O(n) [Shifting required]'
      }
    },
    visualizer: {
      type: 'array',
      initialArray: [12, 28, 35, 42, 59, 64, 78, 91],
      target: 64,
      algorithm: 'Two-Pointer Sum Target Search'
    },
    challenge: {
      question: 'At SPSU Library, a sorted array of book weights is [10, 20, 35, 50, 75, 90]. You need to find two books whose weights sum to 85 using the two-pointer technique. If Left pointer starts at 0 (value 10) and Right pointer at 5 (value 90), what is the first step?',
      options: [
        'Sum is 100 > 85, so decrement the Right pointer to index 4 (75)',
        'Sum is 100 > 85, so increment the Left pointer to index 1 (20)',
        'Array is sorted so swap Left and Right pointers',
        'Directly jump to middle element and restart linear search'
      ],
      correctIndex: 0,
      explanation: 'Since the array is sorted, 10 + 90 = 100 which exceeds 85. To decrease the total sum, we must shift the Right pointer leftward (decrement to index 4, value 75). Then 10 + 75 = 85 (Target found!).'
    },
    codeSnippets: {
      cpp: `// Two-Pointer Two-Sum on Sorted Array
bool findPair(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}`,
      java: `// Two-Pointer Two-Sum
public static boolean findPair(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}`,
      python: `# Two-Pointer Two-Sum
def find_pair(arr: list[int], target: int) -> bool:
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return True
        elif s < target:
            left += 1
        else:
            right -= 1
    return False`,
      javascript: `// Two-Pointer Two-Sum
function findPair(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}`
    }
  },
  {
    id: 2,
    key: 'fateh-sagar',
    title: 'Fateh Sagar Lake & Paal',
    subtitle: 'Lake Ripples: Linked Lists & Floyd\'s Cycle Detection',
    landmark: 'Fateh Sagar Paal & Nehru Park Island',
    lore: 'Watching royal Shikara boats chained along Fateh Sagar\'s shores, you realize each boat holds a rope tied only to the next. That is the essence of a Linked List—dynamic, non-contiguous nodes floating on the water connected by pointers.',
    concept: 'Singly, Doubly Linked Lists & Fast-Slow Pointers',
    color: '#06b6d4',
    icon: '⛵',
    badge: {
      id: 'badge-linkedlist',
      name: 'Fateh Sagar Boatswain',
      icon: '⚓',
      desc: 'Mastered dynamic memory nodes, pointer reversals, and tortoise-hare cycle detection • Powered By Kapil'
    },
    xpReward: 220,
    theory: {
      overview: 'Unlike arrays, Linked Lists store data in isolated nodes distributed arbitrarily in the heap. Each node contains a value and one or more reference pointers (`next`, `prev`). Insertion and deletion at a known pointer is lightning-fast O(1) with zero element shifting.',
      keyPoints: [
        'Singly Linked List: Unidirectional traversal (Data + Next pointer).',
        'Doubly Linked List: Bidirectional traversal (Prev + Data + Next). Enables O(1) node deletion if node address is known.',
        'Circular Linked List: Tail node points back to Head, modeling round-robin schedulers or cyclical boat routes around Nehru Park.',
        'Floyd\'s Cycle Detection (Tortoise and Hare): Fast pointer moves 2 steps, Slow pointer moves 1 step. If a loop exists, they must collide in O(n) time.'
      ],
      complexities: {
        access: 'O(n) [Sequential traversal required]',
        search: 'O(n)',
        insertionAtHead: 'O(1)',
        deletionKnownNode: 'O(1) [Doubly Linked List]'
      }
    },
    visualizer: {
      type: 'linkedlist',
      initialList: [10, 25, 40, 55, 70, 85],
      algorithm: 'Reversing a Singly Linked List (3-Pointer Sliding: prev, curr, next)'
    },
    challenge: {
      question: 'When reversing a Singly Linked List in place, which pointer sequence correctly redirects the current node without losing the remainder of the list?',
      options: [
        'nextTemp = curr.next; curr.next = prev; prev = curr; curr = nextTemp;',
        'curr.next = prev; nextTemp = curr.next; prev = curr; curr = nextTemp;',
        'prev = curr; curr = curr.next; curr.next = prev;',
        'curr.next = null; prev = curr; curr = curr.next;'
      ],
      correctIndex: 0,
      explanation: 'You must first save curr.next in nextTemp before breaking the forward pointer. Then flip curr.next to point backwards to prev. Finally shift prev forward to curr, and advance curr to nextTemp.'
    },
    codeSnippets: {
      cpp: `// Reverse Singly Linked List in C++
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head, *nextTemp = nullptr;
    while (curr != nullptr) {
        nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      java: `// Reverse Singly Linked List
public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      python: `# Reverse Singly Linked List
def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
      javascript: `// Reverse Singly Linked List
function reverseList(head) {
    let prev = null, curr = head;
    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
    }
  },
  {
    id: 3,
    key: 'city-palace',
    title: 'City Palace, Udaipur',
    subtitle: 'The Royal Durbar: Stacks, Queues & Monotonic Sequences',
    landmark: 'Tripolia Gate & Zenana Mahal',
    lore: 'At the magnificent City Palace towering over Lake Pichola, guests entering through Tripolia Gate form an orderly FIFO Queue. Inside the Royal Treasury, ceremonial silver plates are stacked LIFO—the last placed on top is the first picked by the Maharana.',
    concept: 'Stacks (LIFO) & Queues (FIFO)',
    color: '#eab308',
    icon: '👑',
    badge: {
      id: 'badge-stack-queue',
      name: 'Tripolia Gatekeeper',
      icon: '🛡️',
      desc: 'Mastered LIFO call stacks, parenthesis balancing, and FIFO circular buffer mechanics • Powered By Kapil'
    },
    xpReward: 240,
    theory: {
      overview: 'Stacks follow Last-In, First-Out (LIFO); operations are push and pop at the top. Queues follow First-In, First-Out (FIFO); enqueue at tail, dequeue at head. Deques support O(1) operations at both ends.',
      keyPoints: [
        'Stack Applications: Function recursion call stack, undo/redo buffers, syntax parsing, browser back history.',
        'Monotonic Stack: Maintains elements in strictly increasing or decreasing order to solve Next Greater Element in linear O(n) time.',
        'Queue Applications: CPU scheduling, asynchronous message buffers, Breadth-First Search (BFS) level exploration.',
        'Circular Queue: Reuses vacated front space with modular arithmetic: `rear = (rear + 1) % capacity`.'
      ],
      complexities: {
        push: 'O(1)',
        pop: 'O(1)',
        peek: 'O(1)',
        search: 'O(n)'
      }
    },
    visualizer: {
      type: 'stack-queue',
      initialStack: ['Plate #1 (Bronze)', 'Plate #2 (Silver)', 'Plate #3 (Gold)'],
      algorithm: 'Valid Parentheses & LIFO Stack Evaluation'
    },
    challenge: {
      question: 'In verifying the architectural bracket symmetry of City Palace arches, you parse the string `{[()]}`. After reading `{`, `[`, and `(`, you encounter `)`. What is the stack state check?',
      options: [
        'Pop the stack top `(`; verify it matches `)`, leaving `[` and `{` on the stack',
        'Push `)` onto the stack and continue',
        'Clear the entire stack immediately',
        'Swap the bottom `{` with the top `(`'
      ],
      correctIndex: 0,
      explanation: 'When a closing delimiter is encountered, the stack top MUST be the corresponding open delimiter. `)` matches `(`, so `(` is popped. The stack now holds `[` and `{`.'
    },
    codeSnippets: {
      cpp: `// Valid Parentheses Check in C++
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
      java: `// Valid Parentheses in Java
public boolean isValid(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.isEmpty()) return false;
            char top = st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.isEmpty();
}`,
      python: `# Valid Parentheses
def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      javascript: `// Valid Parentheses
function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const ch of s) {
        if (map[ch]) {
            if (stack.pop() !== map[ch]) return false;
        } else {
            stack.push(ch);
        }
    }
    return stack.length === 0;
}`
    }
  },
  {
    id: 4,
    key: 'saheliyon-ki-bari',
    title: 'Saheliyon-ki-Bari',
    subtitle: 'The Royal Courtyard: Recursion & Backtracking',
    landmark: 'Fountain Courtyard & Marble Elephants',
    lore: 'Built by Maharana Sangram Singh for the 48 maidens, the fountains operate purely on natural hydraulic gravity without pumps. Each marble stream branches into smaller channels, exactly as a recursive function decomposes large tasks into identical sub-problems, backtracking when a branch runs dry.',
    concept: 'Recursion, Call Trees & N-Queens Backtracking',
    color: '#ec4899',
    icon: '🌸',
    badge: {
      id: 'badge-backtrack',
      name: 'Fountain of Recursion',
      icon: '🌺',
      desc: 'Mastered base cases, activation frames, and state tree pruning via backtracking • Powered By Kapil'
    },
    xpReward: 260,
    theory: {
      overview: 'Recursion occurs when a method calls itself to solve a smaller instance of the same problem. Every recursive function requires: 1) Base Case (terminating condition), and 2) Recursive Step (moving toward the base case). Backtracking is systematic trial-and-error that prunes dead ends.',
      keyPoints: [
        'Call Stack Activation Records store local variables and return addresses for each recursion depth.',
        'Stack Overflow occurs when recursion fails to hit a base case and exceeds call stack limits.',
        'Backtracking Pattern: `Choose -> Explore -> Unchoose` (restore state before next branch).',
        'Classic problems: N-Queens, Sudoku Solver, Subset Sum, Permutations, Maze Pathfinding.'
      ],
      complexities: {
        fibonacciNaive: 'O(2ⁿ) time, O(n) call stack space',
        nQueensTime: 'O(N!) time [pruned state space]',
        recursionDepth: 'O(Depth) memory on call stack'
      }
    },
    visualizer: {
      type: 'recursion-tree',
      initialValue: 4,
      algorithm: 'Call Tree Branching & N-Queens State Pruning'
    },
    challenge: {
      question: 'When placing Queens on an N×N board in Saheliyon-ki-Bari, why do we unmark/remove a queen (`board[row][col] = 0`) after the recursive call returns false?',
      options: [
        'To backtrack and restore the state, allowing the algorithm to try the next column',
        'To prevent infinite recursion loops in the base case',
        'Because the queen expired in memory heap',
        'To invert the chessboard rows into columns'
      ],
      correctIndex: 0,
      explanation: 'This is the heart of backtracking ("Unchoose"). If placing the queen at col leads to no viable solution in subsequent rows, we undo the placement so subsequent columns can be explored cleanly.'
    },
    codeSnippets: {
      cpp: `// N-Queens Backtracking in C++
bool isSafe(const vector<string>& board, int r, int c, int n) {
    for (int i = 0; i < r; i++) if (board[i][c] == 'Q') return false;
    for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] == 'Q') return false;
    for (int i = r - 1, j = c + 1; i >= 0 && j < n; i--, j++)
        if (board[i][j] == 'Q') return false;
    return true;
}
void solve(int r, int n, vector<string>& board, vector<vector<string>>& res) {
    if (r == n) { res.push_back(board); return; }
    for (int c = 0; c < n; c++) {
        if (isSafe(board, r, c, n)) {
            board[r][c] = 'Q';     // Choose
            solve(r + 1, n, board, res); // Explore
            board[r][c] = '.';     // Unchoose (Backtrack)
        }
    }
}`,
      java: `// N-Queens Backtracking
private void backtrack(int r, int n, char[][] board, List<List<String>> res) {
    if (r == n) {
        res.add(construct(board));
        return;
    }
    for (int c = 0; c < n; c++) {
        if (isValid(board, r, c, n)) {
            board[r][c] = 'Q';
            backtrack(r + 1, n, board, res);
            board[r][c] = '.'; // Backtrack
        }
    }
}`,
      python: `# N-Queens Backtracking
def solve_n_queens(n: int) -> list[list[str]]:
    res, cols, pos_diag, neg_diag = [], set(), set(), set()
    board = [["."] * n for _ in range(n)]

    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue
            cols.add(c); pos_diag.add(r + c); neg_diag.add(r - c)
            board[r][c] = "Q"
            backtrack(r + 1)
            cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)
            board[r][c] = "."
    backtrack(0)
    return res`,
      javascript: `// N-Queens Backtracking
function solveNQueens(n) {
    const res = [];
    const board = Array.from({length: n}, () => Array(n).fill('.'));
    function backtrack(r, cols, d1, d2) {
        if (r === n) {
            res.push(board.map(row => row.join('')));
            return;
        }
        for (let c = 0; c < n; c++) {
            if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue;
            board[r][c] = 'Q';
            cols.add(c); d1.add(r - c); d2.add(r + c);
            backtrack(r + 1, cols, d1, d2);
            board[r][c] = '.';
            cols.delete(c); d1.delete(r - c); d2.delete(r + c);
        }
    }
    backtrack(0, new Set(), new Set(), new Set());
    return res;
}`
    }
  },
  {
    id: 5,
    key: 'jag-mandir',
    title: 'Jag Mandir Island Palace',
    subtitle: 'Lake Sanctuary: Divide & Conquer, Sorting & Binary Search',
    landmark: 'Gul Mahal & Lake Pichola Marble Domes',
    lore: 'Isolated on an island in Lake Pichola, Jag Mandir served as a secure haven for Prince Khurram (later Emperor Shah Jahan). Just as the palace partitions royal treasures into orderly vaults, Divide and Conquer algorithms partition large arrays into halves, achieving optimal O(n log n) sorting.',
    concept: 'Binary Search, Merge Sort & Quick Sort',
    color: '#8b5cf6',
    icon: '🏝️',
    badge: {
      id: 'badge-sorting',
      name: 'Island Sortmaster',
      icon: '⚔️',
      desc: 'Mastered logarithmic search bounds, divide-and-conquer merges, and in-place partitioning • Powered By Kapil'
    },
    xpReward: 280,
    theory: {
      overview: 'Divide and conquer breaks a problem into smaller independent subproblems, solves each recursively, and combines the results. Binary Search eliminates half the search space per comparison (O(log n)). Merge Sort guarantees O(n log n) stable sorting, while Quick Sort delivers blazing in-place partitioning.',
      keyPoints: [
        'Binary Search requires a sorted array: `mid = left + (right - left) / 2` avoids integer overflow.',
        'Merge Sort: Divide array into halves until size 1, then merge two sorted halves in O(n) auxiliary space.',
        'Quick Sort: Select a pivot, partition elements into <= pivot and > pivot, and recurse. Average O(n log n), worst-case O(n²).',
        'Stability: A sort is stable if equal elements retain their original relative order (e.g. Merge Sort).'
      ],
      complexities: {
        binarySearch: 'O(log n) time, O(1) space',
        mergeSort: 'O(n log n) time (Guaranteed), O(n) space',
        quickSort: 'O(n log n) avg, O(n²) worst, O(log n) stack space',
        bubbleSort: 'O(n²) time, O(1) space'
      }
    },
    visualizer: {
      type: 'sorting',
      initialArray: [68, 23, 89, 14, 52, 37, 75, 41],
      algorithm: 'Merge Sort & Binary Search Visualizer'
    },
    challenge: {
      question: 'When performing Binary Search for target 52 in sorted array `[14, 23, 37, 41, 52, 68, 75, 89]` with `left=0` and `right=7`: `mid` evaluates to index 3 (value 41). What is the next step?',
      options: [
        'Since 41 < 52, search right half by setting `left = mid + 1` (index 4)',
        'Since 41 < 52, search left half by setting `right = mid - 1` (index 2)',
        'Target is not present because 41 is not 52',
        'Divide `mid` by 2 and set `right = mid`'
      ],
      correctIndex: 0,
      explanation: 'Since the array is sorted ascending and 41 < 52, the target must lie to the right of mid. We discard indices 0..3 and shift `left = mid + 1` (index 4, which is 52!).'
    },
    codeSnippets: {
      cpp: `// Merge Sort Implementation in C++
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size())
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
      java: `// Binary Search in Java
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      python: `# Quick Sort with Lomuto Partition
def quick_sort(arr: list[int], low: int, high: int):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      javascript: `// Binary Search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = (left + right) >> 1;
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    }
  },
  {
    id: 6,
    key: 'sajjangarh',
    title: 'Sajjangarh (Monsoon Palace)',
    subtitle: 'Bansdara Peak: Binary Trees, BSTs & Traversals',
    landmark: 'Monsoon Palace Citadel over Fateh Sagar',
    lore: 'Perched high atop Bansdara hill, Sajjangarh offers a 360-degree panoramic vantage point of Udaipur\'s lakes and valleys. Like branches extending outward and downward from the royal roof, a Tree data structure branches from a singular Root down to leaves, preserving hierarchical order.',
    concept: 'Binary Trees, BSTs & Tree Traversals',
    color: '#10b981',
    icon: '⛰️',
    badge: {
      id: 'badge-trees',
      name: 'Monsoon Tree Oracle',
      icon: '🌲',
      desc: 'Mastered hierarchical tree structures, BST invariants, and DFS/BFS traversals • Powered By Kapil'
    },
    xpReward: 300,
    theory: {
      overview: 'A Tree is a non-linear hierarchical structure comprising nodes connected by edges. In a Binary Search Tree (BST), every node adheres to the BST Invariant: LeftSubtree < Node < RightSubtree. Inorder traversal of a BST visits nodes in strictly sorted ascending order.',
      keyPoints: [
        'DFS Traversals: Preorder (Root, L, R), Inorder (L, Root, R), Postorder (L, R, Root).',
        'BFS / Level-Order: Visits nodes tier-by-tier from top to bottom using a FIFO Queue.',
        'Height of a Tree: Number of edges on the longest root-to-leaf path.',
        'Self-Balancing Trees (AVL, Red-Black): Perform rotations to keep height at O(log n), preventing degenerate linked-list degradation.'
      ],
      complexities: {
        bstSearchAvg: 'O(log n)',
        bstSearchWorst: 'O(n) [Degenerate skewed tree]',
        avlSearch: 'O(log n) [Guaranteed balance]',
        treeTraversal: 'O(n) time, O(h) call stack space'
      }
    },
    visualizer: {
      type: 'tree',
      initialTree: {
        val: 50,
        left: { val: 30, left: { val: 20 }, right: { val: 40 } },
        right: { val: 70, left: { val: 60 }, right: { val: 80 } }
      },
      algorithm: 'BST Search & Inorder Traversal (L -> Root -> R)'
    },
    challenge: {
      question: 'In a Binary Search Tree holding values [20, 30, 40, 50, 60, 70, 80], which traversal method guarantees you read the values in strictly sorted ascending order [20, 30, 40, 50, 60, 70, 80]?',
      options: [
        'Inorder Traversal (Left -> Root -> Right)',
        'Preorder Traversal (Root -> Left -> Right)',
        'Postorder Traversal (Left -> Right -> Root)',
        'Level-order Traversal (Queue BFS)'
      ],
      correctIndex: 0,
      explanation: 'By definition of the BST invariant (Left < Root < Right), an Inorder traversal visits all smaller elements on the left, then the root itself, then all larger elements on the right, producing the elements in perfectly sorted ascending order.'
    },
    codeSnippets: {
      cpp: `// BST Search & Insertion in C++
TreeNode* insertBST(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insertBST(root->left, val);
    else if (val > root->val) root->right = insertBST(root->right, val);
    return root;
}
void inorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}`,
      java: `// Inorder Traversal in Java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    dfs(root, res);
    return res;
}
private void dfs(TreeNode node, List<Integer> res) {
    if (node == null) return;
    dfs(node.left, res);
    res.add(node.val);
    dfs(node.right, res);
}`,
      python: `# Invert Binary Tree
def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      javascript: `// Level Order Traversal (BFS)
function levelOrder(root) {
    if (!root) return [];
    const res = [], queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length, currentLevel = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(currentLevel);
    }
    return res;
}`
    }
  },
  {
    id: 7,
    key: 'bagore-ki-haveli',
    title: 'Bagore Ki Haveli',
    subtitle: 'Gangaur Ghat: Hash Tables & Priority Queues (Heaps)',
    landmark: 'Haveli Puppet Museum & Gangaur Ghat Steps',
    lore: 'Famous for the traditional Rajasthani Dharohar folk dances and intricate puppet museum, Bagore Ki Haveli organizes thousands of artisan marionettes. Finding any puppet instantly requires a royal catalog index—a Hash Table. Prioritizing performance acts uses a Priority Queue (Heap).',
    concept: 'Hash Maps, Collision Resolution & Binary Heaps',
    color: '#f97316',
    icon: '🎭',
    badge: {
      id: 'badge-heap-hash',
      name: 'Gangaur Hash Master',
      icon: '🎪',
      desc: 'Mastered hash bucketing, load factors, collision chaining, and complete binary heaps • Powered By Kapil'
    },
    xpReward: 320,
    theory: {
      overview: 'A Hash Table uses a hash function to map keys to bucket indices in an array, yielding average O(1) lookups. When two keys hash to the same bucket (collision), chaining (linked lists) or open addressing (linear probing) resolves it. A Binary Heap is a complete binary tree satisfying the Heap Property (Min-Heap: Parent <= Children).',
      keyPoints: [
        'Hash Function: Must distribute keys uniformly; `index = hash(key) % capacity`.',
        'Load Factor (α = n/k): When α exceeds threshold (typically 0.75), dynamic rehashing doubles bucket count.',
        'Binary Heap Array Layout: For node at index i, LeftChild = 2i + 1, RightChild = 2i + 2, Parent = (i - 1) / 2.',
        'Extract-Min / Extract-Max takes O(log n) via sift-down; Building a heap from an array takes O(n) time.'
      ],
      complexities: {
        hashSearchAvg: 'O(1)',
        hashSearchWorst: 'O(n) [Pathological collisions]',
        heapPeek: 'O(1)',
        heapInsert: 'O(log n) [Sift-up]',
        heapExtract: 'O(log n) [Sift-down]'
      }
    },
    visualizer: {
      type: 'heap-hash',
      initialHeap: [15, 25, 30, 40, 50, 70, 90],
      algorithm: 'Min-Heap Sift-Down & Hash Table Chaining'
    },
    challenge: {
      question: 'In a Min-Heap stored as an array `[12, 24, 30, 45, 60, 55, 80]`, if you delete the root minimum element (12), which element is temporarily placed at the root before sift-down begins?',
      options: [
        'The last element in the array: 80',
        'The smallest child: 24',
        'The largest child: 30',
        'A null placeholder'
      ],
      correctIndex: 0,
      explanation: 'To maintain the complete binary tree structural property, the last leaf element (80) is moved to replace the root. Then sift-down compares 80 with its children (24 and 30) and swaps with the smaller child until heap order is restored.'
    },
    codeSnippets: {
      cpp: `// Min-Heap Priority Queue in C++
#include <queue>
using namespace std;
priority_queue<int, vector<int>, greater<int>> minHeap;
void example() {
    minHeap.push(45);
    minHeap.push(12);
    minHeap.push(30);
    int top = minHeap.top(); // 12 (O(1))
    minHeap.pop(); // O(log n)
}`,
      java: `// Top-K Frequent Elements using Min-Heap
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
    PriorityQueue<Integer> heap = new PriorityQueue<>(
        Comparator.comparingInt(count::get)
    );
    for (int n : count.keySet()) {
        heap.add(n);
        if (heap.size() > k) heap.poll();
    }
    return heap.stream().mapToInt(i -> i).toArray();
}`,
      python: `# Min-Heap operations with heapq
import heapq
data = [45, 12, 30, 80, 24]
heapq.heapify(data) # O(n) build heap
smallest = heapq.heappop(data) # 12 (O(log n))
heapq.heappush(data, 15) # O(log n)`,
      javascript: `// Hash Map Lookup & Frequency Counter
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
    return [];
}`
    }
  },
  {
    id: 8,
    key: 'lake-pichola',
    title: 'Lake Pichola & Ropeway Network',
    subtitle: 'Interconnected Waters: Graphs, BFS, DFS & Dijkstra',
    landmark: 'Karni Mata Ropeway & Pichola Ghats',
    lore: 'From Dudh Talai to Karni Mata Temple, the aerial ropeway connects ghats, islands, and hilltops across Lake Pichola. These interconnected junctions form a weighted Graph, where finding the safest and shortest route between monuments requires Dijkstra\'s and Breadth-First Search algorithms.',
    concept: 'Graph Modeling, Traversals (BFS, DFS) & Shortest Paths',
    color: '#0284c7',
    icon: '🚠',
    badge: {
      id: 'badge-graphs',
      name: 'Aravalli Network Navigator',
      icon: '🕸️',
      desc: 'Mastered adjacency graphs, BFS shortest unweighted paths, DFS cycles, and Dijkstra • Powered By Kapil'
    },
    xpReward: 340,
    theory: {
      overview: 'A Graph G = (V, E) models pairwise relationships between vertices connected by edges (directed/undirected, weighted/unweighted). BFS traverses layer-by-layer (ideal for shortest path in unweighted graphs). DFS plunges deep along branches (ideal for cycle detection and topological sorting). Dijkstra\'s algorithm finds single-source shortest paths with non-negative weights.',
      keyPoints: [
        'Representations: Adjacency List (space O(V + E), optimal for sparse graphs); Adjacency Matrix (space O(V²), instant edge check).',
        'Breadth-First Search (BFS): Uses a FIFO Queue + visited set. Time complexity: O(V + E).',
        'Depth-First Search (DFS): Uses recursion/Stack + visited set. Time complexity: O(V + E).',
        'Dijkstra\'s Shortest Path: Greedily explores minimum tentative distance node using a Min-Heap. Time complexity: O((V + E) log V).'
      ],
      complexities: {
        bfsTime: 'O(V + E)',
        dfsTime: 'O(V + E)',
        dijkstraTime: 'O((V + E) log V)',
        spaceComplexity: 'O(V) visited set / distance map'
      }
    },
    visualizer: {
      type: 'graph',
      nodes: ['SPSU', 'Fateh Sagar', 'City Palace', 'Jag Mandir', 'Sajjangarh', 'Karni Mata'],
      edges: [
        ['SPSU', 'Fateh Sagar', 20],
        ['Fateh Sagar', 'City Palace', 10],
        ['City Palace', 'Jag Mandir', 5],
        ['City Palace', 'Karni Mata', 8],
        ['Fateh Sagar', 'Sajjangarh', 15],
        ['Karni Mata', 'Jag Mandir', 7]
      ],
      algorithm: 'Dijkstra Shortest Route from SPSU to Jag Mandir'
    },
    challenge: {
      question: 'When searching for the fewest connecting boat hops between City Palace and Sajjangarh in an unweighted map of Udaipur, which algorithm is guaranteed to find the shortest path first?',
      options: [
        'Breadth-First Search (BFS) using a Queue',
        'Depth-First Search (DFS) using recursion',
        'Inorder Traversal',
        'Binary Search'
      ],
      correctIndex: 0,
      explanation: 'In an unweighted graph, Breadth-First Search explores all neighbor vertices at distance k before any vertices at distance k+1. Thus, the first time the destination vertex is visited, it is guaranteed to be via the fewest possible hops.'
    },
    codeSnippets: {
      cpp: `// Dijkstra's Shortest Path in C++
vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int src) {
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& edge : adj[u]) {
            int v = edge.first, weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `// BFS Traversal in Java
public void bfs(int start, List<List<Integer>> adj, int V) {
    boolean[] visited = new boolean[V];
    Queue<Integer> q = new LinkedList<>();
    visited[start] = true;
    q.add(start);
    while (!q.isEmpty()) {
        int u = q.poll();
        System.out.print(u + " ");
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                visited[v] = true;
                q.add(v);
            }
        }
    }
}`,
      python: `# Dijkstra's Algorithm in Python
import heapq
def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        curr_dist, u = heapq.heappop(pq)
        if curr_dist > distances[u]:
            continue
        for neighbor, weight in graph[u].items():
            dist = curr_dist + weight
            if dist < distances[neighbor]:
                distances[neighbor] = dist
                heapq.heappush(pq, (dist, neighbor))
    return distances`,
      javascript: `// BFS Graph Traversal
function bfs(graph, startNode) {
    const visited = new Set([startNode]);
    const queue = [startNode];
    const order = [];
    while (queue.length > 0) {
        const u = queue.shift();
        order.push(u);
        for (const v of graph[u] || []) {
            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
            }
        }
    }
    return order;
}`
    }
  },
  {
    id: 9,
    key: 'kumbhalgarh',
    title: 'Kumbhalgarh Fort & Aravalli Crest',
    subtitle: 'The Great Wall of India: Dynamic Programming & Greedy',
    landmark: 'Badal Mahal & 36-Kilometer Wall of Kumbhalgarh',
    lore: 'With its 36-kilometer continuous wall second only to the Great Wall of China, Kumbhalgarh was invincible. Its architects never recalculated fortifications from scratch; they preserved sub-structure reinforcements in royal architectural tablets—the absolute paradigm of Dynamic Programming memoization.',
    concept: 'Dynamic Programming & Greedy Optimization',
    color: '#d97706',
    icon: '🛡️',
    badge: {
      id: 'badge-dp',
      name: 'Kumbhalgarh Wall Strategist',
      icon: '🏰',
      desc: 'Conquered optimal substructure, overlapping subproblems, and memoized DP tables • Powered By Kapil'
    },
    xpReward: 360,
    theory: {
      overview: 'Dynamic Programming solves complex problems by breaking them into overlapping subproblems and storing subproblem solutions (Memoization / Tabulation). The two preconditions for DP are: 1) Optimal Substructure, and 2) Overlapping Subproblems. Greedy algorithms make the locally optimal choice at each step hoping for a global optimum.',
      keyPoints: [
        'Memoization (Top-Down): Recursive with a cache hash/array to avoid recomputing identical subtrees.',
        'Tabulation (Bottom-Up): Iterative table filling from base cases upward; often space-optimizable.',
        'Classic DP Archetypes: 0/1 Knapsack, Longest Common Subsequence (LCS), Coin Change, Matrix Chain Multiplication.',
        'Greedy vs DP: Greedy never reconsiders previous choices (e.g. Dijkstra, Kruskal, Huffman); DP systematically examines all options.'
      ],
      complexities: {
        knapsackDP: 'O(N × W) time and space [Pseudo-polynomial]',
        fibonacciDP: 'O(n) time, O(1) space [Optimized state variables]',
        lcsTime: 'O(m × n) time, O(m × n) space'
      }
    },
    visualizer: {
      type: 'dp',
      weights: [1, 3, 4, 5],
      values: [15, 50, 60, 90],
      capacity: 8,
      algorithm: '0/1 Knapsack Royal Fort Treasury DP Table'
    },
    challenge: {
      question: 'In the 0/1 Knapsack problem at Kumbhalgarh Fort, for an item with weight W and value V, what is the DP state transition for table entry `dp[i][w]`?',
      options: [
        '`dp[i][w] = max(dp[i-1][w], V + dp[i-1][w - W])` (if w >= W)',
        '`dp[i][w] = dp[i-1][w] + V` always',
        '`dp[i][w] = min(dp[i-1][w], dp[i][w - 1])`',
        '`dp[i][w] = dp[i-1][w / 2]`'
      ],
      correctIndex: 0,
      explanation: 'For each item, we choose between: 1) Excluding the item (value remains `dp[i-1][w]`), or 2) Including the item (gaining value V, plus the best value achievable with remaining capacity `dp[i-1][w - W]`). We take the maximum of these two decisions.'
    },
    codeSnippets: {
      cpp: `// 0/1 Knapsack in C++ (Bottom-Up DP)
int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
      java: `// Coin Change (Minimum Coins) in Java
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      python: `# Longest Increasing Subsequence
def length_of_lis(nums: list[int]) -> int:
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
      javascript: `// Climbing Stairs (Fibonacci DP)
function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`
    }
  },
  {
    id: 10,
    key: 'spsu-convocation',
    title: 'SPSU Grand Convocation Arena',
    subtitle: 'The Pinnacle: DSA Grandmaster Synthesis & Master Exam',
    landmark: 'Sir Padampat Singhania University Auditorium',
    lore: 'Having journeyed across every royal palace, tranquil lake, and fortressed mountain peak of Udaipur, learners assemble at the SPSU Grand Convocation Hall. Here, all DSA paradigms unite for the final evaluation to claim the prestigious, high-resolution verifiable SPSU DSA Certificate!',
    concept: 'Comprehensive Algorithm Synthesis & Architectural Mastery',
    color: '#854d0e',
    icon: '👑',
    badge: {
      id: 'badge-grandmaster',
      name: 'SPSU Grand DSA Architect',
      icon: '🌟',
      desc: 'Completed the Udaipur tour with SPSU Learners, achieving full DSA mastery • Powered By Kapil'
    },
    xpReward: 500,
    theory: {
      overview: 'Real-world software engineering combines multiple data structures: LRU Cache combines Hash Map + Doubly Linked List; Search Engines combine Tries + Inverted Indexes + Graph PageRank; Modern Databases combine B+ Trees + Bloom Filters + Write-Ahead Logs.',
      keyPoints: [
        'LRU Cache: O(1) get and put using Hash Map for address lookup + Doubly Linked List for recency ordering.',
        'Trie (Prefix Tree): Efficient O(L) retrieval for dictionary autocomplete and IP routing.',
        'Disjoint Set Union (Union-Find): Near-linear O(α(n)) connectivity checks with path compression and union by rank.',
        'Algorithmic Trade-offs: Choosing between time vs space, latency vs throughput, and exact vs heuristic outcomes.'
      ],
      complexities: {
        lruCache: 'O(1) get, O(1) put',
        trieSearch: 'O(Length of Key)',
        unionFind: 'O(α(N)) amortized nearly O(1)'
      }
    },
    visualizer: {
      type: 'synthesis',
      algorithm: 'LRU Cache: Hash Map + Doubly Linked List Architecture'
    },
    challenge: {
      question: 'Which hybrid data structure design allows an LRU (Least Recently Used) Cache to achieve both O(1) lookup AND O(1) eviction/update of the least recently used element?',
      options: [
        'A Hash Map paired with a Doubly Linked List',
        'A Binary Search Tree paired with a Stack',
        'A Min-Heap paired with a Queue',
        'A Dynamic Array paired with Linear Search'
      ],
      correctIndex: 0,
      explanation: 'A Hash Map gives O(1) key-to-node memory address lookup, while a Doubly Linked List allows O(1) removal and re-insertion of that node at the head (Most Recently Used) or eviction from the tail (Least Recently Used).'
    },
    codeSnippets: {
      cpp: `// LRU Cache implementation in C++
class LRUCache {
    int cap;
    list<pair<int, int>> dll; // key, val
    unordered_map<int, list<pair<int, int>>::iterator> cache;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!cache.count(key)) return -1;
        dll.splice(dll.begin(), dll, cache[key]);
        return cache[key]->second;
    }
    void put(int key, int value) {
        if (cache.count(key)) {
            cache[key]->second = value;
            dll.splice(dll.begin(), dll, cache[key]);
            return;
        }
        if (dll.size() == cap) {
            cache.erase(dll.back().first);
            dll.pop_back();
        }
        dll.emplace_front(key, value);
        cache[key] = dll.begin();
    }
};`,
      java: `// LRU Cache using LinkedHashMap in Java
class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        super.put(key, value);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
      python: `# LRU Cache using OrderedDict
from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.cap = capacity
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
      javascript: `// LRU Cache in JavaScript with Map
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}`
    }
  }
];
