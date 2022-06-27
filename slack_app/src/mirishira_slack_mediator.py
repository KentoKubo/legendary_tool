import logging
import urllib.request
import json

from slack_bolt import App, Ack, Say, BoltContext, Respond
from slack_bolt.adapter.socket_mode import SocketModeHandler

from slack_views import MirishiraBlockView

logging.basicConfig(level=logging.DEBUG,
    filename="test.log",
    format="%(asctime)s %(levelname)-7s %(message)s")

logger = logging.getLogger(__name__)

class MirishiraSlackBot:

    def __init__(
        self,
        app: App,
        apiEndpoint: str,
        frontBaseUrl: str
    ):
        self.app = app
        self.apiEndpoint = apiEndpoint
        self.frontBaseUrl = frontBaseUrl

        self.postChannel = "C03M7F6GGP6"
        self.postTime = "10:00"

        # self.candidateChannel
        # self.candidateTime

        self.blockView = MirishiraBlockView()


    def run(self):

        self.app.client.chat_postMessage(
            channel=self.postChannel,
            text="mirishira app start successfully"
        )

        @self.app.command("/test")
        def postTestMessage(ack, client):
            ack()
            client.chat_postMessage(
                channel=self.postChannel,
                text="疎通確認:tada:"
            )

        @self.app.event("app_home_opened")
        def updateHomeTab(client, event, logger):
            try:
                client.views_publish(
                    user_id=event["user"],
                    view={
	                    "type": "home",
	                    "blocks": self.blockView.getAppHome(self.postChannel, self.postTime)
                    }
                )
            except Exception as e:
                logger.error(f"Error publishing home tab: {e}")


        @self.app.action("channel_selected")
        def setPostChannel(ack, body, logger):
            ack()
            self.postChannel = body["actions"][0]["selected_channel"]
            logger.info(body)


        @self.app.action("time_selected")
        def setPostTime(ack, body, logger):
            ack()
            self.postTime = body["actions"][0]["selected_time"]
            logger.info(body)




# app.client.chat_postMessage(
    # channel="C03M7F6GGP6",
    # blocks=[
        # {
            # "type": "section",
            # "block_id": "button-block",
            # "text": {
                # "type": "mrkdwn",
                # "text": "タイマーを起動します",
            # },
            # "accessory": {
                # "type": "button",
                # "text": {"type": "plain_text", "text": "開く"},
                # "value": "clicked",
                # "action_id": "open-modal-button",
            # },
        # }
    # ],
    # text="タイマーテスト",
# )

# @app.action("open-modal-button")
# def handle_open_modal_button_clicks(ack: Ack, body: dict, client: WebClient):
    # ack()
    # client.views_open(
        # trigger_id=body["trigger_id"],
        # view={
            # "type": "modal",
            # "callback_id": "modal-id",
            # "title": {"type": "plain_text", "text": "タイマー"},
            # "submit": {"type": "plain_text", "text": "開始"},
            # "close": {"type": "plain_text", "text": "閉じる"},
            # # "blocks": [
                # # {
                    # # "type": "section",
                    # # "text": {"type": "plain_text", "text": "タイマーを開始しますか？"},
                # # }
            # # ],
            # "blocks": [
                # {
                    # "type": "input",
                    # "block_id": "question-block",
                    # "element": {
                        # "type": "plain_text_input",
                        # "action_id": "input-element",
                    # },
                    # "label": {"type": "plain_text", "text": "秒数を指定してね．(デフォルト10秒)"},
                # },
            # ],
        # },
    # )

# import time

# @app.view("modal-id")
# def handle_view_events(ack: Ack, view: dict, client: WebClient):
    # ack(
        # response_action="update",
        # view={
            # "type": "modal",
            # "callback_id": "modal-id",
            # "title": {"type": "plain_text", "text": "タイマーモーダル"},
            # "blocks": [
                # {
                    # "type": "section",
                    # "text": {
                        # "type": "plain_text",
                        # "text": "タイマーをスタートします",
                    # },
                # }
            # ],
        # },
    # )

    # try:
        # limit_time = int(view["state"]["values"]["question-block"]["input-element"]["value"])
    # except ValueError:
        # limit_time = 10
        # pass


    # for i in range(limit_time, 0, -1):
        # client.views_update(
            # view_id=view.get("id"),
            # view={
                # "type": "modal",
                # "callback_id": "modal-id",
                # "title": {"type": "plain_text", "text": "タイマーモーダル"},
                # "close": {"type": "plain_text", "text": "閉じる"},
                # "blocks": [
                    # {
                        # "type": "section",
                        # "text": {"type": "plain_text", "text": str(i) + "秒前！"},
                    # }
                # ],
            # },
        # )
        # time.sleep(0.7)

    # client.views_update(
        # view_id=view.get("id"),
        # view={
            # "type": "modal",
            # "callback_id": "modal-id",
            # "title": {"type": "plain_text", "text": "タイマーモーダル"},
            # "close": {"type": "plain_text", "text": "閉じる"},
            # "blocks": [
                # {
                    # "type": "section",
                    # "text": {"type": "plain_text", "text": "終了！！"},
                # }
            # ],
        # },
    # )