import urllib.request
import json

from slack_bolt import App, Ack, Say, BoltContext, Respond
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_sdk import WebClient

class MirishiraSlackBot():

    def __init__(
        self,
        app: App,
        apiEndpoint: str,
        frontBaseUrl: str
    ):
        self.app = app
        self.apiEndpoint = apiEndpoint
        self.frontBaseUrl = frontBaseUrl
