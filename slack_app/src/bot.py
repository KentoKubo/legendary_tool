import os
from dotenv import load_dotenv

from slack_bolt import App, Ack, Say, BoltContext, Respond
from slack_bolt.adapter.socket_mode import SocketModeHandler

from slack_event_handler import MirishiraSlackBot


load_dotenv()

app = App(token=os.environ["SLACK_BOT_TOKEN"])

api_endpoint = "http://api-server:8000"
#front_base_url = "https://hogehoge.com"
front_base_url = "https://google.com/"

mirishira_bot = MirishiraSlackBot(app, api_endpoint, front_base_url)
mirishira_bot.run()

if __name__ == "__main__":
    handler = SocketModeHandler(mirishira_bot.app, os.environ["SLACK_APP_TOKEN"])
    handler.start()