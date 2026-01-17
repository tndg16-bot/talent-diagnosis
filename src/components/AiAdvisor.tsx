'use client';

import { use } from 'react';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorProps {
    advicePromise: Promise<string>;
}

export default function AiAdvisor({ advicePromise }: AiAdvisorProps) {
    const advice = use(advicePromise);

    return (
        <section className="relative min-h-[400px] mt-20">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl shadow-2xl skew-y-1 transform opacity-90 -z-10"></div>

            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-white border border-white/10 shadow-inner">
                <header className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                        <span className="text-2xl">🧙‍♂️</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-100">
                            Spiritual Guidance
                        </h2>
                        <p className="text-xs text-blue-200 tracking-wider uppercase">Personalized Message from AI Sage</p>
                    </div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none animate-fade-in font-serif leading-loose text-gray-100">
                    <ReactMarkdown>{advice}</ReactMarkdown>
                </div>
            </div>
        </section>
    );
}
