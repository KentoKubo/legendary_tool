

class MirishiraBlockView:
    def getAppHome(self, oldPostChannel: str, oldPostTime: str):
        appHomeBlock = [
		    {
			    "type": "header",
			    "text": {
				    "type": "plain_text",
				    "text": "ミリしらプラットフォーム created by 伝説のツール"
			    }
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "*設定画面*"
			    }
		    },
		    {
			    "type": "divider"
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "ミリしらや回答を共有するチャンネル"
			    }
		    },
		    {
			    "type": "actions",
			    "elements": [
				    {
					    "type": "channels_select",
					    "placeholder": {
						    "type": "plain_text",
						    "text": "チャンネルを選んでください",
						    "emoji": True
					    },
					    "initial_channel": oldPostChannel,
					    "action_id": "channel_selected"
				    }
			    ]
		    },
		    {
			    "type": "divider"
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "ミリしらを投稿する時間"
			    }
		    },
		    {
			    "type": "actions",
			    "elements": [
				    {
					    "type": "timepicker",
					    "initial_time": oldPostTime,
					    "placeholder": {
						    "type": "plain_text",
						    "text": "時刻を選択してください",
						    "emoji": True
					    },
					    "action_id": "time_selected"
				    }
			    ]
		    },
		    {
			    "type": "divider"
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "上記の設定は自動で反映されます"
			    }
		    }
        ]
        return appHomeBlock
