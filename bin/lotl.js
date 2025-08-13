#!/usr/bin/env node

import { program } from 'commander';
import { promises as fs } from 'fs';
import { resolve, basename, relative, join, dirname, extname } from 'path';
import chalk from 'chalk';
import convertMdToPdf from '../lib/converter.js';

program
  .name('lotl')
  .description('🦎 Convert Markdown to PDF with axolotl power')
  .version('1.0.0')
  .argument('<input>', 'Input markdown file or directory')
  .option('-o, --output <file>', 'Output PDF file (for single file) or directory (for batch)')
  .option('-t, --theme <theme>', 'Theme (github, dark, minimal)', 'github')
  .option('-m, --margin <margin>', 'Page margins (e.g., "20mm")', '20mm')
  .option('-f, --format <format>', 'Page format (A4, Letter, Legal)', 'A4')
  .option('--no-header', 'Disable header')
  .option('--no-footer', 'Disable footer')
  .option('-r, --recursive', 'Process subdirectories recursively')
  .action(async (input, options) => {
    try {
      const inputPath = resolve(input);
      const stats = await fs.stat(inputPath);
      
      if (stats.isDirectory()) {
        await handleDirectory(inputPath, options);
      } else {
        await handleSingleFile(inputPath, options);
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

async function handleSingleFile(inputPath, options) {
  // Check if it's a markdown file
  if (!isMarkdownFile(inputPath)) {
    throw new Error(`Not a markdown file: ${basename(inputPath)}`);
  }
  
        console.log(chalk.blue('🦎 Converting markdown to PDF...'));
  
  const outputPath = options.output 
    ? resolve(options.output)
    : inputPath.replace(/\.md$/i, '.pdf');
  
  await convertMdToPdf(inputPath, outputPath, options);
  
  console.log(chalk.green('✅ PDF created successfully!'));
  console.log(chalk.gray(`📄 Output: ${outputPath}`));
}

async function handleDirectory(inputPath, options) {
  console.log(chalk.blue(`🔍 Scanning directory: ${inputPath}`));
  
  const markdownFiles = await findMarkdownFiles(inputPath, options.recursive);
  
  if (markdownFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No markdown files found in directory'));
    return;
  }
  
  console.log(chalk.blue(`📚 Found ${markdownFiles.length} markdown file(s)`));
  
  const outputDir = options.output ? resolve(options.output) : inputPath;
  
  // Create output directory if it doesn't exist
  if (options.output) {
    await fs.mkdir(outputDir, { recursive: true });
  }
  
  let successCount = 0;
  
  for (const filePath of markdownFiles) {
    try {
      const relativePath = relative(inputPath, filePath);
      const outputPath = join(outputDir, relativePath.replace(/\.md$/i, '.pdf'));
      
      // Create subdirectories if needed
      await fs.mkdir(dirname(outputPath), { recursive: true });
      
      console.log(chalk.gray(`Converting: ${relativePath}`));
      await convertMdToPdf(filePath, outputPath, options);
      successCount++;
      
    } catch (error) {
      console.error(chalk.red(`❌ Failed to convert ${basename(filePath)}: ${error.message}`));
    }
  }
  
  console.log(chalk.green(`✅ Converted ${successCount}/${markdownFiles.length} files successfully!`));
}

async function findMarkdownFiles(dir, recursive = false) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory() && recursive) {
      files.push(...await findMarkdownFiles(fullPath, recursive));
    } else if (entry.isFile() && isMarkdownFile(fullPath)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function isMarkdownFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  return ['.md', '.markdown', '.mdown', '.mkd'].includes(ext);
}

// Add some examples
program.addHelpText('after', `

Examples:
  $ lotl README.md                    # Convert single file
  $ lotl .                           # Convert all .md files in current directory
  $ lotl docs/                       # Convert all .md files in docs/ folder
  $ lotl . -r                        # Recursively convert all .md files
  $ lotl docs.md -o output.pdf       # Custom output file
  $ lotl . -o pdfs/                  # Batch convert to pdfs/ directory
  $ lotl file.md --theme dark --format Letter
  $ lotl doc.md --no-header --margin 30mm
`);

program.parse();
