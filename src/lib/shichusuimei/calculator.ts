import { Solar } from 'lunar-javascript';
import { getTenGen, getJunniUn, getZogan } from './mappings';

export interface Pillar {
    gan: string; // 螟ｩ蟷ｲ (萓・ 逕ｲ)
    shi: string; // 蝨ｰ謾ｯ (萓・ 蟄・
    tenGen: string; // 騾壼､画弌 (螟ｩ蟷ｲ縺ｨ譌･蟷ｲ縺ｮ髢｢菫・
    junniUn: string; // 蜊∽ｺ碁°
    zogan: string[]; // 阡ｵ蟷ｲ
}

export interface ShichuResult {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
    dayMaster: string; // 譌･蟷ｲ (譛ｬ雉ｪ)
    gogyoBalance: Record<string, number>; // 譛ｨ轣ｫ蝨滄≡豌ｴ縺ｮ繝舌Λ繝ｳ繧ｹ
}

// 蝗帶浤謗ｨ蜻ｽ險育ｮ励・繝｡繧､繝ｳ髢｢謨ｰ
// 譎ょ綾縺御ｸ肴・縺ｮ蝣ｴ蜷医・ hour=12 (豁｣蜊・ 繧偵ョ繝輔か繝ｫ繝医→縺吶ｋ
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
            tenGen: '豈碑か', // 閾ｪ蛻・・霄ｫ縺ｯ蟶ｸ縺ｫ豈碑か・医∪縺溘・遨ｺ谺・ｼ・
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

// 五行のバランスを計算する（スタブ）
function calcGogyoBalance(chars: string[]) {
    // 本来は蔵干なども考慮して五行の数を集計する
    // Phase 3では未実装のため、ダミーデータを返す
    const counts = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
    return counts;
}
