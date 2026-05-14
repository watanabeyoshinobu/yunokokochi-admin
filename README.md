# ♨️ 湯のここち 管理画面 (Admin Dashboard)

スーパー銭湯紹介・コミュニティサイト「[湯のここち](https://www.yunokokochi.com/)」の管理者専用ダッシュボードです。
施設情報やクチコミなどのデータを効率的に管理するために、メインのRailsアプリケーションとは独立したフロントエンドとして構築しています。

## 🌐 リンク
* **管理画面URL:** [https://yunokokochi-admin.vercel.app/](https://yunokokochi-admin.vercel.app/)
* **ユーザー画面（本編）URL:** [https://www.yunokokochi.com/](https://www.yunokokochi.com/)
* **メインシステム（Rails）リポジトリ:** https://github.com/watanabeyoshinobu/yunokokochi

## 💻 使用技術
* **Frontend:** React / Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

## ✨ 主な機能
* **ダッシュボード:** 本日のいいね獲得数、新規クチコミ、総ユーザー数のサマリー表示
* **施設情報管理:** 登録されている温泉施設の編集・削除機能
* **クチコミ管理:** ユーザーから投稿されたクチコミの確認および管理

## ✨ 　ER図
データ構造（ER図）については、[メインシステム（Rails）リポジトリ](https://github.com/watanabeyoshinobu/yunokokochi)をご参照ください。

## 🚀 今後の改良計画
* **TypeScriptの型安全性のさらなる活用:** API通信時のデータやコンポーネント間の連携において、より厳格な型定義を行い、予期せぬエラーを防ぐ保守性の高いシステムへのアップデート
* 管理者向けのデータ分析機能（グラフ表示など）の拡充

## 🛠️ 開発環境の構築（ローカル起動）

お手元の環境で動かすための手順です。

# 1. リポジトリのクローン
git clone [https://github.com/watanabeyoshinobu/yunokokochi-admin.git](https://github.com/watanabeyoshinobu/yunokokochi-admin.git)

# 2. ディレクトリへ移動
cd yunokokochi-admin

# 3. パッケージのインストール
npm install

# 4. 開発サーバーの起動
npm run dev