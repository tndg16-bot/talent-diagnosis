// mappings.ts
// Corrected and recreated based on public data to resolve file encoding issues.

// 十干 (Heavenly Stems)
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 十二支 (Earthly Branches)
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// Helper to get index
const getStemIndex = (stem: string) => HEAVENLY_STEMS.indexOf(stem);
const getBranchIndex = (branch: string) => EARTHLY_BRANCHES.indexOf(branch);

/**
 * 通変星 (Ten Transformation Stars)
 * @param dayMaster 日干
 * @param targetStem 年月時干
 * @returns 通変星
 */
export function getTenGen(dayMaster: string, targetStem: string): string {
    const dmIdx = getStemIndex(dayMaster);
    const tgIdx = getStemIndex(targetStem);

    if (dmIdx === -1 || tgIdx === -1) return "不明";

    const matrix = [
        // 甲   乙     丙     丁     戊     己     庚     辛     壬     癸
        ["比肩", "劫財", "食神", "傷官", "偏財", "正財", "偏官", "正官", "偏印", "印綬"], // 甲
        ["劫財", "比肩", "傷官", "食神", "正財", "偏財", "正官", "偏官", "印綬", "偏印"], // 乙
        ["偏印", "印綬", "比肩", "劫財", "食神", "傷官", "偏財", "正財", "偏官", "正官"], // 丙
        ["印綬", "偏印", "劫財", "比肩", "傷官", "食神", "正財", "偏財", "正官", "偏官"], // 丁
        ["偏官", "正官", "偏印", "印綬", "比肩", "劫財", "食神", "傷官", "偏財", "正財"], // 戊
        ["正官", "偏官", "印綬", "偏印", "劫財", "比肩", "傷官", "食神", "正財", "偏財"], // 己
        ["偏財", "正財", "偏官", "正官", "偏印", "印綬", "比肩", "劫財", "食神", "傷官"], // 庚
        ["正財", "偏財", "正官", "偏官", "印綬", "偏印", "劫財", "比肩", "傷官", "食神"], // 辛
        ["食神", "傷官", "偏財", "正財", "偏官", "正官", "偏印", "印綬", "比肩", "劫財"], // 壬
        ["傷官", "食神", "正財", "偏財", "正官", "偏官", "印綬", "偏印", "劫財", "比肩"], // 癸
    ];

    return matrix[dmIdx][tgIdx];
}

/**
 * 十二運 (12 Fortune Cycle)
 * @param dayMaster 日干
 * @param branch 十二支
 * @returns 十二運
 */
export function getJunniUn(dayMaster: string, branch: string): string {
    const dmIdx = getStemIndex(dayMaster);
    const brIdx = getBranchIndex(branch);

    if (dmIdx === -1 || brIdx === -1) return "不明";
    
    // Data reconstructed from 60-kanshi list.
    const JUNNIUN_TABLE = [
        // 子     丑    寅     卯     辰    巳     午    未    申    酉    戌    亥
        ["沐浴", "冠帯", "建禄", "帝旺", "衰",  "病",  "死",  "墓",  "絶",  "胎",  "養",  "長生"], // 甲 (陽木)
        ["病",  "衰",  "帝旺", "建禄", "冠帯", "沐浴", "長生","養",  "胎",  "絶",  "墓",  "死"  ], // 乙 (陰木)
        ["胎",  "養",  "長生", "沐浴", "冠帯", "建禄", "帝旺", "衰",  "病",  "死",  "墓",  "絶"  ], // 丙 (陽火)
        ["絶",  "墓",  "死",  "病",  "衰",  "帝旺", "建禄", "冠帯","沐浴","長生","養",  "胎"  ], // 丁 (陰火)
        ["胎",  "養",  "長生", "沐浴", "冠帯", "建禄", "帝旺", "衰",  "病",  "死",  "墓",  "絶"  ], // 戊 (陽土)
        ["絶",  "墓",  "死",  "病",  "衰",  "帝旺", "建禄", "冠帯","沐浴","長生","養",  "胎"  ], // 己 (陰土)
        ["死",  "墓",  "絶",  "胎",  "養",  "長生", "沐浴", "冠帯","建禄","帝旺","衰",  "病"  ], // 庚 (陽金)
        ["長生","養",  "胎",  "絶",  "墓",  "死",  "病",  "衰",  "帝旺","建禄","冠帯","沐浴"], // 辛 (陰金)
        ["帝旺","冠帯","建禄", "沐浴", "長生", "養",  "胎",  "絶",  "墓",  "死",  "病",  "衰"  ], // 壬 (陽水)
        ["建禄","沐浴","長生", "養",  "胎",  "絶",  "墓",  "死",  "病",  "衰", "帝旺","冠帯"], // 癸 (陰水)
    ];

    return JUNNIUN_TABLE[dmIdx][brIdx];
}

/**
 * 蔵干 (Zogan - Hidden Stems)
 * @param branch 十二支
 * @returns 蔵干のリスト
 */
export function getZogan(branch: string): string[] {
    // Based on common Zogan table. Returns all possible hidden stems.
    const ZOGAN_MAP: Record<string, string[]> = {
        '子': ['壬', '癸'],
        '丑': ['癸', '辛', '己'],
        '寅': ['戊', '丙', '甲'],
        '卯': ['甲', '乙'],
        '辰': ['乙', '癸', '戊'],
        '巳': ['戊', '庚', '丙'],
        '午': ['丙', '丁'],
        '未': ['丁', '乙', '己'],
        '申': ['戊', '壬', '庚'],
        '酉': ['庚', '辛'],
        '戌': ['辛', '丁', '戊'],
        '亥': ['戊', '甲', '壬']
    };

    return ZOGAN_MAP[branch] || [];
}