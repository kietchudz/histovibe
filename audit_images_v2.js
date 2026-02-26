const fs = require('fs');
const path = require('path');

const lessonsDir = 'd:/historyvibe/src/data/lessons';
const reportFile = 'audit_report.txt';

try {
    if (!fs.existsSync(lessonsDir)) {
        fs.writeFileSync(reportFile, `Directory not found: ${lessonsDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(lessonsDir);
    let totalCards = 0;
    let missingImages = 0;
    const report = {};

    files.forEach(file => {
        if (!file.endsWith('.json')) return;

        try {
            const content = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
            const lesson = JSON.parse(content);

            if (!lesson.cards) return;

            lesson.cards.forEach(card => {
                totalCards++;
                // Check for null, empty, or "placeholder"
                if (!card.type || card.type === 'text') { // Only check text cards usually? Or all cards? Assuming all visual cards.
                    if (!card.imageUrl || card.imageUrl.trim() === '' || card.imageUrl.includes('placeholder')) {
                        missingImages++;
                        if (!report[file]) report[file] = [];
                        report[file].push(card.id);
                    }
                }
            });
        } catch (e) {
            // ignore
        }
    });

    const output = [
        '--- Image Audit Report ---',
        `Total Cards Checked: ${totalCards}`,
        `Missing Images: ${missingImages}`
    ];

    if (missingImages > 0) {
        output.push('Details:');
        Object.keys(report).forEach(file => {
            output.push(`${file}: Cards [${report[file].join(', ')}]`);
        });
    } else {
        output.push('No missing images found!');
    }

    fs.writeFileSync(reportFile, output.join('\n'));

} catch (e) {
    fs.writeFileSync(reportFile, `Fatal error: ${e.message}`);
}
