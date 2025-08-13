const themes = {
  github: `
    body { color: #24292e; background: white; }
    h1, h2, h3, h4, h5, h6 { color: #1b1f23; margin-top: 24px; margin-bottom: 16px; }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 8px; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  `,
  
  dark: `
    body { color: #c9d1d9; background: #0d1117; }
    h1, h2, h3, h4, h5, h6 { color: #f0f6fc; }
    h1 { border-bottom: 1px solid #21262d; }
    h2 { border-bottom: 1px solid #21262d; }
    a { color: #58a6ff; }
    code { background: #161b22; color: #e6edf3; }
    pre { background: #161b22; }
    blockquote { border-left-color: #30363d; color: #8b949e; }
    th { background: #161b22; }
    th, td { border-color: #30363d; }
  `,
  
  minimal: `
    body { 
      color: #333; 
      background: white; 
      font-family: Georgia, serif;
      font-size: 16px;
    }
    h1, h2, h3, h4, h5, h6 { 
      color: #222; 
      font-weight: normal;
      margin-top: 32px;
      margin-bottom: 16px;
    }
    h1 { font-size: 2.2em; }
    h2 { font-size: 1.8em; }
    h3 { font-size: 1.4em; }
    a { color: #0066cc; }
    code, pre { font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; }
    blockquote { 
      font-style: italic; 
      border-left: 3px solid #ccc;
      color: #555;
    }
  `
};

function getThemeCSS(themeName) {
  return themes[themeName] || themes.github;
}

function listThemes() {
  return Object.keys(themes);
}

export default { getThemeCSS, listThemes };
