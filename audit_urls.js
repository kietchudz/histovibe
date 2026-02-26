/**
 * Audit all image URLs in lesson files - just list them
 */
const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'src', 'data', 'lessons');
const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));

const allUrls = new Map(); // url -> [files]

for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const card of lesson.cards) {
        if (card.imageUrl) {
            if (!allUrls.has(card.imageUrl)) {
                allUrls.set(card.imageUrl, []);
            }
            allUrls.get(card.imageUrl).push(`${file}:card${card.id}`);
        }
    }
}

console.log(`Found ${allUrls.size} unique image URLs across ${files.length} files:\n`);

// Group by URL pattern
const specialFilePath = [];
const svgFiles = [];
const normalUrls = [];

for (const [url, locations] of allUrls) {
    if (url.includes('Special:FilePath')) {
        specialFilePath.push({ url, locations });
    } else if (url.endsWith('.svg')) {
        svgFiles.push({ url, locations });
    } else {
        normalUrls.push({ url, locations });
    }
}

if (specialFilePath.length > 0) {
    console.log(`=== BROKEN: Special:FilePath URLs (${specialFilePath.length}) ===`);
    specialFilePath.forEach(({ url, locations }) => {
        console.log(`  ${url}`);
        console.log(`    Used in: ${locations.join(', ')}`);
    });
    console.log('');
}

if (svgFiles.length > 0) {
    console.log(`=== PROBLEMATIC: SVG URLs (${svgFiles.length}) ===`);
    svgFiles.forEach(({ url, locations }) => {
        console.log(`  ${url}`);
        console.log(`    Used in: ${locations.join(', ')}`);
    });
    console.log('');
}

console.log(`=== NORMAL URLs (${normalUrls.length}) ===`);
normalUrls.forEach(({ url, locations }) => {
    console.log(`  ${url}`);
    console.log(`    Used in: ${locations.join(', ')}`);
});
