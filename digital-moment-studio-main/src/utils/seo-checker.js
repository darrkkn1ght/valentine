#!/usr/bin/env node

/**
 * SEO Checker for Digital Moment Studio
 * Run: npm run check:seo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checks = {
  passed: [],
  warnings: [],
  errors: []
};

const log = {
  pass: (msg) => { console.log(`✅ ${msg}`); checks.passed.push(msg); },
  warn: (msg) => { console.log(`⚠️  ${msg}`); checks.warnings.push(msg); },
  error: (msg) => { console.log(`❌ ${msg}`); checks.errors.push(msg); }
};

console.log('\n🔍 SEO Checks for Digital Moment Studio\n');

// Check 1: index.html exists and has proper meta tags
try {
  const indexPath = path.join(__dirname, '../../index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('<title>')) log.pass('✓ Title tag found');
  else log.error('✗ Title tag missing');
  
  if (indexContent.includes('name="description"')) log.pass('✓ Meta description found');
  else log.error('✗ Meta description missing');
  
  if (indexContent.includes('property="og:image"')) log.pass('✓ Open Graph image tag found');
  else log.error('✗ Open Graph image tag missing');
  
  if (indexContent.includes('name="twitter:card"')) log.pass('✓ Twitter Card tag found');
  else log.error('✗ Twitter Card tag missing');
  
  if (indexContent.includes('rel="canonical"')) log.pass('✓ Canonical URL found');
  else log.warn('⚠ Canonical URL missing (recommended for production)');
  
  if (indexContent.includes('name="viewport"')) log.pass('✓ Viewport meta tag found');
  else log.error('✗ Viewport meta tag missing');
  
} catch (e) {
  log.error(`Could not read index.html: ${e.message}`);
}

// Check 2: robots.txt exists
try {
  const robotsPath = path.join(__dirname, '../../public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (robotsContent.includes('Sitemap:')) {
      log.pass('✓ robots.txt exists with sitemap reference');
    } else {
      log.warn('⚠ robots.txt exists but missing sitemap reference');
    }
  } else {
    log.error('✗ robots.txt not found');
  }
} catch (e) {
  log.error(`Could not read robots.txt: ${e.message}`);
}

// Check 3: sitemap.xml exists
try {
  const sitemapPath = path.join(__dirname, '../../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    log.pass(`✓ sitemap.xml exists with ${urlCount} URLs`);
  } else {
    log.error('✗ sitemap.xml not found');
  }
} catch (e) {
  log.error(`Could not read sitemap.xml: ${e.message}`);
}

// Check 4: site.webmanifest exists
try {
  const manifestPath = path.join(__dirname, '../../public/site.webmanifest');
  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    if (manifest.name && manifest.description) {
      log.pass('✓ site.webmanifest exists with name and description');
    } else {
      log.warn('⚠ site.webmanifest missing name or description');
    }
  } else {
    log.error('✗ site.webmanifest not found');
  }
} catch (e) {
  log.error(`Could not parse site.webmanifest: ${e.message}`);
}

// Check 5: Image assets exist
const imagesToCheck = [
  'public/favicon.ico',
  'public/apple-touch-icon.png',
  'src/assets/valentine-ask-preview.jpg',
  'src/assets/dms-logo.png',
  'src/assets/dms-logo-dark.png'
];

imagesToCheck.forEach(img => {
  const fullPath = path.join(__dirname, '../../', img);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    if (sizeMB > 1) {
      log.warn(`⚠ ${img} is ${sizeMB}MB (consider optimizing)`);
    } else {
      log.pass(`✓ ${img} (${sizeMB}MB)`);
    }
  } else {
    log.error(`✗ ${img} not found`);
  }
});

// Check 6: useSEO hook files
try {
  const seoHookPath = path.join(__dirname, '../hooks/useSEO.ts');
  if (fs.existsSync(seoHookPath)) {
    const content = fs.readFileSync(seoHookPath, 'utf8');
    if (content.includes('organizationSchema') && content.includes('productSchema')) {
      log.pass('✓ useSEO hook exists with schema definitions');
    }
  } else {
    log.error('✗ useSEO.ts hook not found');
  }
} catch (e) {
  log.error(`Could not check useSEO hook: ${e.message}`);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${checks.passed.length}`);
console.log(`⚠️  Warnings: ${checks.warnings.length}`);
console.log(`❌ Errors: ${checks.errors.length}`);
console.log('='.repeat(50) + '\n');

if (checks.errors.length > 0) {
  console.log('📝 Recommended fixes:');
  console.log('   1. Ensure all image assets are optimized (< 1MB)');
  console.log('   2. Add missing meta tags to index.html');
  console.log('   3. Create/validate robots.txt and sitemap.xml');
  console.log('   4. Update site.webmanifest with complete metadata\n');
}

// Exit with error code if there are critical issues
process.exit(checks.errors.length > 2 ? 1 : 0);
