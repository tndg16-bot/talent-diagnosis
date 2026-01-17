'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { UnkiYear } from '@/lib/unki/calculator';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface LuckGraphProps {
    cycles: UnkiYear[];
}

// 十二運のエネルギー値マッピング (グラフ描画用)
const ENERGY_LEVELS: Record<string, number> = {
    "帝旺": 12, "建禄": 11, "冠帯": 10,
    "沐浴": 9, "長生": 8, "養": 7,
    "胎": 6, "衰": 8, "病": 4, // 衰は安定しているので高め設定、病は下がる
    "死": 2, "墓": 5, "絶": 1
};

export default function LuckGraph({ cycles }: LuckGraphProps) {
    const data = {
        labels: cycles.map(c => c.year.toString()),
        datasets: [
            {
                fill: true,
                label: '運気エネルギー (十二運)',
                data: cycles.map(c => ENERGY_LEVELS[c.energy] || 5),
                borderColor: 'rgb(99, 102, 241)', // indigo-500
                backgroundColor: (context: ScriptableContext<'line'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
                    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
                    return gradient;
                },
                tension: 0.4,
                pointBackgroundColor: (context: ScriptableContext<'line'>) => {
                    // 天中殺の年は赤くする
                    const index = context.dataIndex;
                    return cycles[index]?.tenchuuSatsu ? 'rgb(239, 68, 68)' : 'rgb(99, 102, 241)';
                },
                pointRadius: 6,
                pointHoverRadius: 8,
            },
            {
                type: 'line' as const,
                label: '数秘サイクル',
                data: cycles.map(c => c.personalYearNumber),
                borderColor: 'rgba(234, 179, 8, 0.5)', // yellow-500
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0.2
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Fortune Cycle Graph',
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (context: any) => {
                        const index = context.dataIndex;
                        const cycle = cycles[index];
                        if (context.datasetIndex === 0) {
                            return `${cycle.energy} (Theme: ${cycle.theme}) ${cycle.tenchuuSatsu ? '★天中殺' : ''}`;
                        }
                        return `Cycle: ${cycle.personalYearNumber}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 13,
                display: false // 数値自体に意味はないので隠す
            }
        }
    };

    return (
        <div className="w-full h-[300px] md:h-[400px] p-4 bg-white/50 rounded-xl border border-indigo-50">
            <Line options={options} data={data} />
        </div>
    );
}
