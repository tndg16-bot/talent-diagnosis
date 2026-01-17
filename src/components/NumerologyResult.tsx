import numerologyData from '../data/numerology.json';

interface NumerologyResultProps {
    lifePathNumber: number;
    soulNumber?: number | null;
    personalityNumber?: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DATA = numerologyData as any;

export default function NumerologyResult({ lifePathNumber, soulNumber, personalityNumber }: NumerologyResultProps) {
    const data = DATA.lifePathNumbers[lifePathNumber.toString()];
    const soulData = soulNumber ? DATA.soulNumbers?.[soulNumber.toString()] : null;
    const personalityData = personalityNumber ? DATA.personalityNumbers?.[personalityNumber.toString()] : null;

    if (!data) return null;

    return (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8 border border-white/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            {/* Life Path Number */}
            <div className="text-center mb-8 relative z-10">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Life Path Number</p>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-5xl font-serif mb-4 shadow-lg ring-4 ring-indigo-50">
                    {lifePathNumber}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{data.title}</h2>
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    {data.keywords.map((keyword: string) => (
                        <span key={keyword} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium tracking-wide">
                            #{keyword}
                        </span>
                    ))}
                </div>
            </div>

            <div className="space-y-6 relative z-10 text-gray-700 leading-relaxed">
                <section>
                    <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-indigo-500 pl-3 mb-3">
                        基本的性質
                    </h3>
                    <p className="text-justify">{data.description}</p>
                </section>

                <section className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                    <h3 className="flex items-center text-lg font-semibold text-purple-900 mb-3">
                        <span className="text-2xl mr-2">✨</span> 魂のメッセージ
                    </h3>
                    <p className="italic text-purple-800 font-medium">
                        "{data.spiritualMessage}"
                    </p>
                </section>

                {/* Soul Number & Personality Number (if name provided) */}
                {(soulData || personalityData) && (
                    <section className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="text-xl mr-2">📛</span> 名前から読み解くナンバー
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {soulData && (
                                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                                    <div className="flex items-center mb-2">
                                        <span className="w-8 h-8 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center font-bold mr-2">
                                            {soulNumber}
                                        </span>
                                        <div>
                                            <p className="text-xs text-rose-500 uppercase tracking-wider">Soul Number</p>
                                            <p className="font-semibold text-rose-800">{soulData.title}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-rose-700">{soulData.description}</p>
                                </div>
                            )}
                            {personalityData && (
                                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                                    <div className="flex items-center mb-2">
                                        <span className="w-8 h-8 rounded-full bg-teal-200 text-teal-700 flex items-center justify-center font-bold mr-2">
                                            {personalityNumber}
                                        </span>
                                        <div>
                                            <p className="text-xs text-teal-500 uppercase tracking-wider">Personality</p>
                                            <p className="font-semibold text-teal-800">{personalityData.title}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-teal-700">{personalityData.description}</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
