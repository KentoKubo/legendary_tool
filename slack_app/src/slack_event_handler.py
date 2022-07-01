import json

from slack_bolt import App, Ack

from slack_views import MirishiraSlackView
from mirishira_api_caller import MirishiraApiCaller

class MirishiraSlackBot:

    def __init__(self, app: App, apiBaseEndpoint: str, frontBaseUrl: str):
        self.app = app
        self.apiBaseEndpoint = apiBaseEndpoint
        self.frontBaseUrl = frontBaseUrl

        self.postChannel = "#random"
        self.postTime = "10:00"

        self.slackView = MirishiraSlackView()
        self.mirishiraApiCaller = MirishiraApiCaller(self.apiBaseEndpoint)



    def run(self):

        self.app.client.chat_postMessage(
            channel=self.postChannel,
            text="mirishira app start successfully"
        )

        # this command event must be replaced with scheduled event
        @self.app.command("/test")
        def postTestMessage(ack: Ack, client):
            ack()

            oneQuestion = self.mirishiraApiCaller.pickupNewestQuestion()

            client.chat_postMessage(
                channel=self.postChannel,
                blocks=self.slackView.getQuestionBlock(oneQuestion, self.frontBaseUrl)
            )

        @self.app.action("open_answer_modal")
        def openAnswerModal(ack: Ack, body: dict, client):
            ack()

            title = body["actions"][0]["value"]
            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(title)

            answererUserId = body["user"]["id"]

            answerData = {
			    "answererId":answererUserId,
			    "questionId":targetQuestion["question_id"],
                "questionTitle":targetQuestion["title"],
                "characterTotalNum":len(targetQuestion["pictures"]),
                "characterCtr":0,
			    "characters":[],
			    "answererName":""
		    }

            client.views_open(
                trigger_id=body["trigger_id"],
                view=self.slackView.getAnswererNameFormView(json.dumps(answerData))
            )


        @self.app.view("answerer_name")
        def startAnswers(ack: Ack, view: dict):
            inputs = view["state"]["values"]
            answererName = inputs.get("answerer_name_block", {}).get("answerer_name", {}).get("value")

            answerData = json.loads(view["private_metadata"])
            answerData["answererName"] = answererName

            ack(
                response_action="update",
                view=self.slackView.getAnswerStartView(
                    json.dumps(answerData),
                    answererName,
                    answerData["questionTitle"],
                    answerData["characterTotalNum"]
                )
            )


        @self.app.view("answer_start")
        def displayFirstQuestion(ack: Ack, view: dict):
            answerData = json.loads(view["private_metadata"])

            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(answerData["questionTitle"])
            targetPicture = targetQuestion["pictures"][answerData["characterCtr"]]

            oneCharacter = {
                "picture_id": targetPicture["picture_id"],
                "character_name": "",
                "character_explanation": ""
            }

            answerData["characters"].append(oneCharacter)
            answerData["characterCtr"] += 1

            ack(
                response_action="update",
                view=self.slackView.getAnswerFormView(
                    json.dumps(answerData),
                    answerData["characterCtr"],
                    answerData["characterTotalNum"],
                    targetPicture["picture_url"]
                )
            )



        @self.app.view("answering")
        def getAnswerAndDisplyNextQuestion(ack: Ack, view: dict):
            answerData = json.loads(view["private_metadata"])
            inputs = view["state"]["values"]

            characterName = inputs.get("character_name_" + str(answerData["characterCtr"]), {}).get("character_name", {}).get("value")
            characterExplanation = inputs.get("character_explanation_" + str(answerData["characterCtr"]), {}).get("character_explanation", {}).get("value")

            answerData["characters"][-1]["character_name"] = characterName
            answerData["characters"][-1]["character_explanation"] = characterExplanation

            if answerData["characterCtr"] == answerData["characterTotalNum"]:
                logger.info("finish")
                ack(
                    response_action="update",
                    view=self.slackView.getAnswerFinishView(json.dumps(answerData), self.postChannel)
                )
                return

            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(answerData["questionTitle"])
            targetPicture = targetQuestion["pictures"][answerData["characterCtr"]]

            oneCharacter = {
                "picture_id": targetPicture["picture_id"],
                "character_name": "",
                "character_explanation": ""
            }

            answerData["characters"].append(oneCharacter)
            answerData["characterCtr"] += 1

            ack(
                response_action="update",
                view=self.slackView.getAnswerFormView(
                    json.dumps(answerData),
                    answerData["characterCtr"],
                    answerData["characterTotalNum"],
                    targetPicture["picture_url"]
                )
            )


        @self.app.view("answer_finish")
        def displayThanks(ack: Ack, view: dict, client):
            ack(
                response_action="update",
                view=self.slackView.getAnswerThanksView()
            )

            answerData = json.loads(view["private_metadata"])
            answerId = self.mirishiraApiCaller.postAnswer(answerData["questionId"], answerData["characters"], answerData["answererName"])

            inputs = view["state"]["values"]
            isShare = inputs.get("share_in_slack", {}).get("check_to_share", {}).get("selected_options")[0].get("value")

            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(answerData["questionTitle"])

            if isShare == "True":
                shareMessageBlock = self.slackView.getShareBlock(answerId, answerData["answererId"], targetQuestion, self.frontBaseUrl)
            else:
                shareMessageBlock = self.slackView.getShareWithNoNameBlock(answerId, targetQuestion, self.frontBaseUrl)

            client.chat_postMessage(
                channel=self.postChannel,
                blocks=shareMessageBlock
            )



        @self.app.action("open_answer_look_modal")
        def openAnswerLookModal(ack: Ack, body: dict, client):
            ack()

            titleAndId = body["actions"][0]["value"].rsplit("_", 2)
            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(titleAndId[0])
            targetAnswer = self.mirishiraApiCaller.searchAndGetAnswer(titleAndId[1], titleAndId[2])

            answeredData = {
			    "questionId":targetQuestion["question_id"],
                "questionTitle":targetQuestion["title"],
                "characterTotalNum":len(targetQuestion["pictures"]),
                "characterCtr":0,
			    "characters":targetAnswer["characters"],
                "answerId":targetAnswer["answerId"],
			    "answererName":targetAnswer["answererName"]
		    }

            client.views_open(
                trigger_id=body["trigger_id"],
                view=self.slackView.getAnswerLookStartView(
                    json.dumps(answeredData),
                    targetQuestion,
                    targetAnswer["answererName"]
                )
            )


        @self.app.view("answer_look_start")
        def displayFirstQuestion(ack: Ack, view: dict):
            answeredData = json.loads(view["private_metadata"])

            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(answeredData["questionTitle"])
            targetPicture = targetQuestion["pictures"][answeredData["characterCtr"]]
            targetAnswer = answeredData["characters"][answeredData["characterCtr"]]

            if targetPicture["picture_id"] != targetAnswer["picture_id"]:
                ack(
                    response_action="error"
                )
                return

            answeredData["characterCtr"] += 1

            ack(
                response_action="update",
                view=self.slackView.getAnswerLookView(
                    json.dumps(answeredData),
                    answeredData["characterCtr"],
                    answeredData["characterTotalNum"],
                    targetPicture["picture_url"],
                    targetAnswer,
                    answeredData["answererName"]
                )
            )


        @self.app.view("answer_looking")
        def getAnswerAndDisplyNextQuestion(ack: Ack, view: dict):
            answeredData = json.loads(view["private_metadata"])

            if answeredData["characterCtr"] == answeredData["characterTotalNum"]:
                ack(
                    response_action="update",
                    view=self.slackView.getAnswerLookFinishView(self.frontBaseUrl)
                )
                return

            targetQuestion = self.mirishiraApiCaller.getQuestionFromTitle(answeredData["questionTitle"])
            targetPicture = targetQuestion["pictures"][answeredData["characterCtr"]]
            targetAnswer = answeredData["characters"][answeredData["characterCtr"]]

            if targetPicture["picture_id"] != targetAnswer["picture_id"]:
                ack(
                    response_action="error",
                )
                return

            answeredData["characterCtr"] += 1

            ack(
                response_action="update",
                view=self.slackView.getAnswerLookView(
                    json.dumps(answeredData),
                    answeredData["characterCtr"],
                    answeredData["characterTotalNum"],
                    targetPicture["picture_url"],
                    targetAnswer,
                    answeredData["answererName"]
                )
            )


        @self.app.event("app_home_opened")
        def updateHomeTab(client, event):
            try:
                client.views_publish(
                    user_id=event["user"],
                    view={
	                    "type": "home",
	                    "blocks": self.blockView.getAppHomeBlock(self.postChannel, self.postTime)
                    }
                )
            except Exception as e:
                pass


        @self.app.action("channel_selected")
        def setPostChannel(ack: Ack, body: dict):
            ack()
            self.postChannel = body["actions"][0]["selected_channel"]


        @self.app.action("time_selected")
        def setPostTime(ack: Ack, body: dict):
            ack()
            self.postTime = body["actions"][0]["selected_time"]
