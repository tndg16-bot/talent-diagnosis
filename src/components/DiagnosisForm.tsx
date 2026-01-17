'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DiagnosisForm() {
    const router = useRouter();
    const [birthDate, setBirthDate] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simple validation
        if (!birthDate) {
            alert('生年月日を入力してください');
            setLoading(false);
            return;
        }

        // Redirect to result page with query params
        // In a real app we might use POST state or Context, but query params are easy for sharing
        const params = new URLSearchParams();
        params.set('birthDate', birthDate);
        if (name) params.set('name', name);

        router.push(`/result?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6 animate-fade-in-up">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 tracking-wide">
                    お名前 (任意・ローマ字推奨)
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Taro Yamada"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-100 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
                />
                <p className="text-xs text-gray-400">
                    ※ ローマ字で入力すると「ソウルナンバー」と「パーソナリティナンバー」も診断できます
                </p>
            </div>

            <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 tracking-wide">
                    生年月日 <span className="text-red-400">*</span>
                </label>
                <input
                    type="date"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-100 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>診断中...</span>
                    </span>
                ) : (
                    '才能を診断する'
                )}
            </button>
        </form>
    );
}
