import { Suspense } from 'react';
import { calcLifePathNumber, calcSoulNumber, calcPersonalityNumber } from '@/lib/numerology/calculator';
import { calcShichuSuimei } from '@/lib/shichusuimei/calculator';
import { calcUnkiCycle } from '@/lib/unki/calculator';
import { generateSpiritualAdvice } from '@/lib/ai/advisor';
import NumerologyResult from '@/components/NumerologyResult';
import ShichuResultCard from '@/components/ShichuResult';
import UnkiResultCard from '@/components/UnkiResult';
import LuckGraph from '@/components/LuckGraph';
import AiAdvisor from '@/components/AiAdvisor';
import AiAdvisorSkeleton from '@/components/AiAdvisorSkeleton';
import CalculationMethod from '@/components/CalculationMethod';
import Link from 'next/link';

// データインポート (タイトル取得用)
import numerologyData from '@/data/numerology.json';
import shichuData from '@/data/shichusuimei.json';

interface SearchParams {
    birthDate?: string;
    birthTime?: string;
    name?: string;
}

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export default async function ResultPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { birthDate, birthTime, name } = await searchParams;

    if (!birthDate) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">生年月日が指定されていません。</p>
                    <Link href="/" className="text-indigo-600 hover:underline">
                        トップに戻る
                    </Link>
                </div>
            </div>
        );
    }

    // 1. Numerology
    const lifePathNumber = calcLifePathNumber(birthDate);
    const soulNumber = name ? calcSoulNumber(name) : null;
    const personalityNumber = name ? calcPersonalityNumber(name) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lpData = (numerologyData.lifePathNumbers as any)[lifePathNumber.toString()];

    // 2. Shichu Suimei
    const shichuResult = calcShichuSuimei(birthDate, birthTime || '12:00');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dmData = (shichuData.dayMaster as any)[shichuResult.dayMaster];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tgData = (shichuData.tenGen as any)[shichuResult.month.tenGen];

    // 3. Unki Cycle
    const dayStemIdx = HEAVENLY_STEMS.indexOf(shichuResult.day.gan);
    const dayBranchIdx = EARTHLY_BRANCHES.indexOf(shichuResult.day.shi);
    const currentYear = new Date().getFullYear();
    const unkiResult = calcUnkiCycle(birthDate, shichuResult.dayMaster, dayStemIdx, dayBranchIdx, currentYear);

    // 4. AI Advice (Start Promise)
    const advicePromise = generateSpiritualAdvice({
        lifePathNumber,
        lifePathTitle: lpData?.title || '',
        dayMaster: shichuResult.dayMaster,
        dayMasterTitle: dmData?.title || '',
        tenGen: shichuResult.month.tenGen,
        tenGenTitle: tgData?.title || '',
        currentYearTheme: unkiResult[0].theme,
        isTenchuuSatsu: unkiResult[0].tenchuuSatsu
    });

    return (
        <main className="min-h-screen bg-[#fcfcfc] relative text-gray-800 font-sans pb-32">
            {/* Background decoration */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100 to-transparent rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
                <header className="flex items-center justify-between mb-16 border-b border-gray-100 pb-4">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-2">
                        ← Back
                    </Link>
                    <div className="text-center">
                        <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-900">Diagnosis Result</h1>
                        <p className="text-[10px] text-gray-400 mt-1 tracking-widest">{birthDate}</p>
                    </div>
                    <div className="w-12"></div>
                </header>

                <div className="space-y-24">
                    {/* Section 1: Numerology */}
                    <section>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-4xl text-gray-200 font-serif font-bold">01</span>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Soul Number</h2>
                        </div>
                        <NumerologyResult lifePathNumber={lifePathNumber} soulNumber={soulNumber} personalityNumber={personalityNumber} />
                    </section>

                    {/* Section 2: Shichu Suimei */}
                    <section>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-4xl text-gray-200 font-serif font-bold">02</span>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Destiny Matrix</h2>
                        </div>
                        <ShichuResultCard result={shichuResult} />
                    </section>

                    {/* Section 3: Fortune Cycle */}
                    <section>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-4xl text-gray-200 font-serif font-bold">03</span>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Time Flow</h2>
                        </div>
                        <LuckGraph cycles={unkiResult} />
                        <div className="h-8"></div>
                        <UnkiResultCard cycles={unkiResult} />
                    </section>

                    {/* Section 4: AI Advisor */}
                    <section>
                        <Suspense fallback={<AiAdvisorSkeleton />}>
                            <AiAdvisor advicePromise={advicePromise} />
                        </Suspense>
                    </section>

                    {/* Section 5: Calculation Method */}
                    <section>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-4xl text-gray-200 font-serif font-bold">05</span>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">How It Works</h2>
                        </div>
                        <CalculationMethod />
                    </section>
                </div>
            </div>
        </main>
    );
}
