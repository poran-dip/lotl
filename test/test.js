import { exec } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { promisify } from "util";
import { strict as assert } from "assert";
import convertMdToPdf from "../lib/converter.js";

const execAsync = promisify(exec);

const mdFile = "test/test.md";
const pdfFile = "test/test.pdf";

async function runTests() {
  console.log("➡️ Running converter test...");
  await convertMdToPdf(mdFile, pdfFile);
  assert.ok(existsSync(pdfFile), "PDF not generated");
  console.log("✅ PDF generated successfully");

  unlinkSync(pdfFile);
  console.log("🧹 Cleaned up converter test PDF");

  console.log("➡️ Running CLI test...");
  const { stdout, stderr } = await execAsync(`node ./bin/lotl.js ${mdFile}`, {
    stdio: "pipe",
  });
  assert.equal(stderr, "", `CLI crashed:\n${stderr}`);
  console.log(stdout.trim());
  console.log("✅ CLI runs successfully");

  unlinkSync(pdfFile);
  console.log("🧹 Cleaned up CLI test PDF");
}

runTests().catch((err) => {
  console.error("❌ Tests failed:", err);
});
