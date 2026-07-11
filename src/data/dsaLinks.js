// NeetCode solution page for each DSA problem: https://neetcode.io/solutions/<slug>
// Verify the ⚠️-flagged ones by opening the link once — their slugs are less certain
// than the rest (which follow NeetCode's standard, predictable naming).

export const dsaLinks = {
  "Two Sum": "two-sum",
  "Contains Duplicate": "contains-duplicate",
  "Valid Anagram": "valid-anagram",
  "Group Anagrams": "group-anagrams",
  "Top K Frequent Elements": "top-k-frequent-elements",
  "Product of Array Except Self": "product-of-array-except-self",
  "Longest Consecutive Sequence": "longest-consecutive-sequence",
  "Encode and Decode Strings": "encode-and-decode-strings", // ⚠️ verify
  "Valid Palindrome": "valid-palindrome",
  "3Sum": "3sum",
  "Container With Most Water": "container-with-most-water",
  "Trapping Rain Water": "trapping-rain-water",
  "Two Sum II (sorted)": "two-sum-ii-input-array-is-sorted", // ⚠️ verify
  "Best Time to Buy and Sell Stock": "best-time-to-buy-and-sell-stock",
  "Longest Substring Without Repeating Characters": "longest-substring-without-repeating-characters",
  "Longest Repeating Character Replacement": "longest-repeating-character-replacement",
  "Minimum Window Substring": "minimum-window-substring",
  "Permutation in String": "permutation-in-string",
  "Binary Search": "binary-search",
  "Search a 2D Matrix": "search-a-2d-matrix",
  "Koko Eating Bananas": "koko-eating-bananas",
  "Find Minimum in Rotated Sorted Array": "find-minimum-in-rotated-sorted-array",
  "Search in Rotated Sorted Array": "search-in-rotated-sorted-array",
  "Invert Binary Tree": "invert-binary-tree",
  "Maximum Depth of Binary Tree": "maximum-depth-of-binary-tree",
  "Same Tree": "same-tree",
  "Subtree of Another Tree": "subtree-of-another-tree",
  "Lowest Common Ancestor of BST": "lowest-common-ancestor-of-a-binary-search-tree", // ⚠️ verify
  "Binary Tree Level Order Traversal": "binary-tree-level-order-traversal",
  "Validate Binary Search Tree": "validate-binary-search-tree",
  "Kth Smallest Element in BST": "kth-smallest-element-in-a-bst", // ⚠️ verify
  "Valid Parentheses": "valid-parentheses",
  "Min Stack": "min-stack",
  "Evaluate Reverse Polish Notation": "evaluate-reverse-polish-notation",
  "Generate Parentheses": "generate-parentheses",
  "Daily Temperatures": "daily-temperatures",
  "Car Fleet": "car-fleet",
  "Reverse Linked List": "reverse-linked-list",
  "Merge Two Sorted Lists": "merge-two-sorted-lists",
  "Reorder List": "reorder-list",
  "Remove Nth Node From End": "remove-nth-node-from-end-of-list", // ⚠️ verify
  "Linked List Cycle": "linked-list-cycle",
  "LRU Cache": "lru-cache",
  "Subsets": "subsets",
  "Combination Sum": "combination-sum",
  "Permutations": "permutations",
  "Word Search": "word-search",
  "Palindrome Partitioning": "palindrome-partitioning",
  "Climbing Stairs": "climbing-stairs",
  "House Robber": "house-robber",
  "Longest Common Subsequence": "longest-common-subsequence",
  "Coin Change": "coin-change",
  "Word Break": "word-break",
  "Maximum Product Subarray": "maximum-product-subarray",
};

export const neetcodeUrl = (problemName) => {
  const slug = dsaLinks[problemName];
  return slug ? `https://neetcode.io/solutions/${slug}` : null;
};
