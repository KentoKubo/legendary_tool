import requests
import json

class MirishiraApiCaller:
    def __init__(self, apiBaseEndPoint: str):
        self.apiBaseEndPoint = apiBaseEndPoint
        self.commonHeader = {"Accept": "application/json", "Content-Type": "application/json"}


    def pickupNewestQuestion(self):
        response = requests.get(self.apiBaseEndPoint + "questions/", headers=self.commonHeader)
        questionList = json.loads(response.json())["questions"]

        newestQuestion = questionList[-1] #maybe
        return newestQuestion


    def getQuestionFromTitle(self, title):
        response = requests.get(self.apiBaseEndPoint + "questions/?title=" + title, headers=self.commonHeader)
        questionList = json.loads(response.json())["questions"]

        question = questionList[0] #maybe
        return question


    def postAnswer(self, questionId: int, charactersList: list, answererName: str):
        postData = {
            "question_id": questionId,
            "characters":charactersList,
            "answerer_name":answererName
        }

        response = requests.post(self.apiBaseEndPoint + "answers/", json = postData)
        return json.loads(response.json())["answer_id"]


    def searchAndGetAnswer(self, questionId: int, answerId: int):
        response = requests.get(self.apiBaseEndPoint + "answers/?question_id=" + str(questionId), headers=self.commonHeader)
        answerList = json.loads(response.json())["answers"]
        answerInfo = list(filter(lambda oneAnswer : oneAnswer["answer_id"] == answerId, answerList))[0]

        response = requests.get(self.apiBaseEndPoint + "answer/" + str(answerId) + "/", headers=self.commonHeader)
        answer = json.loads(response.json())

        targetAnswer = {
            "answerId": answerInfo["answer_id"],
            "answererName": answerInfo["answerer_name"],
            "characters": answer["characters"]
        }

        return targetAnswer