import ollama from 'ollama';

interface AdviceContext {
    lifePathNumber: number;
    lifePathTitle: string;
    dayMaster: string;
    dayMasterTitle: string;
    tenGen: string;
    tenGenTitle: string;
    currentYearTheme: string;
    isTenchuuSatsu: boolean;
}

export async function generateSpiritualAdvice(context: AdviceContext): Promise<string> {
    const prompt = `
あなたは世界的に有名なスピリチュアル・ライフコーチであり、古代の叡智（数秘術、四柱推命）に精通した賢者です。
とあるクライアントの診断結果が出ました。この結果を統合し、クライアントの魂に響くような、深遠かつ具体的なアドバイスを授けてください。

【クライアントの魂の設計図】
1. **数秘術 (魂の目的)**: Number ${context.lifePathNumber} - ${context.lifePathTitle}
2. **四柱推命 (本質的な自然)**: ${context.dayMaster} - ${context.dayMasterTitle}
3. **中心的な才能 (武器)**: ${context.tenGen} - ${context.tenGenTitle}
4. **現在の運気**: ${context.currentYearTheme} ${context.isTenchuuSatsu ? "※現在は天中殺（休息と内観の時期）です" : ""}

【リクエスト】
このクライアントに対し、以下の構成でメッセージを作成してください。
文体は丁寧ですが、神秘的で温かみのあるトーン（「です・ます」調）でお願いします。
マークダウン形式で出力してください。

1. **魂の強み**: 数秘術と四柱推命の観点から、この人が本来持っている最強の武器を統合的に解説します。矛盾する要素があれば、それをどう調和させるかも伝えてください。
2. **現在の星回りからのメッセージ**: 今年の運気のテーマに基づき、今何にフォーカスすべきかを具体的に助言してください（特に天中殺の場合は、過ごし方を丁寧に）。
3. **覚醒への鍵**: この人が人生でワンランク上のステージに行くための、抽象的だがハッとするような「魔法の言葉」を贈ってください。

文字数は全体で800文字程度にしてください。
`;

    try {
        // タイムアウト付きでOllamaを呼び出す
        const start = Date.now();
        const TIMEOUT_MS = 5000;

        const responsePromise = ollama.chat({
            model: 'gemma2:9b', // ユーザー指定のモデル
            messages: [{ role: 'user', content: prompt }],
        });

        const timeoutPromise = new Promise<{ message: { content: string } }>((_, reject) => {
            setTimeout(() => reject(new Error('Ollama Timeout')), TIMEOUT_MS);
        });

        const response = await Promise.race([responsePromise, timeoutPromise]);
        return response.message.content;

    } catch (error) {
        console.error('AI Generation Error or Timeout:', error);
        // フォールバック（モックメッセージ）
        return `
### 魂のメッセージ

現在、宇宙からの回線が少し混み合っており、AI賢者からの直接のメッセージを受信できませんでしたが、あなたの魂の輝きは失われていません。

**Number ${context.lifePathNumber}: ${context.lifePathTitle}** のあなたは、生まれながらにして素晴らしい使命を持っています。

**${context.dayMaster} (${context.dayMasterTitle})** のエネルギーは、どんな時もあなたを支える大樹のように、あるいは大地のように存在しています。

**中心的な才能: ${context.tenGen} (${context.tenGenTitle})**
この才能は、あなたが意識するとしないとに関わらず、人生の局面で道を切り開く強力な武器となります。

今は**「${context.currentYearTheme}」**の時期です。焦らず、自分の内なる声に耳を傾けてください。
${context.isTenchuuSatsu ? "特に現在は天中殺の期間ですので、新しいことを始めるよりも、自分自身を深く知ることに時間を使ってください。" : "運気はあなたの味方をしています。信じる道を進んでください。"}

あなたの人生は、あなた自身が描く美しい物語です。自信を持って歩んでください。
 *(Note: This is a system fallback message due to AI unavailability)*
    `;
    }
}
