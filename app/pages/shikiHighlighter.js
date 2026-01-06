// Shiki highlighter module for browser-side syntax highlighting
// Handles async initialization and provides sync-like interface for markdown-it

let highlighter = null;
let highlighterPromise = null;

// Theme mapping from mkdp_theme values
const THEMES = {
  dark: 'monokai',
  light: 'github-light'
};

// Languages to preload (common ones)
const LANGUAGES = [
  'python', 'javascript', 'typescript', 'bash', 'shell',
  'rust', 'lua', 'yaml', 'json', 'toml', 'markdown',
  'c', 'cpp', 'java', 'go', 'ruby', 'html', 'css', 'sql',
  'tsx', 'jsx', 'vim', 'diff', 'dockerfile'
];

// Language alias mapping
const LANG_ALIASES = {
  'sh': 'bash',
  'zsh': 'bash',
  'js': 'javascript',
  'ts': 'typescript',
  'py': 'python',
  'rb': 'ruby',
  'yml': 'yaml',
  'md': 'markdown',
  'c++': 'cpp',
  'objective-c': 'objc',
  'objectivec': 'objc',
  'text': 'plaintext',
  'txt': 'plaintext'
};

/**
 * Get the Shiki theme name for a given mode
 * @param {string} mode - 'dark' or 'light'
 * @returns {string} Shiki theme name
 */
export function getThemeForMode(mode) {
  return THEMES[mode] || THEMES.dark;
}

/**
 * Initialize the Shiki highlighter asynchronously
 * @returns {Promise} Resolves when highlighter is ready
 */
export async function initHighlighter() {
  if (highlighter) return highlighter;
  if (highlighterPromise) return highlighterPromise;

  highlighterPromise = (async () => {
    try {
      // Dynamic import for code splitting
      const { createHighlighter } = await import('shiki/bundle/web');
      highlighter = await createHighlighter({
        themes: Object.values(THEMES),
        langs: LANGUAGES
      });
      console.log('Shiki highlighter initialized');
      return highlighter;
    } catch (e) {
      console.error('Failed to initialize Shiki:', e);
      throw e;
    }
  })();

  return highlighterPromise;
}

/**
 * Normalize language identifier
 * @param {string} lang - Language identifier from code fence
 * @returns {string|null} Normalized language name or null
 */
export function normalizeLang(lang) {
  if (!lang) return null;
  const normalized = lang.toLowerCase().trim();
  return LANG_ALIASES[normalized] || normalized;
}

/**
 * Check if the highlighter is ready
 * @returns {boolean}
 */
export function isReady() {
  return highlighter !== null;
}

/**
 * Get list of loaded languages
 * @returns {string[]}
 */
export function getLoadedLanguages() {
  if (!highlighter) return [];
  return highlighter.getLoadedLanguages();
}

/**
 * Highlight code synchronously (only works after init)
 * @param {string} code - Source code to highlight
 * @param {string} lang - Language identifier
 * @param {string} theme - Shiki theme name (default: 'monokai')
 * @returns {string|null} Highlighted HTML or null if not possible
 */
export function highlightCode(code, lang, theme = 'monokai') {
  if (!highlighter) {
    console.warn('Shiki highlighter not ready');
    return null;
  }

  const normalizedLang = normalizeLang(lang);

  // Check if language is supported
  const loadedLangs = highlighter.getLoadedLanguages();
  if (!normalizedLang || !loadedLangs.includes(normalizedLang)) {
    // Language not supported, return null to indicate fallback
    return null;
  }

  try {
    return highlighter.codeToHtml(code, {
      lang: normalizedLang,
      theme: theme
    });
  } catch (e) {
    console.error('Shiki highlighting error:', e);
    return null;
  }
}
