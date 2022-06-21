# legendary_tool

# バックエンド手順

1. `$cd legendary_tool/backend/mirisira_platform/;`
2. `$touch local_settings.py`
3. local_settings.py に`secret_key`を記述
4. `$ cd ../../`
5. `$ docker-compose build`
6. `$ docker-compose up`
7. Swagger UI にアクセスし、TestAPI を叩いて`{"data": "get request"}`が返ってきたら OK

- Swagger UI : `127.0.0.1:3000`
- Django : `127.0.0.1:8000`

# フロントエンド手順

## ブラウザでアプリケーションを触りたいとき

1. まずこれを実行

   ```
   docker-compose build && docker-compose up
   ```

2. `Compiled successfully!`の表示後，次のリンクを開く

   [http://localhost:3030](http://localhost:3030)

## 開発用

### パッケージ(ライブラリ)インストールしたいとき

1. 別のターミナルを開いて，Docker コンテナの中に入る

   ```
   docker container exec -it front_front_1 sh
   ```

2. 対象のパッケージをインストールする

   ```
   npm install [package-name]
   ```
