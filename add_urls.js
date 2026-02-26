const fs = require('fs');
const path = require('path');

const lessonsDir = 'd:\\\\historyvibe\\\\src\\\\data\\\\lessons';

// URL mapping: lessonId -> { lessonUrl, cardUrls: { cardId: url } }
const urlData = {
    // ============ GRADE 10 ============
    "grade10_lesson1": {
        url: "https://vi.wikipedia.org/wiki/S%E1%BB%AD_h%E1%BB%8Dc",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/L%E1%BB%8Bch_s%E1%BB%AD",
            3: "https://vi.wikipedia.org/wiki/S%E1%BB%AD_h%E1%BB%8Dc",
            4: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_(938)",
            7: "https://vi.wikipedia.org/wiki/Ph%C6%B0%C6%A1ng_ph%C3%A1p_nghi%C3%AAn_c%E1%BB%A9u_l%E1%BB%8Bch_s%E1%BB%AD"
        }
    },
    "grade10_lesson2": {
        url: "https://vi.wikipedia.org/wiki/Tri_th%E1%BB%A9c_l%E1%BB%8Bch_s%E1%BB%AD",
        cardUrls: {
            2: "https://vi.wikipedia.org/wiki/H%C3%B9ng_V%C6%B0%C6%A1ng",
            3: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_(938)",
            5: "https://vi.wikipedia.org/wiki/Hai_B%C3%A0_Tr%C6%B0ng",
            6: "https://vi.wikipedia.org/wiki/B%E1%BA%A3o_t%C3%A0ng_L%E1%BB%8Bch_s%E1%BB%AD_Qu%E1%BB%91c_gia_Vi%E1%BB%87t_Nam"
        }
    },
    "grade10_lesson3": {
        url: "https://vi.wikipedia.org/wiki/S%E1%BB%AD_h%E1%BB%8Dc",
        cardUrls: {
            2: "https://vi.wikipedia.org/wiki/Kh%E1%BA%A3o_c%E1%BB%95_h%E1%BB%8Dc",
            3: "https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Ba_l%C3%BD_h%E1%BB%8Dc",
            5: "https://vi.wikipedia.org/wiki/Nh%C3%A2n_ch%E1%BB%A7ng_h%E1%BB%8Dc"
        }
    },
    "grade10_lesson4": {
        url: "https://vi.wikipedia.org/wiki/S%E1%BB%AD_h%E1%BB%8Dc",
        cardUrls: {
            2: "https://vi.wikipedia.org/wiki/Du_l%E1%BB%8Bch",
            3: "https://vi.wikipedia.org/wiki/B%C3%A1o_ch%C3%AD",
            4: "https://vi.wikipedia.org/wiki/C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin"
        }
    },
    "grade10_lesson5": {
        url: "https://vi.wikipedia.org/wiki/V%C4%83n_minh",
        cardUrls: {
            2: "https://vi.wikipedia.org/wiki/V%C4%83n_h%C3%B3a",
            3: "https://vi.wikipedia.org/wiki/V%C4%83n_minh",
            6: "https://vi.wikipedia.org/wiki/V%C4%83n_minh_L%C6%B0%E1%BB%A1ng_H%C3%A0"
        }
    },
    "grade10_lesson6": {
        url: "https://vi.wikipedia.org/wiki/Ai_C%E1%BA%ADp_c%E1%BB%95_%C4%91%E1%BA%A1i",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ai_C%E1%BA%ADp_c%E1%BB%95_%C4%91%E1%BA%A1i",
            2: "https://vi.wikipedia.org/wiki/S%C3%B4ng_Nin",
            3: "https://vi.wikipedia.org/wiki/Kim_t%E1%BB%B1_th%C3%A1p_Giza",
            4: "https://vi.wikipedia.org/wiki/Ch%E1%BB%AF_t%C6%B0%E1%BB%A3ng_h%C3%ACnh_Ai_C%E1%BA%ADp",
            5: "https://vi.wikipedia.org/wiki/Pharaon"
        }
    },
    "grade10_lesson7": {
        url: "https://vi.wikipedia.org/wiki/%E1%BA%A4n_%C4%90%E1%BB%99_c%E1%BB%95_%C4%91%E1%BA%A1i",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/%E1%BA%A4n_%C4%90%E1%BB%99_c%E1%BB%95_%C4%91%E1%BA%A1i",
            2: "https://vi.wikipedia.org/wiki/%E1%BA%A4n_%C4%90%E1%BB%99_gi%C3%A1o",
            3: "https://vi.wikipedia.org/wiki/Ph%E1%BA%ADt_gi%C3%A1o",
            4: "https://vi.wikipedia.org/wiki/Ch%E1%BB%AF_s%E1%BB%91_%E1%BA%A2_R%E1%BA%ADp"
        }
    },
    "grade10_lesson8": {
        url: "https://vi.wikipedia.org/wiki/V%C4%83n_minh_Trung_Hoa",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/V%C4%83n_minh_Trung_Hoa",
            2: "https://vi.wikipedia.org/wiki/Nho_gi%C3%A1o",
            3: "https://vi.wikipedia.org/wiki/T%E1%BB%A9_%C4%91%E1%BA%A1i_ph%C3%A1t_minh",
            4: "https://vi.wikipedia.org/wiki/V%E1%BA%A1n_l%C3%BD_Tr%C6%B0%E1%BB%9Dng_Th%C3%A0nh"
        }
    },
    "grade10_lesson9": {
        url: "https://vi.wikipedia.org/wiki/Hy_L%E1%BA%A1p_c%E1%BB%95_%C4%91%E1%BA%A1i",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Hy_L%E1%BA%A1p_c%E1%BB%95_%C4%91%E1%BA%A1i",
            2: "https://vi.wikipedia.org/wiki/D%C3%A2n_ch%E1%BB%A7_Athena",
            3: "https://vi.wikipedia.org/wiki/%C4%90%E1%BA%BF_qu%E1%BB%91c_La_M%C3%A3",
            5: "https://vi.wikipedia.org/wiki/Th%E1%BA%BF_v%E1%BA%ADn_h%E1%BB%99i_c%E1%BB%95_%C4%91%E1%BA%A1i"
        }
    },
    "grade10_lesson10": {
        url: "https://vi.wikipedia.org/wiki/Ph%E1%BB%A5c_H%C6%B0ng",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ph%E1%BB%A5c_H%C6%B0ng",
            2: "https://vi.wikipedia.org/wiki/Leonardo_da_Vinci",
            3: "https://vi.wikipedia.org/wiki/Martin_Luther",
            4: "https://vi.wikipedia.org/wiki/Ph%C3%A1t_ki%E1%BA%BFn_%C4%91%E1%BB%8Ba_l%C3%BD"
        }
    },
    "grade10_lesson11": {
        url: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_c%C3%B4ng_nghi%E1%BB%87p",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_c%C3%B4ng_nghi%E1%BB%87p",
            2: "https://vi.wikipedia.org/wiki/M%C3%A1y_h%C6%A1i_n%C6%B0%E1%BB%9Bc",
            3: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_c%C3%B4ng_nghi%E1%BB%87p_l%E1%BA%A7n_th%E1%BB%A9_hai"
        }
    },
    "grade10_lesson12": {
        url: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_c%C3%B4ng_nghi%E1%BB%87p_l%E1%BA%A7n_th%E1%BB%A9_ba",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_c%C3%B4ng_nghi%E1%BB%87p_l%E1%BA%A7n_th%E1%BB%A9_ba",
            2: "https://vi.wikipedia.org/wiki/Internet",
            3: "https://vi.wikipedia.org/wiki/Tr%C3%AD_tu%E1%BB%87_nh%C3%A2n_t%E1%BA%A1o"
        }
    },
    "grade10_lesson13": {
        url: "https://vi.wikipedia.org/wiki/V%C4%83n_Lang",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/V%C4%83n_Lang",
            2: "https://vi.wikipedia.org/wiki/Tr%E1%BB%91ng_%C4%91%E1%BB%93ng_%C4%90%C3%B4ng_S%C6%A1n",
            3: "https://vi.wikipedia.org/wiki/%C3%82u_L%E1%BA%A1c",
            4: "https://vi.wikipedia.org/wiki/An_D%C6%B0%C6%A1ng_V%C6%B0%C6%A1ng"
        }
    },
    "grade10_lesson14": {
        url: "https://vi.wikipedia.org/wiki/Ch%C4%83m_Pa",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ch%C4%83m_Pa",
            2: "https://vi.wikipedia.org/wiki/Th%C3%A1nh_%C4%91%E1%BB%8Ba_M%E1%BB%B9_S%C6%A1n",
            3: "https://vi.wikipedia.org/wiki/%E1%BA%A4n_%C4%90%E1%BB%99_gi%C3%A1o"
        }
    },
    "grade10_lesson15": {
        url: "https://vi.wikipedia.org/wiki/Ph%C3%B9_Nam",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ph%C3%B9_Nam",
            2: "https://vi.wikipedia.org/wiki/%C3%93c_Eo",
            3: "https://vi.wikipedia.org/wiki/Ph%E1%BA%ADt_gi%C3%A1o"
        }
    },
    "grade10_lesson16": {
        url: "https://vi.wikipedia.org/wiki/%C4%90%E1%BA%A1i_Vi%E1%BB%87t",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/%C4%90%E1%BA%A1i_Vi%E1%BB%87t",
            2: "https://vi.wikipedia.org/wiki/Nh%C3%A0_L%C3%BD",
            3: "https://vi.wikipedia.org/wiki/Nh%C3%A0_Tr%E1%BA%A7n",
            4: "https://vi.wikipedia.org/wiki/Nh%C3%A0_L%C3%AA_s%C6%A1"
        }
    },
    "grade10_lesson17": {
        url: "https://vi.wikipedia.org/wiki/%C4%90%E1%BA%A1i_Vi%E1%BB%87t",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/V%C4%83n_h%E1%BB%8Da_Vi%E1%BB%87t_Nam",
            2: "https://vi.wikipedia.org/wiki/Qu%E1%BB%91c_T%E1%BB%AD_Gi%C3%A1m",
            3: "https://vi.wikipedia.org/wiki/Ch%E1%BB%AF_N%C3%B4m",
            4: "https://vi.wikipedia.org/wiki/Ph%E1%BA%ADt_gi%C3%A1o_Vi%E1%BB%87t_Nam"
        }
    },

    // ============ GRADE 11 ============
    "grade11_lesson1": {
        url: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_t%C6%B0_s%E1%BA%A3n",
        cardUrls: {
            2: "https://vi.wikipedia.org/wiki/N%E1%BB%99i_chi%E1%BA%BFn_Anh",
            3: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_gi%C3%A0nh_%C4%91%E1%BB%99c_l%E1%BA%ADp_Hoa_K%E1%BB%B3",
            4: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_Ph%C3%A1p",
            5: "https://vi.wikipedia.org/wiki/Tuy%C3%AAn_ng%C3%B4n_Nh%C3%A2n_quy%E1%BB%81n_v%C3%A0_D%C3%A2n_quy%E1%BB%81n"
        }
    },
    "grade11_lesson2": {
        url: "https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_t%C6%B0_b%E1%BA%A3n",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_t%C6%B0_b%E1%BA%A3n",
            2: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_c%C3%B4ng_nghi%E1%BB%87p",
            3: "https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_%C4%91%E1%BA%BF_qu%E1%BB%91c"
        }
    },
    "grade11_lesson3": {
        url: "https://vi.wikipedia.org/wiki/Li%C3%AAn_X%C3%B4",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_Th%C3%A1ng_M%C6%B0%E1%BB%9Di_Nga",
            2: "https://vi.wikipedia.org/wiki/Li%C3%AAn_X%C3%B4",
            3: "https://vi.wikipedia.org/wiki/S%E1%BB%B1_tan_r%C3%A3_c%E1%BB%A7a_Li%C3%AAn_X%C3%B4",
            4: "https://vi.wikipedia.org/wiki/Mikhail_Gorbachyov"
        }
    },
    "grade11_lesson4": {
        url: "https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_x%C3%A3_h%E1%BB%99i",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_x%C3%A3_h%E1%BB%99i",
            2: "https://vi.wikipedia.org/wiki/Trung_Qu%E1%BB%91c",
            3: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam",
            4: "https://vi.wikipedia.org/wiki/Cuba"
        }
    },
    "grade11_lesson5": {
        url: "https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_Nam_%C3%81",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_th%E1%BB%B1c_d%C3%A2n",
            2: "https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_D%C6%B0%C6%A1ng_thu%E1%BB%99c_Ph%C3%A1p",
            3: "https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_%E1%BA%A4n_%C4%91%E1%BB%99_H%C3%A0_Lan"
        }
    },
    "grade11_lesson6": {
        url: "https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_Nam_%C3%81",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Phi_th%E1%BB%B1c_d%C3%A2n_h%C3%B3a",
            2: "https://vi.wikipedia.org/wiki/Indonesia",
            3: "https://vi.wikipedia.org/wiki/Philippines",
            4: "https://vi.wikipedia.org/wiki/Myanmar"
        }
    },
    "grade11_lesson7": {
        url: "https://vi.wikipedia.org/wiki/L%E1%BB%8Bch_s%E1%BB%AD_qu%C3%A2n_s%E1%BB%B1_Vi%E1%BB%87t_Nam",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_(938)",
            2: "https://vi.wikipedia.org/wiki/Kh%E1%BB%9Fi_ngh%C4%A9a_Lam_S%C6%A1n",
            3: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_Tr%E1%BB%8Bnh%E2%80%93Nguy%E1%BB%85n",
            4: "https://vi.wikipedia.org/wiki/Quang_Trung"
        }
    },
    "grade11_lesson8": {
        url: "https://vi.wikipedia.org/wiki/L%E1%BB%8Bch_s%E1%BB%AD_qu%C3%A2n_s%E1%BB%B1_Vi%E1%BB%87t_Nam",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ngh%E1%BB%87_thu%E1%BA%ADt_qu%C3%A2n_s%E1%BB%B1",
            2: "https://vi.wikipedia.org/wiki/Tr%E1%BA%A7n_H%C6%B0ng_%C4%90%E1%BA%A1o",
            3: "https://vi.wikipedia.org/wiki/Nguy%E1%BB%85n_Hu%E1%BB%87",
            4: "https://vi.wikipedia.org/wiki/V%C3%B5_Nguy%C3%AAn_Gi%C3%A1p"
        }
    },
    "grade11_lesson9": {
        url: "https://vi.wikipedia.org/wiki/C%E1%BA%A3i_c%C3%A1ch",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/H%E1%BB%93_Qu%C3%BD_Ly",
            2: "https://vi.wikipedia.org/wiki/L%C3%AA_Th%C3%A1nh_T%C3%B4ng",
            3: "https://vi.wikipedia.org/wiki/Minh_M%E1%BA%A1ng"
        }
    },
    "grade11_lesson10": {
        url: "https://vi.wikipedia.org/wiki/Bi%E1%BB%83n_%C4%90%C3%B4ng",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Bi%E1%BB%83n_%C4%90%C3%B4ng",
            2: "https://vi.wikipedia.org/wiki/Qu%E1%BA%A7n_%C4%91%E1%BA%A3o_Ho%C3%A0ng_Sa",
            3: "https://vi.wikipedia.org/wiki/Qu%E1%BA%A7n_%C4%91%E1%BA%A3o_Tr%C6%B0%E1%BB%9Dng_Sa"
        }
    },
    "grade11_lesson11": {
        url: "https://vi.wikipedia.org/wiki/L%C3%AA_Th%C3%A1nh_T%C3%B4ng",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/L%C3%AA_Th%C3%A1nh_T%C3%B4ng",
            2: "https://vi.wikipedia.org/wiki/Lu%E1%BA%ADt_H%E1%BB%93ng_%C4%90%E1%BB%A9c",
            3: "https://vi.wikipedia.org/wiki/Nh%C3%A0_L%C3%AA_s%C6%A1"
        }
    },
    "grade11_lesson12": {
        url: "https://vi.wikipedia.org/wiki/Minh_M%E1%BA%A1ng",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Minh_M%E1%BA%A1ng",
            2: "https://vi.wikipedia.org/wiki/Nh%C3%A0_Nguy%E1%BB%85n",
            3: "https://vi.wikipedia.org/wiki/Kinh_th%C3%A0nh_Hu%E1%BA%BF"
        }
    },
    "grade11_lesson13": {
        url: "https://vi.wikipedia.org/wiki/Bi%E1%BB%83n_%C4%90%C3%B4ng",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Bi%E1%BB%83n_%C4%90%C3%B4ng",
            2: "https://vi.wikipedia.org/wiki/C%C3%B4ng_%C6%B0%E1%BB%9Bc_Li%C3%AAn_H%E1%BB%A3p_Qu%E1%BB%91c_v%E1%BB%81_Lu%E1%BA%ADt_bi%E1%BB%83n",
            3: "https://vi.wikipedia.org/wiki/Qu%E1%BA%A7n_%C4%91%E1%BA%A3o_Ho%C3%A0ng_Sa"
        }
    },

    // ============ GRADE 12 ============
    "grade12_lesson1": {
        url: "https://vi.wikipedia.org/wiki/Li%C3%AAn_H%E1%BB%A3p_Qu%E1%BB%91c",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Li%C3%AAn_H%E1%BB%A3p_Qu%E1%BB%91c",
            2: "https://vi.wikipedia.org/wiki/H%E1%BB%99i_Qu%E1%BB%91c_Li%C3%AAn",
            3: "https://vi.wikipedia.org/wiki/H%E1%BB%99i_%C4%91%E1%BB%93ng_B%E1%BA%A3o_an_Li%C3%AAn_H%E1%BB%A3p_Qu%E1%BB%91c",
            5: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam_trong_Li%C3%AAn_H%E1%BB%A3p_Qu%E1%BB%91c"
        }
    },
    "grade12_lesson2": {
        url: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADt_t%E1%BB%B1_th%E1%BA%BF_gi%E1%BB%9Bi_m%E1%BB%9Bi",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_L%E1%BA%A1nh",
            2: "https://vi.wikipedia.org/wiki/S%E1%BB%B1_tan_r%C3%A3_c%E1%BB%A7a_Li%C3%AAn_X%C3%B4",
            3: "https://vi.wikipedia.org/wiki/To%C3%A0n_c%E1%BA%A7u_h%C3%B3a"
        }
    },
    "grade12_lesson3": {
        url: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_h%E1%BB%99i_c%C3%A1c_qu%E1%BB%91c_gia_%C4%90%C3%B4ng_Nam_%C3%81",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_h%E1%BB%99i_c%C3%A1c_qu%E1%BB%91c_gia_%C4%90%C3%B4ng_Nam_%C3%81",
            2: "https://vi.wikipedia.org/wiki/Tuy%C3%AAn_b%E1%BB%91_B%C4%83ng_C%E1%BB%91c",
            3: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam"
        }
    },
    "grade12_lesson4": {
        url: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_Th%C3%A1ng_T%C3%A1m",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_Th%C3%A1ng_T%C3%A1m",
            2: "https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh",
            3: "https://vi.wikipedia.org/wiki/Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_(Vi%E1%BB%87t_Nam)"
        }
    },
    "grade12_lesson5": {
        url: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_%C4%90%C3%B4ng_D%C6%B0%C6%A1ng",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_%C4%90%C3%B4ng_D%C6%B0%C6%A1ng",
            2: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_d%E1%BB%8Bch_Vi%E1%BB%87t_B%E1%BA%AFc_Thu_%C4%90%C3%B4ng_1947",
            3: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_%C4%90i%E1%BB%87n_Bi%C3%AAn_Ph%E1%BB%A7",
            4: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_%C4%91%E1%BB%8Bnh_Gen%C3%A8ve_1954"
        }
    },
    "grade12_lesson6": {
        url: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_Vi%E1%BB%87t_Nam",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_Vi%E1%BB%87t_Nam",
            2: "https://vi.wikipedia.org/wiki/S%E1%BB%B1_ki%E1%BB%87n_T%E1%BA%BFt_M%E1%BA%ADu_Th%C3%A2n",
            3: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_%C4%91%E1%BB%8Bnh_Paris_1973"
        }
    },
    "grade12_lesson7": {
        url: "https://vi.wikipedia.org/wiki/S%E1%BB%B1_ki%E1%BB%87n_30_th%C3%A1ng_4_n%C4%83m_1975",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/S%E1%BB%B1_ki%E1%BB%87n_30_th%C3%A1ng_4_n%C4%83m_1975",
            2: "https://vi.wikipedia.org/wiki/%C4%90%E1%BB%95i_M%E1%BB%9Bi",
            3: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam"
        }
    },
    "grade12_lesson8": {
        url: "https://vi.wikipedia.org/wiki/%C4%90%E1%BB%95i_M%E1%BB%9Bi",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/%C4%90%E1%BB%95i_M%E1%BB%9Bi",
            2: "https://vi.wikipedia.org/wiki/Kinh_t%E1%BA%BF_Vi%E1%BB%87t_Nam",
            3: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam"
        }
    },
    "grade12_lesson9": {
        url: "https://vi.wikipedia.org/wiki/Ngo%E1%BA%A1i_giao_Vi%E1%BB%87t_Nam",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Ngo%E1%BA%A1i_giao_Vi%E1%BB%87t_Nam",
            2: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_h%E1%BB%99i_c%C3%A1c_qu%E1%BB%91c_gia_%C4%90%C3%B4ng_Nam_%C3%81",
            3: "https://vi.wikipedia.org/wiki/T%E1%BB%95_ch%E1%BB%A9c_Th%C6%B0%C6%A1ng_m%E1%BA%A1i_Th%E1%BA%BF_gi%E1%BB%9Bi"
        }
    },
    "grade12_lesson10": {
        url: "https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh",
            2: "https://vi.wikipedia.org/wiki/T%C6%B0_t%C6%B0%E1%BB%9Fng_H%E1%BB%93_Ch%C3%AD_Minh",
            3: "https://vi.wikipedia.org/wiki/L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh"
        }
    },
    "grade12_lesson11": {
        url: "https://vi.wikipedia.org/wiki/Di_s%E1%BA%A3n_v%C4%83n_h%C3%B3a",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Di_s%E1%BA%A3n_v%C4%83n_h%C3%B3a",
            2: "https://vi.wikipedia.org/wiki/Di_s%E1%BA%A3n_th%E1%BA%BF_gi%E1%BB%9Bi_t%E1%BA%A1i_Vi%E1%BB%87t_Nam",
            3: "https://vi.wikipedia.org/wiki/UNESCO"
        }
    },
    "grade12_lesson12": {
        url: "https://vi.wikipedia.org/wiki/L%E1%BB%8Bch_s%E1%BB%AD_Vi%E1%BB%87t_Nam",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/L%E1%BB%8Bch_s%E1%BB%AD_Vi%E1%BB%87t_Nam",
            2: "https://vi.wikipedia.org/wiki/Di_t%C3%ADch_l%E1%BB%8Bch_s%E1%BB%AD",
            3: "https://vi.wikipedia.org/wiki/V%C4%83n_h%C3%B3a_Vi%E1%BB%87t_Nam"
        }
    },
    "grade12_lesson13": {
        url: "https://vi.wikipedia.org/wiki/C%E1%BB%99ng_%C4%91%E1%BB%93ng_ASEAN",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/C%E1%BB%99ng_%C4%91%E1%BB%93ng_ASEAN",
            2: "https://vi.wikipedia.org/wiki/Hi%E1%BA%BFn_ch%C6%B0%C6%A1ng_ASEAN",
            3: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_h%E1%BB%99i_c%C3%A1c_qu%E1%BB%91c_gia_%C4%90%C3%B4ng_Nam_%C3%81"
        }
    },
    "grade12_lesson14": {
        url: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_%C4%90i%E1%BB%87n_Bi%C3%AAn_Ph%E1%BB%A7",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_%C4%90i%E1%BB%87n_Bi%C3%AAn_Ph%E1%BB%A7",
            2: "https://vi.wikipedia.org/wiki/V%C3%B5_Nguy%C3%AAn_Gi%C3%A1p",
            3: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_%C4%91%E1%BB%8Bnh_Gen%C3%A8ve_1954"
        }
    },
    "grade12_lesson15": {
        url: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_d%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_d%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh",
            2: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_d%E1%BB%8Bch_T%C3%A2y_Nguy%C3%AAn",
            3: "https://vi.wikipedia.org/wiki/S%E1%BB%B1_ki%E1%BB%87n_30_th%C3%A1ng_4_n%C4%83m_1975"
        }
    },
    "grade12_lesson16": {
        url: "https://vi.wikipedia.org/wiki/B%E1%BA%A3o_t%E1%BB%93n_di_s%E1%BA%A3n_v%C4%83n_h%C3%B3a",
        cardUrls: {
            1: "https://vi.wikipedia.org/wiki/Di_s%E1%BA%A3n_v%C4%83n_h%C3%B3a",
            2: "https://vi.wikipedia.org/wiki/Di_s%E1%BA%A3n_th%E1%BA%BF_gi%E1%BB%9Bi_t%E1%BA%A1i_Vi%E1%BB%87t_Nam",
            3: "https://vi.wikipedia.org/wiki/Ph%E1%BB%91_c%E1%BB%95_H%E1%BB%99i_An"
        }
    }
};

// Process each lesson file
let processed = 0;
let errors = [];

for (const [lessonId, data] of Object.entries(urlData)) {
    const filePath = path.join(lessonsDir, lessonId + '.json');

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lesson = JSON.parse(content);

        // Add lesson-level URL
        lesson.url = data.url;

        // Add card-level URLs
        if (data.cardUrls) {
            for (const [cardId, cardUrl] of Object.entries(data.cardUrls)) {
                const card = lesson.cards.find(c => c.id === parseInt(cardId));
                if (card) {
                    card.url = cardUrl;
                }
            }
        }

        // Write back with pretty formatting
        fs.writeFileSync(filePath, JSON.stringify(lesson, null, 4) + '\\n', 'utf8');
        processed++;
        console.log('OK: ' + lessonId);
    } catch (err) {
        errors.push(lessonId + ': ' + err.message);
        console.error('ERR: ' + lessonId + ' - ' + err.message);
    }
}

console.log('\\nDone! Processed: ' + processed + '/' + Object.keys(urlData).length);
if (errors.length > 0) {
    console.log('Errors:', errors);
}
