const fs = require('fs');
const path = require('path');

const lessonsDir = 'd:/historyvibe/src/data/lessons';

function checkImages() {
    const files = fs.readdirSync(lessonsDir);
    let totalCards = 0;
    let missingImages = 0;
    const report = {};

    files.forEach(file => {
        if (!file.endsWith('.json')) return;

        try {
            const content = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
            const lesson = JSON.parse(content);
            const lessonId = lesson.id;

            if (!lesson.cards) return;

            lesson.cards.forEach(card => {
                totalCards++;
                if (!card.imageUrl || card.imageUrl.trim() === '') {
                    missingImages++;
                    if (!report[file]) report[file] = [];
                    report[file].push(card.id);
                }
            });
        } catch (e) {
            console.error(`Error reading ${file}:`, e.message);
        }
    });

    console.log('--- Image Audit Report ---');
    console.log(`Total Cards Checked: ${totalCards}`);
    console.log(`Missing Images: ${missingImages}`);
    console.log('Details:');
    Object.keys(report).forEach(file => {
        console.log(`${file}: Cards [${report[file].join(', ')}]`);
    });
}

checkImages();
