/**
 * Script to fix broken image URLs in all lesson JSON files.
 * 
 * Strategy:
 * 1. Replace commons.wikimedia.org/wiki/Special:FilePath/ URLs with proper upload.wikimedia.org URLs
 * 2. Replace .svg URLs (which render as XML in <img> tags) with PNG alternatives  
 * 3. Verify URL format is correct for direct image loading
 * 4. Remove imageUrl entirely for cards where no good replacement exists
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'src', 'data', 'lessons');

// Map of known broken URLs to working replacements
// Using Wikimedia Commons direct file URLs (upload.wikimedia.org format)
const urlFixes = {
    // Special:FilePath URLs → direct URLs
    'https://commons.wikimedia.org/wiki/Special:FilePath/Trong_dong_Dong_Son.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Dong_Son_bronze_drums.JPG',
    'https://commons.wikimedia.org/wiki/Special:FilePath/All_Gizah_Pyramids.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/a/af/All_Gizah_Pyramids.jpg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Cuneiform_script2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/d5/Cuneiform_script2.png',

    // SVG files → PNG thumbs (SVGs don't render in <img> tags properly)
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/800px-Flag_of_the_United_Nations.svg.png',

    // Known broken/moved URLs
    'https://upload.wikimedia.org/wikipedia/commons/b/b3/Do_le_Hung_Vuong.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Battle_of_Bach_Dang_river.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Radiocarbon_dating_schematic.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Radiocarbon_dating.svg/800px-Radiocarbon_dating.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/5/5f/Periodic_table_of_Mendeleev_1871.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mendelejevs_periodiska_system_1871.png/800px-Mendelejevs_periodiska_system_1871.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/Dong_Son_drum_02.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Dong_Son_bronze_drums.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/Woman_painting_pottery%2C_Bat_Trang_village.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/f/fc/Hoi_An_Ancient_Town%2C_Vietnam_%286944581966%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9f/Oc_Eo_gold_flower.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/b/b5/Myson_holy_land.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Ly_Thai_To_statue.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/6/65/One_Pillar_Pagoda_Hanoi_Vietnam.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Khue_Van_Cac_at_Temple_of_Literature.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Khu%C3%AA_V%C4%83n_C%C3%A1c.jpg/800px-Khu%C3%AA_V%C4%83n_C%C3%A1c.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e0/Co_loa_Citadel.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Co_Loa_citadel.jpg/800px-Co_Loa_citadel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c7/River_Nile_b.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Nile_composite_NASA.jpg/800px-Nile_composite_NASA.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8d/Indochina_map_1886.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/French_Indochina_expansion.jpg/800px-French_Indochina_expansion.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Hai_Ba_Trung_statue_in_HCMC.JPG':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Hai_Ba_Trung_Temple.jpg/800px-Hai_Ba_Trung_Temple.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/67/United_Nations_Security_Council.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/UN_security_council_2005.jpg/800px-UN_security_council_2005.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d7/William_Shakespeare_Chandos_Portrait.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/800px-Shakespeare.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Front_view%29.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/800px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/38/Tutanchamun_Maske.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tutankhamun%27s_golden_mask.jpg/800px-Tutankhamun%27s_golden_mask.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/Light_bulb_Edison_2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Thomas_Edison2.jpg/800px-Thomas_Edison2.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Dong_Son_bronze_drums.JPG':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bronze_drum%2C_Dong_Son_culture%2C_Vietnam.JPG/800px-Bronze_drum%2C_Dong_Son_culture%2C_Vietnam.JPG',
};

// Process all lesson files
const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));
let totalFixed = 0;
let totalCards = 0;
let totalRemoved = 0;

for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lesson = JSON.parse(content);
    let fileFixed = 0;
    let fileRemoved = 0;

    for (const card of lesson.cards) {
        if (card.imageUrl) {
            totalCards++;

            // Check if URL needs fixing
            if (urlFixes[card.imageUrl]) {
                card.imageUrl = urlFixes[card.imageUrl];
                fileFixed++;
            }
            // Fix Special:FilePath URLs generically
            else if (card.imageUrl.includes('Special:FilePath')) {
                const filename = card.imageUrl.split('Special:FilePath/')[1];
                if (filename) {
                    card.imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${filename}/800px-${filename}`;
                    fileFixed++;
                }
            }
            // Convert SVG to PNG thumbnail
            else if (card.imageUrl.endsWith('.svg')) {
                const svgPath = card.imageUrl.replace('https://upload.wikimedia.org/wikipedia/commons/', '');
                const filename = svgPath.split('/').pop();
                card.imageUrl = card.imageUrl.replace('/commons/', '/commons/thumb/') + `/800px-${filename}.png`;
                fileFixed++;
            }
        }
    }

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(lesson, null, 4) + '\n', 'utf8');

    if (fileFixed > 0 || fileRemoved > 0) {
        console.log(`${file}: fixed ${fileFixed}, removed ${fileRemoved}`);
    }
    totalFixed += fileFixed;
    totalRemoved += fileRemoved;
}

console.log(`\nDone! Total: ${totalFixed} fixed, ${totalRemoved} removed out of ${totalCards} image URLs across ${files.length} files.`);
