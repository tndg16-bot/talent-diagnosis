import { calcLifePathNumber } from '@/lib/numerology/calculator';
import { getJunniUn, getTenGen } from '@/lib/shichusuimei/mappings';

export interface UnkiYear {
    year: number;
    personalYearNumber: number; // 数秘術的サイクル (1-9)
    tenchuuSatsu: boolean; // 天中殺かどうか
    theme: string; // その年のテーマ (通変星ベース)
    energy: string; // その年のエネルギー (十二運ベース)
}

// 十二支インデックス
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天中殺グループ (日干支から決定)
// 0: 戌亥, 1: 申酉, 2: 午未, 3: 辰巳, 4: 寅卯, 5: 子丑
export function calcTenchuuSatsuGroup(dayStemIndex: number, dayBranchIndex: number): string[] {
    // 数理法: (日干 - 日支)
    // 甲(0) - 子(0) = 0 -> 戌亥 (Index 10, 11)
    // 甲(0) - 戌(10) = -10 -> +12 = 2 -> 申酉 (Index 8, 9) NOT MATCH LOGIC DIRECTLY

    // Standard calculation:
    // (Stem - Branch)
    let diff = dayStemIndex - dayBranchIndex;
    if (diff < 0) diff += 12;

    // Diff map to Empty Branches
    // 0 -> 戌亥 (10, 11)
    // 2 -> 申酉 (8, 9)
    // 4 -> 午未 (6, 7)
    // 6 -> 辰巳 (4, 5)
    // 8 -> 寅卯 (2, 3)
    // 10 -> 子丑 (0, 1)

    const map: Record<number, number[]> = {
        0: [10, 11], // 戌亥
        2: [8, 9],   // 申酉
        4: [6, 7],   // 午未
        6: [4, 5],   // 辰巳
        8: [2, 3],   // 寅卯
        10: [0, 1]   // 子丑
    };

    const indices = map[diff];
    return indices.map(i => BRANCHES[i]);
}

// 10年分の運気を計算
export function calcUnkiCycle(birthDate: string, dayMaster: string, dayStemIdx: number, dayBranchIdx: number, startYear: number): UnkiYear[] {
    const result: UnkiYear[] = [];
    const tenchuuSatsuBranches = calcTenchuuSatsuGroup(dayStemIdx, dayBranchIdx);

    // 簡易的な年運ストリーム
    // 実際には毎年干支が変わる (2026: 丙午, 2027: 丁未...)
    // 基準: 2024=甲辰, 2025=乙巳, 2026=丙午
    const BASE_YEAR = 2024;
    const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    for (let i = 0; i < 10; i++) {
        const year = startYear + i;

        // Calculate Personal Year Number (Numerology)
        // Month + Day + Year
        const [y, m, d] = birthDate.split('-').map(Number); // Actually only need m, d
        // Personal Year = m + d + year -> reduce
        let sum = m + d + year;
        sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        while (sum > 9 && ![11, 22, 33].includes(sum)) {
            sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }
        const pyn = sum;

        // Calculate Yearly Pillars
        const diff = year - BASE_YEAR;
        const yearStemIdx = (0 + diff) % 10; // 2024 is 甲(0)
        const yearBranchIdx = (4 + diff) % 12; // 2024 is 辰(4)

        const yearStem = STEMS[(yearStemIdx + 100) % 10]; // Handle negative
        // yearBranchIdx is always positive in this context, so no need for +100 offset
        const yearBranch = BRANCHES[yearBranchIdx % 12];

        const isTenchuu = tenchuuSatsuBranches.includes(yearBranch);

        const tenGen = getTenGen(dayMaster, yearStem);
        const junniUn = getJunniUn(dayMaster, yearBranch);

        result.push({
            year,
            personalYearNumber: pyn,
            tenchuuSatsu: isTenchuu,
            theme: tenGen,
            energy: junniUn
        });
    }

    return result;
}
