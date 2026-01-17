import { Solar } from 'lunar-javascript';
import { getTenGen, getJunniUn, getZogan } from './mappings';

export interface Pillar {
    gan: string; // 天干 (例: 甲)
    shi: string; // 地支 (例: 子)
    tenGen: string; // 通変星 (天干と日干の関係)
    junniUn: string; // 十二運
    zogan: string[]; // 蔵干
}

export interface ShichuResult {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
    dayMaster: string; // 日干 (本質)
    gogyoBalance: Record<string, number>; // 木火土金水のバランス
}

// 四柱推命計算のメイン関数
// 時刻が不明の場合は hour=12 (正午) をデフォルトとする
export function calcShichuSuimei(birthDate: string, birthTime: string = '12:00'): ShichuResult {
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);

    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const bazi = lunar.getEightChar();

    const dayMaster = bazi.getDayGan();

    return {
        year: {
            gan: bazi.getYearGan(),
            shi: bazi.getYearZhi(),
            tenGen: getTenGen(dayMaster, bazi.getYearGan()),
            junniUn: getJunniUn(dayMaster, bazi.getYearZhi()),
            zogan: getZogan(bazi.getYearZhi()),
        },
        month: {
            gan: bazi.getMonthGan(),
            shi: bazi.getMonthZhi(),
            tenGen: getTenGen(dayMaster, bazi.getMonthGan()),
            junniUn: getJunniUn(dayMaster, bazi.getMonthZhi()),
            zogan: getZogan(bazi.getMonthZhi()),
        },
        day: {
            gan: bazi.getDayGan(),
            shi: bazi.getDayZhi(),
            tenGen: '比肩', // 自分自身は常に比肩（または空欄）
            junniUn: getJunniUn(dayMaster, bazi.getDayZhi()),
            zogan: getZogan(bazi.getDayZhi()),
        },
        hour: {
            gan: bazi.getTimeGan(),
            shi: bazi.getTimeZhi(),
            tenGen: getTenGen(dayMaster, bazi.getTimeGan()),
            junniUn: getJunniUn(dayMaster, bazi.getTimeZhi()),
            zogan: getZogan(bazi.getTimeZhi()),
        },
        dayMaster: dayMaster,
        gogyoBalance: calcGogyoBalance([
            bazi.getYearGan(), bazi.getYearZhi(),
            bazi.getMonthGan(), bazi.getMonthZhi(),
            bazi.getDayGan(), bazi.getDayZhi(),
            bazi.getTimeGan(), bazi.getTimeZhi()
        ])
    };
}

// 五行バランス計算
function calcGogyoBalance(chars: string[]) {
    // 簡易実装: 本来は五行の属性判定が必要だが、今回は0で埋める
    // Phase 3で正式実装予定
    const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
    return counts;
}
