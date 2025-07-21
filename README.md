# Blog App with Sanity CMS

Sanity CMSと連携したブログサイトです。

## 機能

- Sanity APIからブログ記事を取得
- 記事一覧ページと個別記事ページ
- レスポンシブデザイン
- SEO最適化
- React + TypeScript + Tailwind CSS で構築

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 環境変数の設定:
`.env.local` ファイルを編集し、Sanityの設定を追加:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

3. 開発サーバーの起動:
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でサイトが確認できます。

## Sanity CMSの設定

1. [Sanity.io](https://www.sanity.io/)でアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトIDとデータセット名を環境変数に設定
4. スキーマは `sanity/schema.ts` で定義済み

## デプロイ

```bash
npm run build
npm start
```

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Sanity CMS
- Portable Text

## ディレクトリ構成

```
src/
├── app/
│   ├── blog/[slug]/
│   │   └── page.tsx          # 個別記事ページ
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # 記事一覧ページ
├── components/
│   ├── BlogCard.tsx          # 記事カードコンポーネント
│   └── Header.tsx            # ヘッダーコンポーネント
├── lib/
│   ├── queries.ts            # Sanity GROQ クエリ
│   └── sanity.ts             # Sanity クライアント設定
└── types/
    └── blog.ts               # 型定義
sanity/
├── sanity.config.ts          # Sanity設定
└── schema.ts                 # コンテンツスキーマ
```
