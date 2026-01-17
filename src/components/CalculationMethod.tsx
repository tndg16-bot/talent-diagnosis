'use client';

export default function CalculationMethod() {
    return (
        <section className="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 mr-2 text-sm">
                    ?
                </span>
                人生を変える診断の仕組み
            </h2>

            <div className="space-y-8 max-w-2xl mx-auto">
                {/* 数秘術 */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xl">🔢</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">数秘術（ライフパスナンバー）</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            生年月日の数字をすべて足し合わせ、一桁になるまで還元した数字。
                            あなたの人生の目的・魂のテーマを表します。
                        </p>
                        <div className="mt-2 text-xs text-gray-500 bg-gray-100 rounded p-2 font-mono">
                            例: 1985/5/5 → 1+9+8+5+5+5 = 33（マスターナンバー）
                        </div>
                    </div>
                </div>

                {/* 四柱推命 */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-xl">🏛️</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">四柱推命（八字）</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            生年月日時を旧暦に変換し、年・月・日・時の4つの柱（八字）を算出。
                            日柱の天干（日干）があなたの本質を表します。
                        </p>
                        <div className="mt-2 text-xs text-gray-500 bg-gray-100 rounded p-2 font-mono">
                            （生年月日＋出生時刻）→ 年柱・月柱・日柱・時柱
                        </div>
                    </div>
                </div>

                {/* 運気サイクル */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-xl">🌀</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">運気サイクル</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            年ごとの干支と日干の関係から運気エネルギー（十二運）を算出。
                            天中殺（空亡）期間も自動判定します。
                        </p>
                        <div className="mt-2 text-xs text-gray-500 bg-gray-100 rounded p-2 font-mono">
                            日干 × 年干支 → 通変星 + 十二運
                        </div>
                    </div>
                </div>

                {/* AI連携 */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                        <span className="text-xl">🧙‍♂️</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">AIスピリチュアルアドバイス</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            上記すべての診断結果を統合し、AIがあなただけのパーソナライズされた
                            スピリチュアルメッセージを生成します。
                        </p>
                        <div className="mt-2 text-xs text-gray-500 bg-gray-100 rounded p-2 font-mono">
                            数秘術 + 四柱推命 + 運気 → AI統合アドバイス
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-gray-400">
                ※ 診断結果は参考情報です。人生の決定は最終的にはあなた自身が行ってください。
            </div>
        </section>
    );
}
