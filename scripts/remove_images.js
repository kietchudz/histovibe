const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '../src/data/lessons');

function removeImages() {
    const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const filePath = path.join(lessonsDir, file);
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            let changed = false;

            if (data.cards) {
                for (const card of data.cards) {
                    if (card.image !== undefined) {
                        delete card.image;
                        changed = true;
                    }
                    if (card.imageUrl !== undefined) {
                        delete card.imageUrl;
                        changed = true;
                    }
                    // If a card was strictly an "image" card maybe we should change its type or leave it text?
                    // Based on types.ts, cards can be "image". 
                    if (card.type === 'image') {
                        card.type = 'text'; // Fallback so it doesn't break if ImageCard is removed
                        changed = true;
                    }
                }
            }

            if (changed) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
                console.log(`Updated ${file}`);
            }
        } catch (e) {
            console.error(`Error processing ${file}:`, e.message);
        }
    }
}

removeImages();
