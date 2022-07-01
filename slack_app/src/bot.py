import os

from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

from slack_event_handler import MirishiraSlackBot


app = App(token=os.environ["SLACK_BOT_TOKEN"])

apiEndpoint = os.environ["API_ENDPOINT"]
frontbaseUrl = os.environ["FRONT_BASE_URL"]

mirishiraBot = MirishiraSlackBot(app, apiEndpoint, frontbaseUrl)
mirishiraBot.run()

if __name__ == "__main__":
    handler = SocketModeHandler(mirishiraBot.app, os.environ["SLACK_APP_TOKEN"])
    handler.start()