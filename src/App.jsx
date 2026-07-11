import { useState, useEffect, useRef } from "react";
import { db, auth, googleProvider } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getRevisionLink } from "./data/links";

// ─── Data ────────────────────────────────────────────────────────────────────

const data = {
  sections: [
    {
      id: "dsa",
      title: "DSA — LeetCode",
      color: "#f97316",
      accent: "#fff7ed",
      border: "#fed7aa",
      categories: [
        {
          name: "Arrays & Hashing",
          priority: "🔴 Must",
          problems: [
            "Two Sum","Contains Duplicate","Valid Anagram","Group Anagrams",
            "Top K Frequent Elements","Product of Array Except Self",
            "Longest Consecutive Sequence","Encode and Decode Strings",
          ],
        },
        {
          name: "Two Pointers",
          priority: "🔴 Must",
          problems: ["Valid Palindrome","3Sum","Container With Most Water","Trapping Rain Water","Two Sum II (sorted)"],
        },
        {
          name: "Sliding Window",
          priority: "🔴 Must",
          problems: [
            "Best Time to Buy and Sell Stock",
            "Longest Substring Without Repeating Characters",
            "Longest Repeating Character Replacement",
            "Minimum Window Substring","Permutation in String",
          ],
        },
        {
          name: "Binary Search",
          priority: "🔴 Must",
          problems: [
            "Binary Search","Search a 2D Matrix","Koko Eating Bananas",
            "Find Minimum in Rotated Sorted Array","Search in Rotated Sorted Array",
          ],
        },
        {
          name: "Trees (DFS + BFS)",
          priority: "🔴 Must",
          problems: [
            "Invert Binary Tree","Maximum Depth of Binary Tree","Same Tree",
            "Subtree of Another Tree","Lowest Common Ancestor of BST",
            "Binary Tree Level Order Traversal","Validate Binary Search Tree","Kth Smallest Element in BST",
          ],
        },
        {
          name: "Stack & Queue",
          priority: "🟠 High",
          problems: ["Valid Parentheses","Min Stack","Evaluate Reverse Polish Notation","Generate Parentheses","Daily Temperatures","Car Fleet"],
        },
        {
          name: "Linked Lists",
          priority: "🟠 High",
          problems: ["Reverse Linked List","Merge Two Sorted Lists","Reorder List","Remove Nth Node From End","Linked List Cycle","LRU Cache"],
        },
        {
          name: "Backtracking",
          priority: "🟡 Medium",
          problems: ["Subsets","Combination Sum","Permutations","Word Search","Palindrome Partitioning"],
        },
        {
          name: "Dynamic Programming (basics only)",
          priority: "🟡 Medium",
          problems: ["Climbing Stairs","House Robber","Longest Common Subsequence","Coin Change","Word Break","Maximum Product Subarray"],
        },
        {
          name: "⛔ SKIP These",
          priority: "⛔ Skip",
          problems: [
            "Heavy Graph Theory (Dijkstra, Bellman-Ford)","Bit Manipulation",
            "Segment Trees / Fenwick Trees","Tries (advanced)","Math / Number Theory",
          ],
        },
      ],
    },
    {
      id: "js",
      title: "JavaScript Core",
      color: "#eab308",
      accent: "#fefce8",
      border: "#fde68a",
      categories: [
        {
          name: "Concepts (understand deeply)",
          priority: "🔴 Must",
          problems: [
            "Closures & lexical scope — memory leak edge cases",
            "Event Loop — microtasks vs macrotasks, execution order",
            "Prototypal inheritance vs class inheritance",
            "`this` keyword in arrow functions, methods, constructors",
            "Hoisting — var vs let vs const edge cases",
            "Call Stack, Heap, Web APIs",
            "Async/Await, Promises, Promise chaining",
            "Promise.all / Promise.race / Promise.allSettled / Promise.any",
            "Event delegation, bubbling, capturing",
            "Shallow copy vs deep copy",
            "Currying and partial application",
            "Memoization",
            "WeakMap / WeakSet — and why they exist",
            "Generators and iterators (light)",
          ],
        },
        {
          name: "Polyfills — Write from scratch",
          priority: "🔴 Must",
          problems: [
            "debounce(fn, delay)","throttle(fn, delay)",
            "Array.prototype.map","Array.prototype.filter","Array.prototype.reduce","Array.prototype.flat / flatMap",
            "Function.prototype.bind","Function.prototype.call","Function.prototype.apply",
            "Promise.all","Promise.race","Promise.allSettled",
            "Deep clone (structuredClone alternative)","Deep equal comparison",
            "memoize(fn)","pipe() / compose()","once(fn)","EventEmitter class (on, off, emit)",
          ],
        },
        {
          name: "ES6+ Features",
          priority: "🟠 High",
          problems: [
            "Destructuring (array + object, nested)","Spread and rest operators",
            "Optional chaining (?.) and nullish coalescing (??)","Template literals — tagged templates",
            "Modules (import/export, dynamic import)","Symbol type","Proxy and Reflect",
            "Map and Set vs plain Object/Array",
          ],
        },
      ],
    },
    {
      id: "react",
      title: "React & TypeScript",
      color: "#06b6d4",
      accent: "#ecfeff",
      border: "#a5f3fc",
      categories: [
        {
          name: "Hooks — Deep Understanding",
          priority: "🔴 Must",
          problems: [
            "useState — batching, functional updates",
            "useEffect — cleanup, dependency array pitfalls",
            "useRef — DOM refs vs mutable values",
            "useMemo — when to use, when NOT to (React 19 compiler)",
            "useCallback — same as above",
            "useContext — performance issues with large contexts",
            "useReducer — complex state management",
            "useLayoutEffect vs useEffect — timing difference",
            "useId — for accessibility",
            "useTransition and useDeferredValue — concurrent mode",
          ],
        },
        {
          name: "React 19 (New — Interviewers Ask This)",
          priority: "🔴 Must",
          problems: [
            "React Compiler — what it does, impact on useMemo/useCallback",
            "Server Components vs Client Components",
            "Server Actions","useActionState hook","useOptimistic hook",
            "use() hook — for promises and context","Form actions (native form handling)",
            "Asset loading APIs (preload, preinit)",
          ],
        },
        {
          name: "Architecture & Patterns",
          priority: "🔴 Must",
          problems: [
            "Reconciliation algorithm — how React diffs the VDOM",
            "Keys — why they matter for reconciliation",
            "Controlled vs uncontrolled components","Compound component pattern",
            "Render props pattern","Higher Order Components (HOCs)",
            "Error boundaries — when they catch, when they don't",
            "Portals — use cases","Suspense — for data fetching and lazy loading",
            "React.lazy + code splitting","Strict Mode — double invocation in dev",
          ],
        },
        {
          name: "Performance",
          priority: "🟠 High",
          problems: [
            "When does a component re-render? (4 conditions)",
            "React.memo — when it actually helps",
            "Avoiding unnecessary re-renders with state structure",
            "Virtualization — react-window / react-virtual",
            "Profiler API usage","Avoiding prop drilling patterns",
          ],
        },
        {
          name: "Custom Hooks — Build These",
          priority: "🔴 Must",
          problems: [
            "useFetch(url) — loading, error, data states","useDebounce(value, delay)",
            "useThrottle(fn, delay)","useLocalStorage(key, initial)",
            "useIntersectionObserver(ref, options)","usePrevious(value)",
            "useWindowSize()","useOnClickOutside(ref, handler)",
            "useMediaQuery(query)","useEventListener(event, handler)",
          ],
        },
        {
          name: "TypeScript",
          priority: "🟠 High",
          problems: [
            "Generic types — functions, components, hooks",
            "Utility types — Partial, Required, Pick, Omit, Record, Readonly",
            "Type vs Interface — when to use each","Discriminated unions",
            "Type narrowing and type guards","infer keyword in conditional types",
            "React-specific types — FC, ReactNode, ReactElement, HTMLAttributes",
            "keyof and typeof operators","Mapped types","Template literal types",
          ],
        },
      ],
    },
    {
      id: "lld",
      title: "LLD — Machine Coding",
      color: "#8b5cf6",
      accent: "#f5f3ff",
      border: "#ddd6fe",
      categories: [
        {
          name: "UI Components — Build in React",
          priority: "🔴 Must",
          problems: [
            "Typeahead / Autocomplete with debounce + keyboard nav",
            "Infinite Scroll with IntersectionObserver",
            "Virtualized List (render 10k+ items efficiently)",
            "Drag and Drop (without libraries)","Multi-step form with validation and progress",
            "Toast / Notification system (queue, auto-dismiss)",
            "Modal with focus trap and ESC close","Accordion / Nested Accordion",
            "Star Rating component","File Explorer tree (expand/collapse)",
            "Kanban Board (columns + drag cards)","Tabs component — compound pattern",
            "Date Picker","OTP Input component",
          ],
        },
        {
          name: "Utility / Logic Problems",
          priority: "🔴 Must",
          problems: [
            "Implement debounce from scratch in JS","Implement throttle from scratch in JS",
            "Build a Publish-Subscribe (EventEmitter) system","Implement a Promise from scratch",
            "Build a custom routing system (like React Router basics)",
            "Implement localStorage with expiry","Build a simple state management (like mini Redux)",
            "Implement rate limiter for API calls","Deep merge two objects",
            "Flatten deeply nested object","Build a retry mechanism for async functions",
          ],
        },
        {
          name: "What interviewers check",
          priority: "📋 Checklist",
          problems: [
            "Handles edge cases (empty state, error state, loading)",
            "Accessibility — keyboard navigation, ARIA labels",
            "No memory leaks — cleanups in useEffect",
            "Debounced inputs to avoid performance hits",
            "Component is reusable and accepts props cleanly",
            "Code is split into logical components, not monolithic",
            "TypeScript types are correct and non-trivial",
            "Performance — no unnecessary re-renders",
          ],
        },
      ],
    },
    {
      id: "hld",
      title: "HLD — Frontend System Design",
      color: "#10b981",
      accent: "#ecfdf5",
      border: "#a7f3d0",
      categories: [
        {
          name: "Framework — RADIO",
          priority: "📋 Framework",
          problems: [
            "R — Requirements exploration (clarify scope first)",
            "A — Architecture / high-level design (components + data flow)",
            "D — Data model (what data exists, where it lives)",
            "I — Interface design (APIs between components)",
            "O — Optimizations (performance, caching, scale)",
          ],
        },
        {
          name: "Core Concepts to Master",
          priority: "🔴 Must",
          problems: [
            "CSR vs SSR vs SSG vs ISR — tradeoffs and when to use",
            "CDN — how it works, cache-control headers","Lazy loading — images, routes, components",
            "Code splitting — route-based and component-based",
            "Bundle optimization — tree shaking, chunk size",
            "Core Web Vitals — LCP, FID/INP, CLS — how to improve each",
            "State management architecture — local vs global vs server state",
            "Optimistic UI updates",
            "Real-time: WebSockets vs SSE vs Long Polling — tradeoffs",
            "API design — REST vs GraphQL from frontend perspective",
            "Auth — JWT, cookies, session, OAuth flow",
            "Security — XSS, CSRF, Content-Security-Policy",
            "Accessibility at scale — ARIA, screen readers, keyboard nav",
            "Internationalization (i18n) — RTL, date/number formatting",
            "Error handling strategies — error boundaries, fallbacks",
            "Offline support — Service Workers, IndexedDB",
          ],
        },
        {
          name: "Design Problems — Practice These",
          priority: "🔴 Must",
          problems: [
            "Design YouTube frontend (feed, video player, comments)",
            "Design Google Docs collaborative editor",
            "Design Twitter/X feed with infinite scroll",
            "Design a Notification system",
            "Design an e-commerce product listing page at scale",
            "Design a Design System / Component Library",
            "Design a Chat Application (WhatsApp/Slack UI)",
            "Design Google Maps frontend",
            "Design a Dashboard with real-time data",
            "Design a File Upload system with progress",
          ],
        },
      ],
    },
    {
      id: "browser",
      title: "Browser & Web Fundamentals",
      color: "#ef4444",
      accent: "#fef2f2",
      border: "#fecaca",
      categories: [
        {
          name: "Browser Internals",
          priority: "🟠 High",
          problems: [
            "Critical Rendering Path — HTML → DOM → CSSOM → Render Tree → Paint",
            "Reflow vs Repaint — what triggers each","How to avoid layout thrashing",
            "requestAnimationFrame — when and why to use",
            "Browser storage — cookies vs localStorage vs sessionStorage vs IndexedDB",
            "HTTP/1.1 vs HTTP/2 vs HTTP/3 — differences",
            "CORS — how it works, preflight requests",
            "Caching — Cache-Control, ETag, Last-Modified",
            "Service Workers — caching strategies",
            "Web Workers — offloading heavy computation",
          ],
        },
        {
          name: "CSS Must-Knows",
          priority: "🟠 High",
          problems: [
            "Flexbox — all properties, common layouts",
            "CSS Grid — template areas, auto-fill vs auto-fit",
            "Specificity — calculation rules","Box model — box-sizing: border-box",
            "Stacking context — z-index rules","CSS custom properties (variables)",
            "Animations — transition vs animation vs Web Animations API",
            "Responsive design — media queries, container queries",
            "CSS Modules vs CSS-in-JS vs Tailwind — tradeoffs","BEM methodology",
          ],
        },
        {
          name: "HTML & Accessibility",
          priority: "🟡 Medium",
          problems: [
            "Semantic HTML — why it matters for SEO and a11y",
            "ARIA roles, labels, descriptions","Focus management — tabIndex, focus trapping",
            "Form accessibility — labels, fieldset, legend",
            "Image accessibility — alt text rules","Keyboard navigation patterns",
          ],
        },
      ],
    },
    {
      id: "behavioral",
      title: "Behavioural / HR Round",
      color: "#64748b",
      accent: "#f8fafc",
      border: "#cbd5e1",
      categories: [
        {
          name: "STAR Stories — Prepare 5 Real Ones",
          priority: "🔴 Must",
          problems: [
            "A performance issue you identified and fixed (with numbers)",
            "A feature you owned end-to-end from design to deployment",
            "A conflict with a teammate or manager — how you resolved it",
            "A time you pushed back on a product/design decision with reasoning",
            "A mistake you made and what you learned",
          ],
        },
        {
          name: "Questions They Always Ask",
          priority: "🔴 Must",
          problems: [
            "Why do you want to leave your current company?",
            "Where do you see yourself in 3 years?",
            "Tell me about your most complex frontend project",
            "How do you keep up with new technologies?",
            "How do you handle a deadline you can't meet?",
            "Describe how you work with designers and backend engineers",
          ],
        },
      ],
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const priorityColors = {
  "🔴 Must": { bg: "#fef2f2", text: "#dc2626", border: "#fca5a5" },
  "🟠 High": { bg: "#fff7ed", text: "#ea580c", border: "#fdba74" },
  "🟡 Medium": { bg: "#fefce8", text: "#ca8a04", border: "#fde047" },
  "⛔ Skip": { bg: "#f9fafb", text: "#6b7280", border: "#d1d5db" },
  "📋 Framework": { bg: "#eff6ff", text: "#2563eb", border: "#93c5fd" },
  "📋 Checklist": { bg: "#eff6ff", text: "#2563eb", border: "#93c5fd" },
};

const today = () => new Date().toISOString().split("T")[0];

const resolveKey = (key) => {
  const parts = key.split("-");
  // sectionId may contain hyphens? No — all section ids are single words: dsa, js, react, lld, hld, browser, behavioral
  // key format: "sectionId-catIndex-probIndex"
  const pi = Number(parts[parts.length - 1]);
  const ci = Number(parts[parts.length - 2]);
  const sid = parts.slice(0, parts.length - 2).join("-");
  const section = data.sections.find((s) => s.id === sid);
  const cat = section?.categories[ci];
  const problem = cat?.problems[pi];
  return { sectionId: sid, sectionTitle: section?.title, categoryName: cat?.name, problemName: problem, sectionColor: section?.color };
};

const createRevisionEntry = (todayStr) => {
  const nextDue = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  return { interval: 1, nextDue, lastReviewed: todayStr, reviewCount: 0, lastRating: null };
};

const applyRating = (entry, rating, todayStr) => {
  let interval = entry.interval;
  if (rating === "Easy")   interval = Math.min(60, Math.ceil(interval * 1.75));
  if (rating === "Good")   interval = Math.min(60, Math.ceil(interval * 1.15));
  if (rating === "Hard")   interval = Math.max(1,  Math.ceil(interval * 0.9));
  if (rating === "Forgot") interval = 1;
  const nextDue = new Date(Date.now() + interval * 86400000).toISOString().split("T")[0];
  return { interval, nextDue, lastReviewed: todayStr, reviewCount: (entry.reviewCount || 0) + 1, lastRating: rating };
};

// ─── ReviseRow ────────────────────────────────────────────────────────────────

const RATING_BUTTONS = [
  { label: "Easy",   color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
  { label: "Good",   color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Hard",   color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
  { label: "Forgot", color: "#ef4444", bg: "#fef2f2", border: "#fecaca" },
];

function ReviseRow({ problemKey, revision, onRate, onRestore }) {
  const { sectionId, sectionTitle, categoryName, problemName, sectionColor } = resolveKey(problemKey);
  const link = getRevisionLink(sectionId, problemName);

  const [revealed, setRevealed] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const handleCheck = () => {
    if (!selectedRating || confirmed) return;
    setSnapshot(revision);
    onRate(problemKey, selectedRating);
    setConfirmed(true);
  };

  const handleUncheck = () => {
    if (snapshot) onRestore(problemKey, snapshot);
    setSelectedRating(null);
    setConfirmed(false);
    setSnapshot(null);
  };

  return (
    <div style={{
      background: confirmed ? "#f0fdf4" : "#fff",
      border: "1.5px solid #e5e7eb",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      transition: "background 0.15s",
    }}>
      <div style={{ padding: "14px 16px" }}>
        {/* Row header: checkbox + problem text */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          {/* Custom checkbox */}
          <div
            onClick={confirmed ? handleUncheck : (selectedRating ? handleCheck : undefined)}
            style={{
              width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 2,
              border: confirmed ? `2px solid ${sectionColor}` : `2px solid ${selectedRating ? "#f59e0b" : "#d1d5db"}`,
              background: confirmed ? sectionColor : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: selectedRating || confirmed ? "pointer" : "not-allowed",
              opacity: !selectedRating && !confirmed ? 0.45 : 1,
              transition: "all 0.15s",
            }}
          >
            {confirmed && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
          </div>

          <div style={{ flex: 1 }}>
            <span style={{
              fontSize: 13.5, lineHeight: 1.5, fontWeight: confirmed ? 400 : 500,
              color: confirmed ? "#6b7280" : "#1f2937",
              textDecoration: confirmed ? "line-through" : "none",
            }}>
              {problemName}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: confirmed ? 0 : 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
            background: sectionColor + "22", color: sectionColor, border: `1px solid ${sectionColor}44`,
          }}>
            {sectionTitle} · {categoryName}
          </span>
          <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 99, background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
            ×{revision?.reviewCount || 0} reviewed
          </span>
          {revision?.nextDue && (
            <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 99, background: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" }}>
              due {revision.nextDue}
            </span>
          )}
        </div>

        {/* Confirmed state */}
        {confirmed && (
          <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6b7280" }}>Done for today</p>
        )}

        {/* Reveal / rating area — hidden when confirmed */}
        {!confirmed && (
          <>
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                style={{
                  marginTop: 2, padding: "5px 12px", borderRadius: 8,
                  border: "1.5px solid #e5e7eb", background: "#f9fafb",
                  fontSize: 12, fontWeight: 600, color: "#374151",
                  fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f9fafb"; }}
              >
                Reveal →
              </button>
            ) : (
              <div>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block", marginBottom: 10,
                      fontSize: 12, fontWeight: 600, color: "#3b82f6",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                  >
                    Open reference ↗
                  </a>
                )}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {RATING_BUTTONS.map(({ label, color, bg, border }) => {
                    const isSelected = selectedRating === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setSelectedRating(label)}
                        style={{
                          padding: "6px 14px", borderRadius: 8,
                          border: `1.5px solid ${isSelected ? color : border}`,
                          background: isSelected ? color : bg,
                          color: isSelected ? "#fff" : color,
                          fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                          cursor: "pointer", transition: "all 0.15s",
                          opacity: selectedRating && !isSelected ? 0.45 : 1,
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── ReviseView ───────────────────────────────────────────────────────────────

function ReviseView({ dueKeys, revisions, onRate, onRestore }) {
  if (dueKeys.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", color: "#6b7280" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <p style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: "0 0 6px" }}>All caught up!</p>
        <p style={{ fontSize: 14, margin: 0 }}>Nothing due for revision today.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>
        {dueKeys.length} problem{dueKeys.length !== 1 ? "s" : ""} due today
      </p>
      {dueKeys.map((key) => (
        <ReviseRow
          key={key}
          problemKey={key}
          revision={revisions[key]}
          onRate={onRate}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [checked, setChecked] = useState({});
  const [revisions, setRevisions] = useState({});
  const [activeSection, setActiveSection] = useState("dsa");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [status, setStatus] = useState("loading"); // loading | ready | saving | error
  const saveTimer = useRef(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (!firebaseUser) {
        setChecked({});
        setRevisions({});
        setStatus("loading");
      }
    });
    return () => unsubscribe();
  }, []);

  // Load progress from Firestore when user signs in
  useEffect(() => {
    if (!user) return;
    setStatus("loading");
    (async () => {
      try {
        const ref = doc(db, "progress", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setChecked(snap.data().checked || {});
          setRevisions(snap.data().revisions || {});
        }
        setStatus("ready");
      } catch (e) {
        console.error("Failed to load progress:", e);
        setStatus("error");
      }
    })();
  }, [user]);

  // Debounced save to Firestore whenever checked or revisions change
  useEffect(() => {
    if (status === "loading" || !user) return;
    clearTimeout(saveTimer.current);
    setStatus("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        const ref = doc(db, "progress", user.uid);
        await setDoc(ref, { checked, revisions, updatedAt: new Date().toISOString() });
        setStatus("ready");
      } catch (e) {
        console.error("Failed to save:", e);
        setStatus("error");
      }
    }, 1000);
  }, [checked, revisions, user]);

  const toggle = (id) => {
    setChecked((prev) => {
      const wasUnchecked = !prev[id];
      if (wasUnchecked) {
        setRevisions((prevRev) => {
          if (!prevRev[id]) {
            return { ...prevRev, [id]: createRevisionEntry(today()) };
          }
          return prevRev;
        });
      }
      return { ...prev, [id]: !prev[id] };
    });
  };

  const rateRevision = (key, rating) => {
    setRevisions((prev) => {
      const entry = prev[key] || { interval: 1, reviewCount: 0 };
      return { ...prev, [key]: applyRating(entry, rating, today()) };
    });
  };

  const restoreRevision = (key, entry) => {
    setRevisions((prev) => ({ ...prev, [key]: entry }));
  };

  const toggleCategory = (id) =>
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalProblems = data.sections.flatMap((s) =>
    s.categories.flatMap((c) => c.problems)
  ).length;

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalProblems) * 100);

  const todayStr = today();
  const dueKeys = Object.entries(revisions)
    .filter(([, v]) => v.nextDue <= todayStr)
    .sort(([, a], [, b]) => a.nextDue.localeCompare(b.nextDue))
    .map(([k]) => k);
  const dueCount = dueKeys.length;

  const activeData = data.sections.find((s) => s.id === activeSection);

  const statusLabel = {
    loading: "⏳ Loading your progress...",
    ready: "✓ Progress saved to Firebase",
    saving: "💾 Saving...",
    error: "⚠️ Save failed — check Firebase config",
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafaf9", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <p style={{ fontSize: 15 }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111827", fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ background: "#1f2937", borderRadius: 16, padding: "48px 40px", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", maxWidth: 400, width: "100%", margin: "0 16px" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#374151", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, color: "#fff" }}>
            ✓
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Frontend Interview Prep</h1>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "0 0 32px" }}>Sign in to save your progress across devices</p>
          <button
            onClick={() => signInWithPopup(auth, googleProvider).catch(console.error)}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, fontFamily: "inherit", color: "#111827", background: "#fff", border: "none", borderRadius: 10, cursor: "pointer", transition: "all 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafaf9", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <p style={{ fontSize: 15 }}>Loading your saved progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#fafaf9" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#111827", padding: "28px 24px 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ color: "#9ca3af", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>Frontend Interview Prep</p>
              <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>Complete Topic Checklist</h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{progress}%</div>
              <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>{checkedCount}/{totalProblems} done</div>
              <button
                onClick={() => signOut(auth)}
                style={{ fontSize: 11, color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", marginTop: 4, padding: 0 }}
              >
                Sign out ({user.displayName?.split(" ")[0] || user.email})
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 16, background: "#1f2937", borderRadius: 99, height: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #06b6d4)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>

          {/* Status bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: status === "error" ? "#f87171" : "#4b5563" }}>
              {statusLabel[status]}
            </span>
            {checkedCount > 0 && (
              <button
                onClick={() => { if (window.confirm("Reset all progress? This cannot be undone.")) { setChecked({}); setRevisions({}); } }}
                style={{ fontSize: 11, color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
              >
                Reset progress
              </button>
            )}
          </div>

          {/* Section tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
            {/* Revise tab — pinned first */}
            <button
              onClick={() => setActiveSection("revise")}
              style={{
                padding: "5px 12px", borderRadius: 99, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 0.15s",
                background: activeSection === "revise" ? "#f59e0b" : "#1f2937",
                color: activeSection === "revise" ? "#fff" : dueCount > 0 ? "#f59e0b" : "#4b5563",
                opacity: dueCount === 0 && activeSection !== "revise" ? 0.6 : 1,
              }}
            >
              📅 Revise{dueCount > 0 ? ` (${dueCount})` : ""}
            </button>

            {data.sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  padding: "5px 12px", borderRadius: 99, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 0.15s",
                  background: activeSection === s.id ? s.color : "#1f2937",
                  color: activeSection === s.id ? "#fff" : "#9ca3af",
                }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {activeSection === "revise" ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" }}>Spaced Repetition Review</h2>
            </div>
            <ReviseView
              dueKeys={dueKeys}
              revisions={revisions}
              onRate={rateRevision}
              onRestore={restoreRevision}
            />
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: activeData.color }} />
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" }}>{activeData.title}</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeData.categories.map((cat, ci) => {
                const catKey = `${activeData.id}-${ci}`;
                const isExpanded = expandedCategories[catKey] !== false;
                const pStyle = priorityColors[cat.priority] || priorityColors["🟡 Medium"];
                const catChecked = cat.problems.filter((_, pi) => checked[`${activeData.id}-${ci}-${pi}`]).length;

                return (
                  <div key={ci} style={{ background: "#fff", border: `1.5px solid ${activeData.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <button
                      onClick={() => toggleCategory(catKey)}
                      style={{ width: "100%", padding: "14px 16px", background: activeData.accent, border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, fontFamily: "inherit" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", textAlign: "left" }}>{cat.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: pStyle.bg, color: pStyle.text, border: `1px solid ${pStyle.border}` }}>{cat.priority}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>{catChecked}/{cat.problems.length}</span>
                        <span style={{ color: "#9ca3af", fontSize: 16, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "block" }}>▾</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div style={{ padding: "8px 0" }}>
                        {cat.problems.map((problem, pi) => {
                          const key = `${activeData.id}-${ci}-${pi}`;
                          const done = !!checked[key];
                          return (
                            <label key={pi} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 16px", cursor: "pointer", background: done ? "#f0fdf4" : "transparent", transition: "background 0.15s" }}>
                              <div
                                onClick={() => toggle(key)}
                                style={{ width: 18, height: 18, borderRadius: 5, border: done ? `2px solid ${activeData.color}` : "2px solid #d1d5db", background: done ? activeData.color : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.15s", cursor: "pointer" }}
                              >
                                {done && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                              </div>
                              <span
                                onClick={() => toggle(key)}
                                style={{ fontSize: 13.5, color: done ? "#6b7280" : "#1f2937", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 500 }}
                              >
                                {problem}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
