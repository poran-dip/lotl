# LotL Test File

This is a **test markdown file** to verify that LotL correctly converts Markdown → PDF.

---

## Text Styles

- **Bold text**
- *Italic text*
- ***Bold & Italic***
- `Inline code` works too

> Blockquotes should render with a left border

---

## Lists

### Unordered
- Item 1
- Item 2
  - Nested item 2a
  - Nested item 2b

### Ordered
1. First
2. Second
3. Third

---

## Links
- [Google](https://google.com)
- [GitHub](https://github.com)

---

## Code Blocks
```js
function hello() {
  console.log("Hello LotL!");
}
hello();
```

---

## Table
| Name    | Age | Role      |
|---------|-----|-----------|
| Poran   | 21  | Developer |
| Axolotl | ?   | Mascot    |

---

> ✅ This PDF should contain all of the above elements correctly styled.
