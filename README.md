# lotl — Markdown to PDF (with Axolotl Power!)

**lotl** is a fast, simple CLI tool to convert your Markdown files into beautiful PDFs — with themes, margins, headers, footers, and even recursive directory conversion.
Powered by [Puppeteer](https://pptr.dev/), [marked](https://marked.js.org/), and a little axolotl magic.

---

## Installation


**Install from npm:**

```bash
npm install -g lotl
```

**Local development/Contributions:**

```bash
# clone the repo
git clone https://github.com/poran-dip/lotl.git
cd lotl

# install dependencies
npm install

# link the CLI globally for dev
npm link
```

---

## Usage

```bash
lotl <input> [options]
```

**Examples:**

```bash
lotl README.md                     # Convert single file
lotl .                             # Convert all .md files in current directory
lotl docs/                         # Convert all .md files in docs/ folder
lotl . -r                          # Recursively convert all .md files
lotl docs.md -o output.pdf         # Custom output file
lotl . -o pdfs/                    # Batch convert to pdfs/ directory
lotl file.md --theme dark --format Letter
lotl doc.md --no-header --margin 30mm
```

---

## Options

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

## Themes

* **github** – clean and familiar GitHub-style
* **dark** – dark mode for night owls
* **minimal** – clean, serif-based look

You can also import the theme list in JavaScript:

```js
import { themes } from 'lotl';
console.log(Object.keys(themes)); // ['github', 'dark', 'minimal']
```

---

## Programmatic API

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

## Development

```bash
npm install       # install dependencies
npm link          # link CLI locally
npm start         # run CLI from source
```

---

## License

MIT © 2025 Poran Dip

---

> *“Because every PDF deserves a little axolotl love.”*

---

**Transparency Note:** Most of this project was created using AI assistance. I (Poran Dip) wanted a MD to PDF converter CLI, and I wanted it *yesterday*, so AI was used to achieve that. I'm including this both for transparency and as a little flex in prompt engineering skills. 😎 However, that also means to expect bugs and things to break, and I'd love if you could open issues about them! I'll maintain this for a while and actually make proper changes myself, as needed.
