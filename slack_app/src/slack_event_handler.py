import logging
import time
import json

from slack_bolt import App, Ack

from slack_views import MirishiraSlackView
from mirishira_api_caller import MirishiraApiCaller

logging.basicConfig(level=logging.DEBUG,
    filename="test.log",
    format="%(asctime)s %(levelname)-7s %(message)s"
    )

logger = logging.getLogger(__name__)

class MirishiraSlackBot:

    def __init__(self, app: App, apiBaseEndpoint: str, frontBaseUrl: str):
        self.app = app
        self.apiBaseEndpoint = apiBaseEndpoint
        self.frontBaseUrl = frontBaseUrl

        self.postChannel = "C03M7F6GGP6"
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
        def postTestMessage(ack: Ack, client, logger: logging.Logger):
            ack()

            oneQuestion = self.mirishiraApiCaller.pickupNewestQuestion()

            client.chat_postMessage(
                channel=self.postChannel,
                blocks=self.slackView.getQuestionBlock(oneQuestion, self.frontBaseUrl)
            )

        @self.app.action("open_answer_modal")
        def openAnswerModal(ack: Ack, body: dict, client, logger: logging.Logger):
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
        def startAnswers(ack: Ack, view: dict, logger: logging.Logger):
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
        def displayFirstQuestion(ack: Ack, view: dict, client, logger: logging.Logger):
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
            # timeCheckCtr = answerData["characterCtr"]

            ack(
                response_action="update",
                view=self.slackView.getAnswerFormView(
                    json.dumps(answerData),
                    answerData["characterCtr"],
                    answerData["characterTotalNum"],
                    # targetPicture["picture"]
                    targetPicture["picture_url"]
                )
                # view=self.slackView.getAnswerFormView(self.answerCtr, len(self.testImageList), self.testImageList[self.answerCtr-1], 30)
            )

            # time.sleep(30)

            # for sec in range(30, -1, -1):
                # time.sleep(1)
                # logger.info(str(sec) + ", " + str(timeCheckCtr) + ", " + str(answerData["characterCtr"]) + ", " + str(json.loads(view["private_metadata"])["characterCtr"]))

            # for sec in range(29, -1, -1):
                # time.sleep(0.7)
                # client.views_update(
                    # external_id="answering_ex_" + str(self.answerCtr),
                    # view=self.slackView.getAnswerFormView(self.answerCtr, len(self.testImageList), self.testImageList[self.answerCtr-1], sec)
                # )

            # client.views_update(
                # external_id="answering_ex_" + str(self.answerCtr),
                # view=self.slackView.getAnswerTimeUpView()
            # )



        @self.app.view("answering")
        def getAnswerAndDisplyNextQuestion(ack: Ack, view: dict, client, logger: logging.Logger):
            # logger.info(view)
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
                    # targetPicture["picture"]
                    targetPicture["picture_url"]
                )
                # view=self.slackView.getAnswerFormView(self.answerCtr, len(self.testImageList), self.testImageList[self.answerCtr-1], 30)
            )

            # time.sleep(30)

            # for sec in range(30, 0, -1):
                # time.sleep(0.7)
                # client.views_update(
                    # external_id="answering_ex_" + str(self.answerCtr),
                    # view=self.slackView.getAnswerFormView(self.answerCtr, len(self.testImageList), self.testImageList[self.answerCtr-1], sec)
                # )

            # client.views_update(
                # external_id="answering_ex_" + str(self.answerCtr),
                # view=self.slackView.getAnswerTimeUpView()
            # )


        @self.app.view("answer_finish")
        def displayThanks(ack: Ack, view: dict, client, logger: logging.Logger):
            ack(
                response_action="update",
                view=self.slackView.getAnswerThanksView()
            )

            answerData = json.loads(view["private_metadata"])
            answerId = self.mirishiraApiCaller.postAnswer(answerData["questionId"], answerData["characters"], answerData["answererName"])

            inputs = view["state"]["values"]
            logger.info(inputs)
            logger.info(inputs.get("share_in_slack", {}))
            logger.info(inputs.get("share_in_slack", {}).get("check_to_share", {}))
            isShare = inputs.get("share_in_slack", {}).get("check_to_share", {}).get("selected_options")[0].get("value")
            logger.info(isShare)

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
        def openAnswerLookModal(ack: Ack, body: dict, client, logger: logging.Logger):
            ack()

            waitView = client.views_open(
                trigger_id=body["trigger_id"],
                view=self.slackView.getAnswerProcessWaitView()
            )

            logger.info(waitView)

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

            client.views_update(
                view_id=waitView["view"]["id"],
                view=self.slackView.getAnswerLookStartView(
                    json.dumps(answeredData),
                    targetQuestion,
                    targetAnswer["answererName"]
                )
            )


        @self.app.view("answer_look_start")
        def displayFirstQuestion(ack: Ack, view: dict, logger: logging.Logger):
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
                    # targetPicture["picture"],
                    targetPicture["picture_url"],
                    targetAnswer,
                    answeredData["answererName"]
                )
            )


        @self.app.view("answer_looking")
        def getAnswerAndDisplyNextQuestion(ack: Ack, view: dict, logger: logging.Logger):
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
                    # targetPicture["picture"],
                    targetPicture["picture_url"],
                    targetAnswer,
                    answeredData["answererName"]
                )
            )


        @self.app.event("app_home_opened")
        def updateHomeTab(client, event, logger):
            try:
                client.views_publish(
                    user_id=event["user"],
                    view={
	                    "type": "home",
	                    "blocks": self.blockView.getAppHomeBlock(self.postChannel, self.postTime)
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
