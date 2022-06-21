# legendary_tool

# バックエンド手順
1. `$cd legendary_tool/backend/mirisira_platform/;`
2. `$touch local_settings.py`
3. local_settings.pyに`secret_key`を記述
4. `$ cd ../../`
5. `$ docker-compose build`
6. `$ docker-compose up`
7. Swagger UIにアクセスし、TestAPIを叩いて`{"data": "get request"}`が返ってきたらOK

* Swagger UI : `127.0.0.1:3000`
* Django : `127.0.0.1:8000`