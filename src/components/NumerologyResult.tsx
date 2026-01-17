import numerologyData from '../data/numerology.json';

interface NumerologyResultProps {
    lifePathNumber: number;
}

export default function NumerologyResult({ lifePathNumber }: NumerologyResultProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (numerologyData.lifePathNumbers as any)[lifePathNumber.toString()];

    if (!data) return null;

    return (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8 border border-white/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

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
            </div>
        </div>
    );
}
