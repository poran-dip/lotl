import { promises as fs } from 'fs';
import { basename } from 'path';
import { marked } from 'marked';
import { launch } from 'puppeteer';
import themes from './themes.js';

async function convertMdToPdf(inputPath, outputPath, options = {}) {
  // Read markdown file
  const markdownContent = await fs.readFile(inputPath, 'utf8');
  
  // Convert markdown to HTML
  const htmlContent = marked(markdownContent);
  
  // Get theme CSS
  const themeCSS = themes.getThemeCSS(options.theme || 'github');
  
  // Create full HTML document
  const fullHTML = createHTMLDocument(htmlContent, themeCSS, options);
  
  // Generate PDF using Puppeteer
  const browser = await launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

    // parse margin shorthand
    const margins = parseMargins(options.margin || '20mm');

    const pdfOptions = {
      path: outputPath,
      format: options.format || 'A4',
      printBackground: true,
      margin: margins,
      displayHeaderFooter: false // default off
    };

    // Handle header/footer
    let hasHeaderFooter = false;

    if (options.header !== false) {
      pdfOptions.headerTemplate = `
        <div style="font-size:10px; margin:auto; text-align:center;"></div>
      `;
      hasHeaderFooter = true;
    }

    if (options.footer !== false) {
      pdfOptions.footerTemplate = `
        <div style="font-size:10px; margin:auto; text-align:center;"></div>
      `;
      hasHeaderFooter = true;
    }

    if (hasHeaderFooter) {
      pdfOptions.displayHeaderFooter = true;
    }

    await page.pdf(pdfOptions);
    
  } finally {
    await browser.close();
  }
}

function createHTMLDocument(content, css, options) {
  const title = basename(options.input || 'Document', '.md');
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    ${css}
    
    /* Print-specific styles */
    @media print {
      body { margin: 0; }
      .page-break { page-break-before: always; }
      .no-print { display: none; }
    }
    
    /* Base styles for better PDF rendering */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: none;
      margin: 0;
      padding: 20px;
    }
    
    code {
      background: #f6f8fa;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 0.9em;
    }
    
    pre {
      background: #f6f8fa;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
    }
    
    blockquote {
      border-left: 4px solid #ddd;
      margin: 0;
      padding-left: 16px;
      color: #666;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
    }
    
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    
    th {
      background: #f6f8fa;
      font-weight: 600;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

// Helper to parse CSS-style margins
function parseMargins(input) {
  if (!input) return { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' };
  const parts = input.trim().split(/\s+/);
  if (parts.length === 1) {
    return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
  }
  if (parts.length === 2) {
    return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
  }
  if (parts.length === 3) {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
  }
  if (parts.length >= 4) {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
  }
}

export default convertMdToPdf;
