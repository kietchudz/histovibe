const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.join(__dirname, 'src/data/lessons');

// Map lesson topics to reliable, working image URLs
// Using Wikimedia Commons direct file URLs and other reliable sources
const LESSON_IMAGES = {
    // ========== GRADE 10 ==========
    grade10_lesson1: {
        // Hiện thực lịch sử và nhận thức lịch sử
        default: 'https://cdn.pixabay.com/photo/2017/01/18/08/25/social-history-1989507_1280.jpg',
        images: {
            1: 'https://cdn.pixabay.com/photo/2017/01/18/08/25/social-history-1989507_1280.jpg',
            3: 'https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg',
            7: 'https://cdn.pixabay.com/photo/2015/11/19/21/14/glasses-1052010_1280.jpg',
        }
    },
    grade10_lesson2: {
        // Tri thức lịch sử và cuộc sống
        default: 'https://cdn.pixabay.com/photo/2015/12/19/20/32/paper-1100254_1280.jpg',
        images: {}
    },
    grade10_lesson3: {
        // Sử học với các lĩnh vực khoa học
        default: 'https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg',
        images: {
            1: 'https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg',
            2: 'https://cdn.pixabay.com/photo/2017/02/01/13/52/analysis-2030265_1280.jpg',
            6: 'https://cdn.pixabay.com/photo/2013/07/18/10/56/chemistry-163259_1280.jpg',
        }
    },
    grade10_lesson4: {
        // Sử học với một số lĩnh vực hiện đại
        default: 'https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg',
        images: {}
    },
    grade10_lesson5: {
        // Khái quát lịch sử văn minh thế giới  
        default: 'https://cdn.pixabay.com/photo/2019/10/06/08/57/tianjin-4529673_1280.jpg',
        images: {}
    },
    grade10_lesson6: {
        // Văn minh Ai Cập
        default: 'https://cdn.pixabay.com/photo/2015/11/06/11/45/pyramids-1035650_1280.jpg',
        images: {}
    },
    grade10_lesson7: {
        // Văn minh Trung Hoa
        default: 'https://cdn.pixabay.com/photo/2019/07/21/18/31/great-wall-of-china-4353565_1280.jpg',
        images: {}
    },
    grade10_lesson8: {
        // Văn minh Ấn Độ
        default: 'https://cdn.pixabay.com/photo/2016/11/08/05/20/taj-mahal-1807528_1280.jpg',
        images: {}
    },
    grade10_lesson9: {
        // Văn minh Hy Lạp - La Mã
        default: 'https://cdn.pixabay.com/photo/2019/03/12/20/27/ruins-4051460_1280.jpg',
        images: {}
    },
    grade10_lesson10: {
        // Văn minh Đông Nam Á
        default: 'https://cdn.pixabay.com/photo/2019/10/28/09/08/angkor-4583849_1280.jpg',
        images: {}
    },
    grade10_lesson11: {
        // Một số nền văn minh cổ trên đất nước VN
        default: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/hue-4977432_1280.jpg',
        images: {}
    },
    grade10_lesson12: {
        // Văn minh Đại Việt
        default: 'https://cdn.pixabay.com/photo/2019/11/25/20/28/vietnam-4653292_1280.jpg',
        images: {}
    },
    grade10_lesson13: {
        // Cộng đồng các dân tộc Việt Nam
        default: 'https://cdn.pixabay.com/photo/2020/04/26/04/18/ha-giang-5093955_1280.jpg',
        images: {}
    },
    grade10_lesson14: {
        // Khối đại đoàn kết dân tộc
        default: 'https://cdn.pixabay.com/photo/2020/01/20/17/44/unity-4781047_1280.jpg',
        images: {}
    },
    grade10_lesson15: {
        // Chính sách dân tộc
        default: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/hue-4977432_1280.jpg',
        images: {}
    },
    grade10_lesson16: {
        // Khái quát về tôn giáo và tín ngưỡng
        default: 'https://cdn.pixabay.com/photo/2019/07/25/18/58/church-4363258_1280.jpg',
        images: {}
    },
    grade10_lesson17: {
        // Tôn giáo ở Việt Nam
        default: 'https://cdn.pixabay.com/photo/2020/08/24/05/55/pagoda-5513135_1280.jpg',
        images: {}
    },

    // ========== GRADE 11 ==========
    grade11_lesson1: {
        // Cách mạng tư sản
        default: 'https://cdn.pixabay.com/photo/2015/05/07/11/22/french-revolution-756102_1280.jpg',
        images: {}
    },
    grade11_lesson2: {
        // Cách mạng công nghiệp
        default: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg',
        images: {}
    },
    grade11_lesson3: {
        // Chủ nghĩa xã hội
        default: 'https://cdn.pixabay.com/photo/2019/11/12/15/24/moscow-4622103_1280.jpg',
        images: {}
    },
    grade11_lesson4: {
        // CNXH từ 1991 đến nay
        default: 'https://cdn.pixabay.com/photo/2017/06/18/17/28/shanghai-2416030_1280.jpg',
        images: {
            1: 'https://cdn.pixabay.com/photo/2017/06/18/17/28/shanghai-2416030_1280.jpg',
            2: 'https://cdn.pixabay.com/photo/2019/11/12/15/24/moscow-4622103_1280.jpg',
            3: 'https://cdn.pixabay.com/photo/2017/06/18/17/28/shanghai-2416030_1280.jpg',
            4: 'https://cdn.pixabay.com/photo/2019/11/25/20/28/vietnam-4653292_1280.jpg',
            5: 'https://cdn.pixabay.com/photo/2017/05/21/15/14/havana-2331031_1280.jpg',
            6: 'https://cdn.pixabay.com/photo/2017/06/18/17/28/shanghai-2416030_1280.jpg',
        }
    },
    grade11_lesson5: {
        // Phong trào độc lập dân tộc ở Á Phi Mỹ Latinh
        default: 'https://cdn.pixabay.com/photo/2015/06/01/00/20/man-793916_1280.jpg',
        images: {}
    },
    grade11_lesson6: {
        // Hành trình đi tìm đường cứu nước
        default: 'https://cdn.pixabay.com/photo/2020/04/08/15/04/ho-chi-minh-5017469_1280.jpg',
        images: {}
    },
    grade11_lesson7: {
        // Chiến tranh bảo vệ Tổ quốc trong lịch sử VN
        default: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/hue-4977432_1280.jpg',
        images: {}
    },
    grade11_lesson8: {
        // Một số cuộc khởi nghĩa và chiến tranh giải phóng
        default: 'https://cdn.pixabay.com/photo/2019/11/25/20/28/vietnam-4653292_1280.jpg',
        images: {}
    },
    grade11_lesson9: {
        // Cuộc cải cách của Hồ Quý Ly & Lê Thánh Tông
        default: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/hue-4977432_1280.jpg',
        images: {}
    },
    grade11_lesson10: {
        // Cải cách Minh Trị & Duy Tân Mậu Tuất
        default: 'https://cdn.pixabay.com/photo/2019/04/16/17/07/torii-4132651_1280.jpg',
        images: {}
    },
    grade11_lesson11: {
        // Cuộc cải cách của Rama V
        default: 'https://cdn.pixabay.com/photo/2021/01/06/07/52/thailand-5893606_1280.jpg',
        images: {}
    },
    grade11_lesson12: {
        // Thông tin và truyền thông trong SM
        default: 'https://cdn.pixabay.com/photo/2016/10/09/08/32/digital-marketing-1725340_1280.jpg',
        images: {}
    },
    grade11_lesson13: {
        // Giáo dục qua các thời kỳ
        default: 'https://cdn.pixabay.com/photo/2015/07/28/21/58/student-865073_1280.jpg',
        images: {}
    },

    // ========== GRADE 12 ==========
    grade12_lesson1: {
        // TG sau CTTG2
        default: 'https://cdn.pixabay.com/photo/2018/09/06/10/49/united-nations-3658165_1280.jpg',
        images: {}
    },
    grade12_lesson2: {
        // Trật tự hai cực Ianta → Chiến tranh Lạnh
        default: 'https://cdn.pixabay.com/photo/2017/02/16/11/13/cold-war-2071476_1280.jpg',
        images: {}
    },
    grade12_lesson3: {
        // Các nước Đông Nam Á & ASEAN
        default: 'https://cdn.pixabay.com/photo/2019/10/28/09/08/angkor-4583849_1280.jpg',
        images: {}
    },
    grade12_lesson4: {
        // CM Tháng 8 & thành lập nước VNDCCH
        default: 'https://cdn.pixabay.com/photo/2020/04/08/15/04/ho-chi-minh-5017469_1280.jpg',
        images: {}
    },
    grade12_lesson5: {
        // Kháng chiến chống Pháp (1945–1954)
        default: 'https://cdn.pixabay.com/photo/2019/11/25/20/28/vietnam-4653292_1280.jpg',
        images: {}
    },
    grade12_lesson6: {
        // Kháng chiến chống Mỹ (1954–1975)
        default: 'https://cdn.pixabay.com/photo/2020/04/08/15/04/ho-chi-minh-5017469_1280.jpg',
        images: {}
    },
    grade12_lesson7: {
        // VN sau 1975 → Đổi mới
        default: 'https://cdn.pixabay.com/photo/2019/11/25/20/28/vietnam-4653292_1280.jpg',
        images: {}
    },
    grade12_lesson8: {
        // VN hội nhập quốc tế
        default: 'https://cdn.pixabay.com/photo/2017/06/18/17/28/shanghai-2416030_1280.jpg',
        images: {}
    },
    grade12_lesson9: {
        // Quan hệ quốc tế
        default: 'https://cdn.pixabay.com/photo/2018/09/06/10/49/united-nations-3658165_1280.jpg',
        images: {}
    },
    grade12_lesson10: {
        // Cách mạng KHKT
        default: 'https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg',
        images: {}
    },
    grade12_lesson11: {
        // Các nước Á Phi Mỹ Latinh
        default: 'https://cdn.pixabay.com/photo/2015/06/01/00/20/man-793916_1280.jpg',
        images: {}
    },
    grade12_lesson12: {
        // Nhật Bản
        default: 'https://cdn.pixabay.com/photo/2019/04/16/17/07/torii-4132651_1280.jpg',
        images: {}
    },
    grade12_lesson13: {
        // Đông Nam Á sau 1945
        default: 'https://cdn.pixabay.com/photo/2019/10/28/09/08/angkor-4583849_1280.jpg',
        images: {}
    },
    grade12_lesson14: {
        // Phong trào giải phóng ở VN (đầu TK20)
        default: 'https://cdn.pixabay.com/photo/2020/04/08/15/04/ho-chi-minh-5017469_1280.jpg',
        images: {}
    },
    grade12_lesson15: {
        // VN 1930-1945
        default: 'https://cdn.pixabay.com/photo/2019/11/25/20/28/vietnam-4653292_1280.jpg',
        images: {}
    },
    grade12_lesson16: {
        // Tổng ôn - Đất nước thống nhất
        default: 'https://cdn.pixabay.com/photo/2020/03/28/15/20/hue-4977432_1280.jpg',
        images: {}
    },
};

// Process all files
const files = fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.json')).sort();
let totalUpdated = 0;
let totalCards = 0;

files.forEach(file => {
    const filePath = path.join(LESSONS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const lessonId = data.id;
    const lessonConfig = LESSON_IMAGES[lessonId];

    if (!lessonConfig) {
        console.log(`⚠️  No config for ${lessonId}, skipping`);
        return;
    }

    let updated = false;
    data.cards.forEach(card => {
        if (card.imageUrl) {
            totalCards++;
            // Check if there's a specific image for this card ID
            const newUrl = lessonConfig.images[card.id] || lessonConfig.default;
            if (card.imageUrl !== newUrl) {
                card.imageUrl = newUrl;
                updated = true;
                totalUpdated++;
            }
        }
    });

    if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf8');
        console.log(`✅ Updated: ${file}`);
    } else {
        console.log(`  No changes: ${file}`);
    }
});

console.log(`\n📊 Summary: ${totalUpdated}/${totalCards} image URLs updated across ${files.length} files`);
