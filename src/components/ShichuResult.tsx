import Image from 'next/image';
import { ShichuResult } from '@/lib/shichusuimei/calculator';
import shichuData from '@/data/shichusuimei.json';

// 型定義の拡張 (JSONデータ用)
type ShichuData = {
    dayMaster: Record<string, { title: string; nature: string; details: string; message: string }>;
    tenGen: Record<string, { title: string; meaning: string; description: string }>;
    junniUn: Record<string, { title: string; text: string }>;
};

const DATA = shichuData as ShichuData;

// 日干とイラストファイルのマッピング
const DAY_MASTER_IMAGES: Record<string, string> = {
    '甲': '/images/daymaster/daymaster_tree.png',     // 大樹
    '乙': '/images/daymaster/daymaster_flower.png',   // 草花
    '丙': '/images/daymaster/daymaster_sun.png',      // 太陽
    '丁': '/images/daymaster/daymaster_candle.png',   // 灯火
    '戊': '/images/daymaster/daymaster_mountain.png', // 山岳
    '己': '/images/daymaster/daymaster_earth.png',    // 大地
    '庚': '/images/daymaster/daymaster_sword.png',    // 剣
    '辛': '/images/daymaster/daymaster_jewel.png',    // 宝石
    '壬': '/images/daymaster/daymaster_ocean.png',    // 大海
    '癸': '/images/daymaster/daymaster_rain.png',     // 雨露
};

export default function ShichuResultCard({ result }: { result: ShichuResult }) {
    const dayMasterInfo = DATA.dayMaster[result.dayMaster];

    // 五行バランスの表示用
    const gogyoEntries = Object.entries(result.gogyoBalance);

    return (
        <div className="space-y-12 animate-fade-in-up delay-100">

            {/* 命式表 (Chart) */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-indigo-50">
                <h3 className="text-center text-sm font-medium text-gray-500 mb-6 tracking-widest uppercase">Destiny Chart</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-gray-800">
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">時柱</p>
                        <div className="font-serif text-xl border-b border-gray-100 pb-2">{result.hour.gan}</div>
                        <div className="font-serif text-xl">{result.hour.shi}</div>
                        <div className="text-xs text-indigo-600 mt-2">{result.hour.tenGen}</div>
                        <div className="text-xs text-gray-500">{result.hour.junniUn}</div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">日柱 (私)</p>
                        <div className="font-serif text-xl border-b border-gray-100 pb-2 bg-indigo-50 rounded text-indigo-900">{result.day.gan}</div>
                        <div className="font-serif text-xl bg-indigo-50 rounded text-indigo-900">{result.day.shi}</div>
                        <div className="text-xs text-indigo-600 mt-2">-</div>
                        <div className="text-xs text-gray-500">{result.day.junniUn}</div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">月柱</p>
                        <div className="font-serif text-xl border-b border-gray-100 pb-2">{result.month.gan}</div>
                        <div className="font-serif text-xl">{result.month.shi}</div>
                        <div className="text-xs text-indigo-600 mt-2">{result.month.tenGen}</div>
                        <div className="text-xs text-gray-500">{result.month.junniUn}</div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400">年柱</p>
                        <div className="font-serif text-xl border-b border-gray-100 pb-2">{result.year.gan}</div>
                        <div className="font-serif text-xl">{result.year.shi}</div>
                        <div className="text-xs text-indigo-600 mt-2">{result.year.tenGen}</div>
                        <div className="text-xs text-gray-500">{result.year.junniUn}</div>
                    </div>
                </div>
            </section>

            {/* 日干 (本質) の詳細 - イラスト付き */}
            <section className="bg-white rounded-xl shadow-sm p-8 md:p-12 border-t-4 border-indigo-900 leading-loose">
                {/* ヘッダー: タイトルとイラスト */}
                <div className="flex flex-col items-center text-center mb-10">
                    <span className="text-sm font-bold text-indigo-600 tracking-wider mb-2">あなたという自然</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">{dayMasterInfo.title}</h2>

                    {/* 日干イラスト */}
                    {DAY_MASTER_IMAGES[result.dayMaster] && (
                        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                            <Image
                                src={DAY_MASTER_IMAGES[result.dayMaster]}
                                alt={dayMasterInfo.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                    )}

                    <p className="text-xl font-medium text-gray-900 italic">"{dayMasterInfo.nature}"</p>
                </div>

                {/* 詳細説明 */}
                <div className="prose prose-lg text-gray-700 max-w-none">
                    <div className="whitespace-pre-wrap font-serif text-gray-600 space-y-6 leading-loose">
                        {dayMasterInfo.details}
                    </div>
                </div>

                {/* Soul Message */}
                <div className="mt-10 bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                    <p className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-2">Soul Message</p>
                    <p className="text-indigo-800 italic text-lg font-serif">
                        {dayMasterInfo.message}
                    </p>
                </div>
            </section>

            {/* 中心星 (月柱通変星) の説明 */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-purple-500 mr-3 block"></span>
                    中心となる才能: {result.month.tenGen} ({DATA.tenGen[result.month.tenGen]?.title})
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    {DATA.tenGen[result.month.tenGen]?.description}
                </p>
            </section>

        </div>
    );
}
