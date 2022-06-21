# Front, Back 共通

## 開発サーバの立て方

1. まずこれを実行

   ```
   docker-compose build && docker-compose up
   ```

2. `Compiled successfully!`の表示後，次のリンクを開く

   [http://localhost:3000](http://localhost:3000)

# Front 開発用

## パッケージ(ライブラリ)インストール方法

1. 別のターミナルを開いて，Docker コンテナの中に入る

   ```
   docker container exec -it front_front_1 sh
   ```

2. 対象のパッケージをインストールする

   ```
   npm install [package-name]
   ```
