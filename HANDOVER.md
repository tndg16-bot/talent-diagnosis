# talent-diagnosis 引き継ぎ書

## プロジェクト概要

**プロジェクト名**: 才能診断ツール (AI Talent Diagnosis Tool)  
**リポジトリ**: https://github.com/tndg16-bot/talent-diagnosis  
**ローカルパス**: `C:\Users\chatg\Obsidian Vault\papa\Apps\Main\talent-diagnosis`

生年月日（と任意の名前）から、数秘術・四柱推命・運気サイクルを統合し、AIによるパーソナライズされたスピリチュアルアドバイスを生成するWebアプリケーション。

---

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| UIコンポーネント | shadcn/ui |
| データ可視化 | Chart.js + react-chartjs-2 |
| 旧暦計算 | lunar-javascript |
| AI連携 | Ollama (`gemma2:9b` モデル) |
| マークダウン | react-markdown |

---

## ディレクトリ構成

```
talent-diagnosis/
├── src/
│   ├── app/
│   │   ├── page.tsx              # ランディングページ（入力フォーム）
│   │   └── result/
│   │       └── page.tsx          # 診断結果ページ
│   ├── components/
│   │   ├── DiagnosisForm.tsx     # 入力フォーム
│   │   ├── NumerologyResult.tsx  # 数秘術結果表示
│   │   ├── ShichuResult.tsx      # 四柱推命結果表示（イラスト付き）
│   │   ├── UnkiResult.tsx        # 運気テーブル
│   │   ├── LuckGraph.tsx         # 運気グラフ（Chart.js）
│   │   ├── AiAdvisor.tsx         # AIアドバイス表示
│   │   ├── AiAdvisorSkeleton.tsx # AIローディング状態
│   │   └── CalculationMethod.tsx # 計算方法説明
│   ├── lib/
│   │   ├── numerology/
│   │   │   └── calculator.ts     # 数秘術計算（ライフパス/ソウル/パーソナリティ）
│   │   ├── shichusuimei/
│   │   │   └── calculator.ts     # 四柱推命計算
│   │   ├── unki/
│   │   │   └── calculator.ts     # 運気サイクル計算
│   │   └── ai/
│   │       └── advisor.ts        # AIアドバイス生成（Ollama連携）
│   └── data/
│       ├── numerology.json       # 数秘術解釈データ
│       └── shichusuimei.json     # 四柱推命解釈データ
├── public/
│   └── images/
│       └── daymaster/            # 日干イラスト（10種類）
└── package.json
```

---

## フェーズ進捗

| フェーズ | 状態 | 内容 |
|----------|------|------|
| 計画 | ✅ 完了 | 要件定義、技術選定、UI設計 |
| Phase 1 | ✅ 完了 | 数秘術（ライフパス/ソウル/パーソナリティ） |
| Phase 2 | ✅ 完了 | 四柱推命・運気サイクル |
| Phase 3 | ✅ 完了 | AI連携・リッチUI・イラスト |
| **Phase 4** | ⏳ 未着手 | テスト・デプロイ |

---

## Phase 4: 残タスク

### 1. ユニットテスト作成
- [ ] `src/lib/numerology/calculator.ts` のテスト
  - ライフパスナンバー計算の正確性
  - マスターナンバー (11, 22, 33) の処理
  - ソウル/パーソナリティナンバー計算
- [ ] `src/lib/shichusuimei/calculator.ts` のテスト
  - 年柱・月柱・日柱・時柱の計算
  - 通変星・十二運の導出
- [ ] `src/lib/unki/calculator.ts` のテスト
  - 10年運気サイクルの計算
  - 天中殺判定

### 2. 計算精度検証
- [ ] 既知の生年月日で結果を検証（手計算との比較）
- [ ] 月柱の節入り判定が正確か確認（lunar-javascript依存）

### 3. レスポンシブ確認
- [ ] モバイル（375px〜）での表示確認
- [ ] タブレット（768px〜）での表示確認
- [ ] 運気グラフのモバイル対応

### 4. Ollamaタイムアウト調整
- [ ] 現在5秒 → 10〜15秒に延長を検討
- [ ] `src/lib/ai/advisor.ts` の `TIMEOUT_MS` を調整

### 5. デプロイ設定
- [ ] Vercel または Cloud Run へのデプロイ設定
- [ ] 環境変数の設定（Ollama APIエンドポイント等）
- [ ] 本番デプロイ

---

## 重要なコード箇所

### AI連携 (`src/lib/ai/advisor.ts`)
```typescript
const TIMEOUT_MS = 5000; // 現在5秒、延長検討
const model = 'gemma2:9b'; // Ollamaモデル
```
- Ollamaがタイムアウトした場合、フォールバックメッセージを表示
- プロンプトは「魂の強み」「現在の星回りからのメッセージ」「覚醒への鍵」の3項目

### 数秘術計算 (`src/lib/numerology/calculator.ts`)
- ピタゴラス式数秘術システム（A=1, B=2, ... Z=8）
- マスターナンバー (11, 22, 33) は還元しない

### 四柱推命 (`src/lib/shichusuimei/calculator.ts`)
- `lunar-javascript` で旧暦変換・節入り判定
- 通変星10種、十二運12種に対応

---

## 開発コマンド

```bash
# 開発サーバー起動
cd C:\Users\chatg\Obsidian Vault\papa\Apps\Main\talent-diagnosis
npm run dev

# ビルド
npm run build

# 本番モード起動
npm start
```

---

## 動作確認URL

- ランディングページ: http://localhost:3000
- 結果ページ例: http://localhost:3000/result?birthDate=1985-05-05&name=Taro%20Yamada

---

## 注意事項

1. **Ollama必須**: AIアドバイス機能を動作させるには、ローカルでOllamaが起動している必要があります
   ```bash
   ollama run gemma2:9b
   ```

2. **日本語対応**: UIとデータはすべて日本語

3. **イラスト**: `public/images/daymaster/` に水彩画風イラスト10枚（日干タイプ別）

4. **GitHubリポジトリ**: 個別リポジトリとして管理（papaリポジトリからは分離済み）

---

## 関連ドキュメント

- 前回のセッション履歴: `C:\Users\chatg\.gemini\antigravity\brain\86ac157e-d262-4d25-802a-3ca21bf425d9\`
- 今回のセッション履歴: `C:\Users\chatg\.gemini\antigravity\brain\ab1572f4-d7bd-43c5-b7b1-619a73d62cf8\`

---

*引き継ぎ日: 2026-01-17*
