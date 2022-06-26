import os
from dotenv import load_dotenv

from slack_bolt import App, Ack, Say, BoltContext, Respond
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_sdk import WebClient


load_dotenv()

app = App(token=os.environ["SLACK_BOT_TOKEN"])

# test
# result = app.client.chat_postMessage(
    # channel="C03M7F6GGP6",
    # blocks=[
		# {
			# "type": "image",
			# "title": {
				# "type": "plain_text",
				# "text": "Please enjoy this photo of a kitten"
			# },
			# "block_id": "image4",
			# "image_url": "http://placekitten.com/500/500",
			# "alt_text": "An incredibly cute kitten."
		# }
	# ]
# )

app.client.chat_postMessage(
    channel="C03M7F6GGP6",
    blocks=[
        {
            "type": "section",
            "block_id": "button-block",
            "text": {
                "type": "mrkdwn",
                "text": "タイマーを起動します",
            },
            "accessory": {
                "type": "button",
                "text": {"type": "plain_text", "text": "開く"},
                "value": "clicked",
                "action_id": "open-modal-button",
            },
        }
    ],
    text="タイマーテスト",
)

@app.action("open-modal-button")
def handle_open_modal_button_clicks(ack: Ack, body: dict, client: WebClient):
    ack()
    client.views_open(
        trigger_id=body["trigger_id"],
        view={
            "type": "modal",
            "callback_id": "modal-id",
            "title": {"type": "plain_text", "text": "タイマー"},
            "submit": {"type": "plain_text", "text": "開始"},
            "close": {"type": "plain_text", "text": "閉じる"},
            # "blocks": [
                # {
                    # "type": "section",
                    # "text": {"type": "plain_text", "text": "タイマーを開始しますか？"},
                # }
            # ],
            "blocks": [
                {
                    "type": "input",
                    "block_id": "question-block",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "input-element",
                    },
                    "label": {"type": "plain_text", "text": "秒数を指定してね．(デフォルト10秒)"},
                },
            ],
        },
    )

import time

@app.view("modal-id")
def handle_view_events(ack: Ack, view: dict, client: WebClient):
    ack(
        response_action="update",
        view={
            "type": "modal",
            "callback_id": "modal-id",
            "title": {"type": "plain_text", "text": "タイマーモーダル"},
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "タイマーをスタートします",
                    },
                }
            ],
        },
    )

    try:
        limit_time = int(view["state"]["values"]["question-block"]["input-element"]["value"])
    except ValueError:
        limit_time = 10
        pass


    for i in range(limit_time, 0, -1):
        client.views_update(
            view_id=view.get("id"),
            view={
                "type": "modal",
                "callback_id": "modal-id",
                "title": {"type": "plain_text", "text": "タイマーモーダル"},
                "close": {"type": "plain_text", "text": "閉じる"},
                "blocks": [
                    {
                        "type": "section",
                        "text": {"type": "plain_text", "text": str(i) + "秒前！"},
                    }
                ],
            },
        )
        time.sleep(0.7)

    client.views_update(
        view_id=view.get("id"),
        view={
            "type": "modal",
            "callback_id": "modal-id",
            "title": {"type": "plain_text", "text": "タイマーモーダル"},
            "close": {"type": "plain_text", "text": "閉じる"},
            "blocks": [
                {
                    "type": "section",
                    "text": {"type": "plain_text", "text": "終了！！"},
                }
            ],
        },
    )

if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()