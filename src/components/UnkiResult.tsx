import { UnkiYear } from '@/lib/unki/calculator';

export default function UnkiResultCard({ cycles }: { cycles: UnkiYear[] }) {
    return (
        <div className="space-y-8 animate-fade-in-up delay-200">

            <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6 bg-gray-900 text-white">
                    <h3 className="text-lg font-serif tracking-widest">Fortune Cycle</h3>
                    <p className="text-xs text-gray-400 mt-1">今後10年間の運気の流れ</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Year</th>
                                <th className="px-6 py-4 font-medium">Theme</th>
                                <th className="px-6 py-4 font-medium">Energy</th>
                                <th className="px-6 py-4 font-medium">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cycles.map((cycle) => (
                                <tr
                                    key={cycle.year}
                                    className={`
                    hover:bg-gray-50 transition-colors
                    ${cycle.tenchuuSatsu ? 'bg-gray-100/50' : ''}
                  `}
                                >
                                    <td className="px-6 py-4 font-serif text-lg text-gray-900">
                                        {cycle.year}
                                        {cycle.tenchuuSatsu && <span className="ml-2 text-[10px] bg-gray-500 text-white px-2 py-0.5 rounded-full">天中殺</span>}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-indigo-700">
                                        {cycle.theme}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {cycle.energy}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs max-w-xs">
                                        数秘サイクル: {cycle.personalYearNumber}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="text-center text-xs text-gray-400 p-4">
                ※ 天中殺（空亡）の期間は、新しいことを始めるよりも、内面の充実に時間を費やすことが推奨されます。
            </div>

        </div>
    );
}
