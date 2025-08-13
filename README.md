# 🦎 lotl — Markdown to PDF with Axolotl Power

**lotl** is a fast, simple CLI tool to convert your Markdown files into beautiful PDFs — with themes, margins, headers, footers, and even recursive directory conversion.
Powered by [Puppeteer](https://pptr.dev/), [marked](https://marked.js.org/), and a little axolotl magic. ✨

> **Transparency Note:** This entire project was created in about 30 minutes using AI assistance for all code, documentation, and structure. I (Poran Dip) basically wrote *zero* lines of code myself — it’s both a transparency thing and a little flex in prompt engineering skills. 😎

---

## 🚀 Installation

**Local development:**

```bash
# clone the repo
git clone https://github.com/poran-dip/lotl.git
cd lotl

# install dependencies
npm install

# link the CLI globally for dev
npm link
```

**(future) Install from npm:**

```bash
npm install -g lotl
```

---

## 📦 Usage

```bash
lotl <input> [options]
```

**Examples:**

```bash
lotl README.md                    # Convert single file
lotl .                             # Convert all .md files in current directory
lotl docs/                         # Convert all .md files in docs/ folder
lotl . -r                          # Recursively convert all .md files
lotl docs.md -o output.pdf         # Custom output file
lotl . -o pdfs/                    # Batch convert to pdfs/ directory
lotl file.md --theme dark --format Letter
lotl doc.md --no-header --margin 30mm
```

---

## ⚙️ Options

| Option            | Description                                   | Default |
| ----------------- | --------------------------------------------- | ------- |
| `-o, --output`    | Output PDF file (single) or directory (batch) | auto    |
| `-t, --theme`     | Theme (`github`, `dark`, `minimal`)           | github  |
| `-m, --margin`    | Page margins (e.g., `"20mm"`)                 | 20mm    |
| `-f, --format`    | Page format (`A4`, `Letter`, `Legal`)         | A4      |
| `--no-header`     | Disable header                                | enabled |
| `--no-footer`     | Disable footer                                | enabled |
| `-r, --recursive` | Process subdirectories recursively            | false   |

---

## 🎨 Themes

* **github** – clean and familiar GitHub-style
* **dark** – dark mode for night owls
* **minimal** – clean, serif-based look

You can also import the theme list in JavaScript:

```js
import { themes } from 'lotl';
console.log(Object.keys(themes)); // ['github', 'dark', 'minimal']
```

---

## 📜 Programmatic API

You can also use **lotl** directly in your Node.js code:

```js
import { convertMdToPdf, themes } from 'lotl';

await convertMdToPdf('README.md', 'output.pdf', {
  theme: 'dark',
  format: 'Letter',
  margin: '25mm',
  header: false
});
```

---

## 🛠 Development

```bash
npm install       # install dependencies
npm link          # link CLI locally
npm start         # run CLI from source
```

---

## 🧾 License

MIT © 2025 Poran Dip

---

> 🦎 *“Because every PDF deserves a little axolotl love.”*
