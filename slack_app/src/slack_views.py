
class MirishiraSlackView:
    def getAppHomeBlock(self, oldPostChannel: str, oldPostTime: str):
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
				    "text": "ミリしらを投稿する時間(未対応)"
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


    def __createImageBlock(self, picturesList: list):
        imageBlockList = []

        for i in range(len(picturesList)):
            imageBlock = {
				"type": "image",
				"image_url": picturesList[i]["picture_url"],
				"alt_text": "ミリしらキャラ-" + str(i)
            }
            imageBlockList.append(imageBlock)

        return imageBlockList


    def getQuestionBlock(self, question: dict, frontBaseUrl: str):
        questionBlock=[
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "こんにちは！ *ミリしらプラットフォーム* です \n 本日のおすすめ ミリしら はこちら！"
			    }
		    },
		    {
			    "type": "divider"
		    },
		    {
			    "type": "header",
			    "text": {
				    "type": "plain_text",
				    "text": question["title"],
				    "emoji": True
			    }
		    },
		    {
			    "type": "context",
			    "elements": self.__createImageBlock(question["pictures"])
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "作成者 : " + question["creator_name"]
			    }
		    },
		    {
			    "type": "actions",
			    "elements": [
				    {
					    "type": "button",
					    "text": {
						    "type": "plain_text",
						    "text": "webで答える",
						    "emoji": True
					    },
					    "value": "to_front",
					    "url": frontBaseUrl + str(question["question_id"]) + "/", # TODO:fix
					    "action_id": "open_web_app"
				    },
				    {
					    "type": "button",
					    "text": {
						    "type": "plain_text",
						    "text": "slackで答える",
						    "emoji": True
					    },
					    "value": question["title"],
					    "style": "primary",
					    "action_id": "open_answer_modal"
				    }
			    ]
		    },
            {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
                    "text": "他のミリしらは <" + frontBaseUrl + "top/|こちら> から遊んでね！" # TODO:fix
			    }
		    }
        ]
        return questionBlock

    def getAnswererNameFormView(self, answerData: str):
        answerNameFormView = {
            "type": "modal",
            "callback_id": "answerer_name",
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら回答フォーム",
		        "emoji": True
	        },
	        "submit": {
		        "type": "plain_text",
		        "text": "次へ",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "とじる",
		        "emoji": True
	        },
            "blocks": [
                {
                    "type": "input",
                    "block_id": "answerer_name_block",
                    "element": {
                        "type": "plain_text_input",
				        "max_length": 15,
                        "action_id": "answerer_name",
                    },
                    "label": {"type": "plain_text", "text": "あなたのお名前は？"},
                }
            ],
			"private_metadata": answerData
        }
        return answerNameFormView

    def getAnswerStartView(self, answerData: str, answererName: str, title: str, imageNum: int):
        answerStartView={
            "type": "modal",
            "callback_id": "answer_start",
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら回答フォーム",
		        "emoji": True
	        },
	        "submit": {
		        "type": "plain_text",
		        "text": "開始",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "とじる",
		        "emoji": True
	        },
            "blocks": [
		        {
			        "type": "section",
			        "text": {
				        "type": "mrkdwn",
				        "text": "*" + answererName + "* さんですね！\nそれでは" + title + "の回答を開始します！\n 制限時間は1キャラ 30 秒． キャラクターは全部で " + str(imageNum) + " 体だよ！"
			        }
		        }
	        ],
			"private_metadata":answerData
        }
        return answerStartView

    def getAnswerFormView(self, answerData: str, imageCtr: int, imageNum: int, imageUrl: str):
        answerFormView={
	        "type": "modal",
            "callback_id": "answering",
            "external_id": "answering_ex_" + str(imageCtr),
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら回答フォーム",
		        "emoji": True
	        },
	        "submit": {
		        "type": "plain_text",
		        "text": "次へ",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "やめる",
		        "emoji": True
	        },
	        "blocks": [
		        {
			        "type": "image",
			        "title": {
				        "type": "plain_text",
				        "text": str(imageCtr) + "/" + str(imageNum),
				        "emoji": True
			        },
			        "image_url": imageUrl,
			        "alt_text": "キャラクター " + str(imageCtr) + "/" + str(imageNum)
		        },
		        {
			        "type": "input",
			        "block_id": "character_name_" + str(imageCtr),
			        "element": {
				        "type": "plain_text_input",
				        "max_length": 11,
				        "action_id": "character_name"
			        },
			        "label": {
				        "type": "plain_text",
				        "text": "キャラクター名を入力 (11文字まで)",
				        "emoji": True
			        }
		        },
		        {
			        "type": "input",
			        "block_id": "character_explanation_" + str(imageCtr),
			        "element": {
				        "type": "plain_text_input",
				        "max_length": 30,
				        "action_id": "character_explanation"
			        },
			        "label": {
				        "type": "plain_text",
				        "text": "このキャラクターをひとことで！ (30文字まで)",
				        "emoji": True
			        }
				}
	        ],
			"private_metadata":answerData
        }
        return answerFormView


    def getAnswerFinishView(self, answerData: str, channelId: str):
        answerFinishView={
	        "type": "modal",
            "callback_id": "answer_finish",
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら回答フォーム",
		        "emoji": True
	        },
	        "submit": {
		        "type": "plain_text",
		        "text": "送信する",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "やめる",
		        "emoji": True
	        },
	        "blocks": [
		        {
			        "type": "section",
			        "text": {
				        "type": "mrkdwn",
				        "text": "*以上で終了です！お疲れ様でした！送信ボタンで回答を登録します．* \n 回答をslackで共有しますか？"
			        }
		        },
		        {
			        "type": "input",
					"block_id": "share_in_slack",
			        "element": {
				        "type": "checkboxes",
				        "options": [
					        {
						        "text": {
							        "type": "plain_text",
							        "text": "回答を <#" + channelId + "> で共有する",
							        "emoji": True
						        },
						        "value": "True"
					        }
				        ],
				        "action_id": "check_to_share"
			        },
			        "label": {
				        "type": "plain_text",
				        "text": "共有",
				        "emoji": True
			        },
                    "optional": True
		        }
	        ],
			"private_metadata":answerData
        }
        return answerFinishView


    def getAnswerTimeUpView(self):
        answerTimeUpView={
            "type": "modal",
            "callback_id": "time_up",
            "title": {
				"type": "plain_text",
				"text": "ミリしら回答フォーム"
			},
            "close": {
				"type": "plain_text",
				"text": "閉じる"
			},
            "blocks": [
                {
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": "*時間切れ...最初からやり直してね*"},
                }
            ],
        }
        return answerTimeUpView

    def getAnswerThanksView(self):
        answerThanksView={
            "type": "modal",
            "callback_id": "answer_thanks",
            "title": {
				"type": "plain_text",
				"text": "ミリしら回答フォーム"
			},
            "close": {
				"type": "plain_text",
				"text": "閉じる"
			},
            "blocks": [
                {
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": "*回答ありがとうございました！*"},
                }
            ],
        }
        return answerThanksView


    def getShareBlock(self, answerId: int, userId: str, question: dict, frontBaseUrl: str):
        shareBlock=[
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "<@" + userId + "> *さんがミリしらに回答しました！* \n ぜひチェックしてね！"
			    }
		    },
		    {
			    "type": "divider"
		    },
		    {
			    "type": "header",
			    "text": {
				    "type": "plain_text",
				    "text": question["title"],
				    "emoji": True
			    }
		    },
		    {
			    "type": "context",
			    "elements": self.__createImageBlock(question["pictures"])
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "作成者 : " + question["creator_name"]
			    }
		    },
		    {
			    "type": "actions",
			    "elements": [
				    {
					    "type": "button",
					    "text": {
						    "type": "plain_text",
						    "text": "webで回答を見る",
						    "emoji": True
					    },
					    "value": "to_front",
					    "url": frontBaseUrl + str(answerId) + "/", # TODO:fix
					    "action_id": "open_web_app"
				    },
				    {
					    "type": "button",
					    "text": {
						    "type": "plain_text",
						    "text": "slackで回答を見る",
						    "emoji": True
					    },
					    "value":question["title"] + "_" + str(question["question_id"]) + "_" + str(answerId),
					    "style": "primary",
					    "action_id": "open_answer_look_modal"
				    }
			    ]
		    },
            {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
                    "text": "他のミリしらは <" + frontBaseUrl + "top/|こちら> から遊んでね！" # TODO:fix
			    }
		    }
        ]
        return shareBlock



    def getShareWithNoNameBlock(self, answerId: int, question: dict, frontBaseUrl: str):
        shareWithNoNameBlock=[
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "*メンバーの誰かがミリしらに回答したよ！* \n ぜひチェックしてね！"
			    }
		    },
		    {
			    "type": "divider"
		    },
		    {
			    "type": "header",
			    "text": {
				    "type": "plain_text",
				    "text": question["title"],
				    "emoji": True
			    }
		    },
		    {
			    "type": "context",
			    "elements": self.__createImageBlock(question["pictures"])
		    },
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "作成者 : " + question["creator_name"]
			    }
		    },
		    {
			    "type": "actions",
			    "elements": [
				    {
					    "type": "button",
					    "text": {
						    "type": "plain_text",
						    "text": "webで回答を見る",
						    "emoji": True
					    },
					    "value": "to_front",
					    "url": frontBaseUrl + str(answerId) + "/", # TODO:fix
					    "action_id": "open_web_app"
				    }
			    ]
		    },
            {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
                    "text": "他のミリしらは <" + frontBaseUrl + "top/|こちら> から遊んでね！" # TODO:fix
			    }
		    }
        ]
        return shareWithNoNameBlock

    def getAnswerLookStartView(self, targetAnswerData: str, question: dict, answererName: str):
        answerLookStartView={
	        "type": "modal",
	        "callback_id": "answer_look_start",
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら閲覧フォーム",
		        "emoji": True
	        },
	        "submit": {
		        "type": "plain_text",
		        "text": "見る",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "とじる",
		        "emoji": True
	        },
	        "blocks": [
		        {
			        "type": "header",
			        "text": {
				        "type": "plain_text",
				        "text": question["title"],
				        "emoji": True
			        }
		        },
		        {
			        "type": "context",
			        "elements": self.__createImageBlock(question["pictures"])
		        },
		        {
			        "type": "section",
			        "text": {
				        "type": "mrkdwn",
				        "text": "作成者 : " + question["creator_name"]
			        }
		        },
		        {
			        "type": "divider"
		        },
		        {
			        "type": "section",
			        "text": {
				        "type": "mrkdwn",
				        "text": "*" + answererName + "* さんの回答です！"
			        }
		        }
	        ],
	        "private_metadata":targetAnswerData
        }
        return answerLookStartView

    def getAnswerLookView(self, answeredData: str, imageCtr: int, imageNum: int, imageUrl: str, oneCharacter: dict, answererName: str):
        answerLookView={
	        "type": "modal",
            "callback_id": "answer_looking",
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら閲覧フォーム",
		        "emoji": True
	        },
	        "submit": {
		        "type": "plain_text",
		        "text": "次へ",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "やめる",
		        "emoji": True
	        },
	        "blocks": [
		        {
			        "type": "image",
			        "title": {
				        "type": "plain_text",
				        "text": str(imageCtr) + "/" + str(imageNum),
				        "emoji": True
			        },
			        "image_url": imageUrl,
			        "alt_text": "キャラクター " + str(imageCtr) + "/" + str(imageNum)
		        },
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": "このキャラクターの名前は？ \n *" + oneCharacter["character_name"] + "*"
					}
				},
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": "このキャラクターをひとことで！ \n *" + oneCharacter["character_explanation"] + "*"
					}
				},
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": "回答者 : " + answererName
					}
				}
	        ],
			"private_metadata":answeredData
        }
        return answerLookView


    def getAnswerLookFinishView(self, frontBaseUrl: str):
        answerLookFinishView={
	        "type": "modal",
            "callback_id": "answer_finish",
	        "title": {
		        "type": "plain_text",
		        "text": "ミリしら回答フォーム",
		        "emoji": True
	        },
	        "close": {
		        "type": "plain_text",
		        "text": "とじる",
		        "emoji": True
	        },
	        "blocks": [
		        {
			        "type": "section",
			        "text": {
				        "type": "mrkdwn",
				        "text": "*以上で終了です！* \n ぜひslackでリアクションしましょう:clap: \n 他のミリしらは <" + frontBaseUrl + "top/|こちら> から!"
			        }
		        },
	        ]
        }
        return answerLookFinishView
