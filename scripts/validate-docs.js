#!/usr/bin/env node
/**
 * Validate docs/js files before commit
 * Run: node scripts/validate-docs.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const JS_DIR = path.join(DOCS_DIR, 'js');

let hasErrors = false;

function error(msg) {
  console.error(`❌ ${msg}`);
  hasErrors = true;
}

function success(msg) {
  console.log(`✓ ${msg}`);
}

function warn(msg) {
  console.warn(`⚠ ${msg}`);
}

// 1. Check JavaScript syntax
console.log('\n📋 Checking JavaScript syntax...');
const jsFiles = ['nodes.js', 'links.js', 'data.js', 'graph.js'];
for (const file of jsFiles) {
  const filePath = path.join(JS_DIR, file);
  try {
    execSync(`node --check "${filePath}"`, { stdio: 'pipe' });
    success(`${file} syntax OK`);
  } catch (e) {
    error(`${file} has syntax errors:\n${e.stderr?.toString() || e.message}`);
  }
}

// 2. Check for duplicate node IDs
console.log('\n📋 Checking for duplicate node IDs...');
try {
  const nodesContent = fs.readFileSync(path.join(JS_DIR, 'nodes.js'), 'utf8');
  const nodesMatch = nodesContent.match(/window\.paperNodes\s*=\s*(\[[\s\S]*\]);/);
  if (nodesMatch) {
    const nodes = eval(nodesMatch[1]);
    const ids = nodes.map(n => n.id);
    const seen = new Set();
    const duplicates = [];
    for (const id of ids) {
      if (seen.has(id)) duplicates.push(id);
      seen.add(id);
    }
    if (duplicates.length > 0) {
      error(`Duplicate node IDs: ${duplicates.join(', ')}`);
    } else {
      success(`No duplicate IDs (${nodes.length} nodes)`);
    }
  }
} catch (e) {
  error(`Failed to parse nodes.js: ${e.message}`);
}

// 3. Check for orphan link references
console.log('\n📋 Checking for orphan link references...');
try {
  const nodesContent = fs.readFileSync(path.join(JS_DIR, 'nodes.js'), 'utf8');
  const linksContent = fs.readFileSync(path.join(JS_DIR, 'links.js'), 'utf8');
  
  const nodesMatch = nodesContent.match(/window\.paperNodes\s*=\s*(\[[\s\S]*\]);/);
  const linksMatch = linksContent.match(/window\.paperLinks\s*=\s*(\[[\s\S]*\]);/);
  
  if (nodesMatch && linksMatch) {
    const nodes = eval(nodesMatch[1]);
    const links = eval(linksMatch[1]);
    const nodeIds = new Set(nodes.map(n => n.id));
    
    const orphans = new Set();
    for (const link of links) {
      if (!nodeIds.has(link.source)) orphans.add(link.source);
      if (!nodeIds.has(link.target)) orphans.add(link.target);
    }
    
    if (orphans.size > 0) {
      warn(`Orphan link references: ${[...orphans].join(', ')}`);
    } else {
      success(`All links reference valid nodes (${links.length} links)`);
    }
  }
} catch (e) {
  error(`Failed to validate links: ${e.message}`);
}

// 4. Check required HTML files
console.log('\n📋 Checking HTML files...');
const htmlFiles = ['index.html', 'pages/findings.html', 'pages/data.html', 'pages/tokenization.html', 'pages/architecture.html', 'pages/training.html'];
for (const file of htmlFiles) {
  const filePath = path.join(DOCS_DIR, file);
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.size > 0) {
      success(`${file} exists (${Math.round(stat.size / 1024)}KB)`);
    } else {
      error(`${file} is empty`);
    }
  } else {
    error(`${file} is missing`);
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Validation FAILED - fix errors before committing');
  process.exit(1);
} else {
  console.log('✅ All validations passed');
  process.exit(0);
}
