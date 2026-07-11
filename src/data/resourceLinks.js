// Maps problem name -> reference doc URL, for sections where a real doc exists.
// Any problem NOT in this map falls back to self-rate-only (no reveal link) —
// this covers LLD build problems, HLD design problems, and Behavioral automatically.
// Keys must match problem text exactly as it appears in your data file.

export const resourceLinks = {
  // ---- JS Core: Concepts ----
  "Closures & lexical scope — memory leak edge cases": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
  "Event Loop — microtasks vs macrotasks, execution order": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
  "Prototypal inheritance vs class inheritance": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain",
  "`this` keyword in arrow functions, methods, constructors": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
  "Hoisting — var vs let vs const edge cases": "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
  "Call Stack, Heap, Web APIs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
  "Async/Await, Promises, Promise chaining": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
  "Promise.all / Promise.race / Promise.allSettled / Promise.any": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  "Event delegation, bubbling, capturing": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling",
  "Shallow copy vs deep copy": "https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy",
  "Memoization": "https://developer.mozilla.org/en-US/docs/Glossary/Memoization",
  "WeakMap / WeakSet — and why they exist": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
  "Generators and iterators (light)": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators",

  // ---- JS Core: Polyfills (linked to the native method they replicate) ----
  "Array.prototype.map": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
  "Array.prototype.filter": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
  "Array.prototype.reduce": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
  "Array.prototype.flat / flatMap": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
  "Function.prototype.bind": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
  "Function.prototype.call": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call",
  "Function.prototype.apply": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply",
  "Promise.all": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
  "Promise.race": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race",
  "Promise.allSettled": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled",
  "Deep clone (structuredClone alternative)": "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",

  // ---- ES6+ Features ----
  "Destructuring (array + object, nested)": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
  "Spread and rest operators": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
  "Optional chaining (?.) and nullish coalescing (??)": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
  "Template literals — tagged templates": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
  "Modules (import/export, dynamic import)": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
  "Symbol type": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  "Proxy and Reflect": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
  "Map and Set vs plain Object/Array": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",

  // ---- React Hooks ----
  "useState — batching, functional updates": "https://react.dev/reference/react/useState",
  "useEffect — cleanup, dependency array pitfalls": "https://react.dev/reference/react/useEffect",
  "useRef — DOM refs vs mutable values": "https://react.dev/reference/react/useRef",
  "useMemo — when to use, when NOT to (React 19 compiler)": "https://react.dev/reference/react/useMemo",
  "useCallback — same as above": "https://react.dev/reference/react/useCallback",
  "useContext — performance issues with large contexts": "https://react.dev/reference/react/useContext",
  "useReducer — complex state management": "https://react.dev/reference/react/useReducer",
  "useLayoutEffect vs useEffect — timing difference": "https://react.dev/reference/react/useLayoutEffect",
  "useId — for accessibility": "https://react.dev/reference/react/useId",
  "useTransition and useDeferredValue — concurrent mode": "https://react.dev/reference/react/useTransition",

  // ---- React 19 ----
  "Server Components vs Client Components": "https://react.dev/reference/rsc/server-components",
  "Server Actions": "https://react.dev/reference/rsc/server-functions",
  "useActionState hook": "https://react.dev/reference/react/useActionState",
  "useOptimistic hook": "https://react.dev/reference/react/useOptimistic",
  "use() hook — for promises and context": "https://react.dev/reference/react/use",

  // ---- Architecture & Patterns ----
  "Controlled vs uncontrolled components": "https://react.dev/learn/sharing-state-between-components",
  "Error boundaries — when they catch, when they don't": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "Portals — use cases": "https://react.dev/reference/react-dom/createPortal",
  "Suspense — for data fetching and lazy loading": "https://react.dev/reference/react/Suspense",
  "React.lazy + code splitting": "https://react.dev/reference/react/lazy",
  "Strict Mode — double invocation in dev": "https://react.dev/reference/react/StrictMode",

  // ---- Performance ----
  "React.memo — when it actually helps": "https://react.dev/reference/react/memo",

  // ---- TypeScript ----
  "Generic types — functions, components, hooks": "https://www.typescriptlang.org/docs/handbook/2/generics.html",
  "Utility types — Partial, Required, Pick, Omit, Record, Readonly": "https://www.typescriptlang.org/docs/handbook/utility-types.html",
  "Type vs Interface — when to use each": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
  "Discriminated unions": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
  "Type narrowing and type guards": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
  "infer keyword in conditional types": "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
  "keyof and typeof operators": "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html",
  "Mapped types": "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
  "Template literal types": "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",

  // ---- Browser Internals ----
  "Critical Rendering Path — HTML → DOM → CSSOM → Render Tree → Paint": "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path",
  "Reflow vs Repaint — what triggers each": "https://developer.mozilla.org/en-US/docs/Glossary/Reflow",
  "requestAnimationFrame — when and why to use": "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame",
  "Browser storage — cookies vs localStorage vs sessionStorage vs IndexedDB": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
  "HTTP/1.1 vs HTTP/2 vs HTTP/3 — differences": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP",
  "CORS — how it works, preflight requests": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
  "Caching — Cache-Control, ETag, Last-Modified": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
  "Service Workers — caching strategies": "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
  "Web Workers — offloading heavy computation": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API",

  // ---- CSS ----
  "Flexbox — all properties, common layouts": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
  "CSS Grid — template areas, auto-fill vs auto-fit": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
  "Specificity — calculation rules": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity",
  "Box model — box-sizing: border-box": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_sizing/Box_sizing",
  "Stacking context — z-index rules": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context",
  "CSS custom properties (variables)": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables",
  "Animations — transition vs animation vs Web Animations API": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API",
  "Responsive design — media queries, container queries": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",

  // ---- HTML & Accessibility ----
  "Semantic HTML — why it matters for SEO and a11y": "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
  "ARIA roles, labels, descriptions": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
  "Focus management — tabIndex, focus trapping": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex",
  "Form accessibility — labels, fieldset, legend": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML",
  "Image accessibility — alt text rules": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#accessibility_concerns",
};
