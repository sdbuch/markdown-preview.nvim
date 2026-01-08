// KaTeX macros converted from MathJax configuration
// Source: sdbuch.github.io/_includes/scripts/mathjax.html

export function generateKatexMacros() {
  const macros = {};

  // Generate BB letters: \bbA through \bbZ
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    macros[`\\bb${letter}`] = `\\mathbb{${letter}}`;
  }

  // Generate script letters: \cA through \cZ
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    macros[`\\c${letter}`] = `\\mathscr{${letter}}`;
  }

  // Generate calligraphic letters: \sA through \sZ
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    macros[`\\s${letter}`] = `\\mathcal{${letter}}`;
  }

  // Generate vector uppercase letters: \vA through \vZ
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    macros[`\\v${letter}`] = `\\boldsymbol{${letter}}`;
  }

  // Generate vector lowercase letters: \va through \vz
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    macros[`\\v${letter}`] = `\\boldsymbol{${letter}}`;
  }

  // Greek letters for vectors
  const greekLetters = [
    'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta',
    'theta', 'vartheta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi',
    'pi', 'varpi', 'rho', 'varrho', 'sigma', 'varsigma', 'tau', 'upsilon',
    'phi', 'varphi', 'chi', 'psi', 'omega', 'Gamma', 'Delta', 'Theta',
    'Lambda', 'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega', 'ell'
  ];
  greekLetters.forEach(letter => {
    macros[`\\v${letter}`] = `\\boldsymbol{\\${letter}}`;
  });

  // Basic macros
  Object.assign(macros, {
    "\\Beta": "\\mathrm{B}",
    "\\eps": "\\epsilon",
    "\\Diff": "\\mathop{}\\!\\mathrm{D}",
    "\\diff": "\\mathop{}\\!\\mathrm{d}",
    "\\Partial": "\\frac{\\partial #1}{\\partial #2}",
    "\\PartialN": "\\frac{\\partial^{#3} #1}{\\partial {#2}^{#3}}",
    "\\dPartial": "\\dfrac{\\partial #1}{\\partial #2}",
    "\\PPartial": "\\tfrac{\\partial}{\\partial #1}",
    "\\dac": "\\left.\\frac{\\partial}{\\partial t}\\right|_{t=0}",
    "\\half": "\\tfrac{1}{2}",
    "\\third": "\\tfrac{1}{3}",
    "\\fourth": "\\tfrac{1}{4}",
    "\\sixth": "\\tfrac{1}{6}",
    "\\eighth": "\\tfrac{1}{8}",

    // Accents and decorations
    "\\overbar": "\\mkern 1.5mu\\overline{\\mkern-1.5mu#1\\mkern-1.5mu}\\mkern 1.5mu",
    "\\underbar": "\\mkern 1.5mu\\underline{\\mkern-1.5mu#1\\mkern-1.5mu}\\mkern 1.5mu",
    "\\conj": "\\overbar{#1}",
    "\\wh": "\\widehat{#1}",
    "\\wt": "\\widetilde{#1}",
    "\\ol": "\\overbar{#1}",
    "\\kron": "\\otimes",
    "\\elwise": "\\odot",
    "\\dsum": "\\oplus",
    "\\spcdot": "\\,\\cdot\\,",

    // Special symbols
    "\\iu": "\\mathfrak{i}",
    "\\given": "\\, \\vert \\,",
    "\\llangle": "\\langle\\!\\langle",
    "\\rrangle": "\\rangle\\!\\rangle",

    // Analysis operators
    "\\Lip": "\\mathrm{Lip}",
    "\\mem": "\\mathrm{mem}",
    "\\softmax": "\\operatorname{softmax}",
    "\\equid": "\\overset{d}{=}",
    "\\xor": "\\oplus",
    "\\bigxor": "\\bigoplus",
    "\\minimize": "\\underset{#1}{\\operatorname{minimize}}",
    "\\maximize": "\\underset{#1}{\\operatorname{maximize}}",
    "\\argmin": "\\mathop{\\mathrm{arg\\,min}}",
    "\\argmax": "\\mathop{\\mathrm{arg\\,max}}",
    "\\orth": "\\operatorname{orth}",
    "\\ow": "\\mathrm{otherwise}",
    "\\iid": "\\mathrm{i.i.d.}",
    "\\wass": "\\mathrm{W}",
    "\\TV": "\\mathrm{TV}",
    "\\as": "\\mathrm{a.s.}",
    "\\whp": "\\mathrm{w.h.p.}",
    "\\simiid": "\\sim_{\\iid}",
    "\\ltsim": "\\lesssim",
    "\\gtsim": "\\gtrsim",
    "\\ltsimwhp": "\\underset{\\whp}{\\lesssim}",
    "\\gtsimwhp": "\\underset{\\whp}{\\gtrsim}",
    "\\psdgeq": "\\succcurlyeq",
    "\\psdleq": "\\preccurlyeq",
    "\\defn": "\\overset{\\text{def}}{=}",
    "\\iter": "#1^{(#2)}",
    "\\prox": "\\operatorname{prox}_{#1}",

    // Vector operators
    "\\tr": "\\operatorname{tr}",
    "\\diag": "\\operatorname{diag}",
    "\\Diag": "\\operatorname{Diag}",
    "\\vect": "\\operatorname{vec}",
    "\\Sym": "\\operatorname{sym}",
    "\\Symm": "\\operatorname{sym}",
    "\\Skew": "\\operatorname{skew}",
    "\\rank": "\\operatorname{rank}",
    "\\krank": "\\operatorname{krank}",
    "\\sign": "\\operatorname{sign}",
    "\\sgn": "\\operatorname{sgn}",
    "\\supp": "\\operatorname{supp}",
    "\\esssup": "\\mathop{\\operatorname{ess\\,sup}}",
    "\\vol": "\\operatorname{vol}",
    "\\Vol": "\\operatorname{Vol}",
    "\\tp": "^{\\mathsf{T}}",
    "\\adj": "^{\\ast}",
    "\\inv": "^{-1}",
    "\\One": "\\mathbf{1}",
    "\\Zero": "\\mathbf{0}",
    "\\Id": "\\operatorname{Id}",
    "\\conv": "\\mathbin{\\ast}",
    "\\iconv": "\\mathbin{\\square}",
    "\\xcorr": "\\mathbin{\\star}",
    "\\cconv": "\\circledast",
    "\\frob": "\\mathrm{F}",
    "\\HS": "\\mathrm{HS}",

    // Trig stuff
    "\\acos": "\\cos^{-1}",
    "\\asin": "\\sin^{-1}",
    "\\atan": "\\tan^{-1}",
    "\\sech": "\\operatorname{sech}",
    "\\csch": "\\operatorname{csch}",

    // Calculus/geometry operators
    "\\Hess": "\\operatorname{Hess}",
    "\\grad": "\\operatorname{grad}",
    "\\Div": "\\operatorname{div}",
    "\\curl": "\\operatorname{curl}",
    "\\downto": "\\searrow",
    "\\upto": "\\nearrow",

    // CS operators
    "\\polylog": "\\operatorname{polylog}",
    "\\poly": "\\operatorname{poly}",

    // Stats operators - note: \mathds not in KaTeX, using \mathbb{1}
    "\\Ind": "\\mathbb{1}_{#1}",
    "\\stddev": "\\operatorname{stddev}",
    "\\Unif": "\\operatorname{Unif}(#1)",
    "\\Bern": "\\operatorname{Bern}(#1)",
    "\\Pois": "\\operatorname{Pois}(#1)",
    "\\Binom": "\\operatorname{Binom}(#1, #2)",
    "\\Exp": "\\operatorname{Exp}",
    "\\BG": "\\operatorname{BG}",
    "\\Law": "\\mathrm{Law}",
    // Simplified independence symbol (MathJax version uses \mathpalette which KaTeX doesn't support)
    "\\indep": "\\perp\\!\\!\\!\\perp",

    // Topology / set operators
    "\\compl": "\\mathsf{c}",
    "\\bd": "\\operatorname{bd}",
    "\\relbd": "\\operatorname{relbd}",
    "\\cl": "\\operatorname{cl}",
    "\\Conv": "\\operatorname{conv}",
    "\\dom": "\\operatorname{dom}",
    "\\epi": "\\operatorname{epi}",
    "\\aff": "\\operatorname{aff}",
    "\\cone": "\\operatorname{cone}",
    "\\ri": "\\operatorname{ri}",
    "\\im": "\\operatorname{im}",
    "\\Hom": "\\operatorname{Hom}",
    "\\End": "\\operatorname{End}",
    "\\Aut": "\\operatorname{Aut}",
    "\\Null": "\\operatorname{null}",
    "\\Span": "\\operatorname{span}",
    "\\row": "\\operatorname{row}",
    "\\col": "\\operatorname{col}",
    "\\range": "\\operatorname{range}",
    "\\Ran": "\\operatorname{ran}",
    "\\diam": "\\operatorname{diam}",
    "\\len": "\\operatorname{len}",
    "\\dist": "\\operatorname{dist}",
    "\\nnz": "\\operatorname{nnz}",
    "\\RE": "\\operatorname{RE}",
    "\\err": "\\operatorname{err}",
    "\\circulant": "\\operatorname{circ}",
    "\\tre": "\\operatorname{tre}",
    "\\etr": "\\operatorname{etr}",
    "\\proj": "\\operatorname{proj}_{#1}",

    // Paired delimiters - KaTeX versions (non-auto-sizing by default)
    // Use \abs{x} for normal, \abs*{x} doesn't work in KaTeX
    // Instead provide both versions explicitly
    "\\abs": "\\lvert #1 \\rvert",
    "\\norm": "\\lVert #1 \\rVert",
    "\\nnorm": "\\vert\\!\\vert\\!\\vert #1 \\vert\\!\\vert\\!\\vert",
    "\\ip": "\\langle #1, #2 \\rangle",
    "\\iip": "\\langle\\!\\langle #1, #2 \\rangle\\!\\rangle",
    "\\ceil": "\\lceil #1 \\rceil",
    "\\floor": "\\lfloor #1 \\rfloor",
    "\\KL": "\\mathrm{KL}\\left( #1 \\,\\|\\, #2 \\right)",
    "\\set": "\\{ #1 \\}",

    // Auto-sized versions using \left \right
    "\\Abs": "\\left\\lvert #1 \\right\\rvert",
    "\\Norm": "\\left\\lVert #1 \\right\\rVert",
    "\\Ceil": "\\left\\lceil #1 \\right\\rceil",
    "\\Floor": "\\left\\lfloor #1 \\right\\rfloor",
    "\\Set": "\\left\\{ #1 \\right\\}",
    "\\Ip": "\\left\\langle #1, #2 \\right\\rangle",

    // Probability/expectation with brackets
    "\\Pr": "\\mathbb{P}\\left[ #1 \\right]",
    "\\Prsub": "\\mathbb{P}_{#1}\\left[ #2 \\right]",
    "\\E": "\\mathbb{E}\\left[ #1 \\right]",
    "\\Esub": "\\mathbb{E}_{#1}\\left[ #2 \\right]",
    "\\Var": "\\mathrm{Var}\\left[ #1 \\right]",
    "\\cov": "\\mathrm{cov}\\left[ #1 \\right]",
    "\\Ent": "\\mathrm{Ent}_{#1}\\left[ #2 \\right]",

    // Partial/subdifferential with norm (referenced in original)
    "\\normsubdiff": "\\partial\\lVert \\cdot \\rVert_{#1}",
    "\\normalize": "\\frac{#1}{\\lVert #1 \\rVert_2}",
    "\\normalizeabs": "\\frac{#1}{\\lvert #1 \\rvert}",
  });

  return macros;
}

// Pre-generated macros for direct use
export const katexMacros = generateKatexMacros();
