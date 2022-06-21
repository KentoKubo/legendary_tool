import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, TextField } from '@mui/material'
import style from './QuestionList.module.scss'

const QuestionList = () => {
  const questions = [
    { id: 'id1', question: 'question1' },
    { id: 'id2', question: 'question2' },
    { id: 'id3', question: 'question3' },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [answerList, setAnswerList] = useState([])

  const navigate = useNavigate()

  const addToAnswerList = () => {
    const newAnswerList = [...answerList, currentAnswer]
    setAnswerList(newAnswerList)
    setCurrentAnswer('')
  }

  const popFromAnswerList = () => {
    const newAnswerList = [...answerList]
    newAnswerList.pop()
    setAnswerList(newAnswerList)
    setCurrentAnswer('')
  }

  const clickPrevButton = () => {
    if (currentQuestionNumber === 1) navigate('/select-person')
    else {
      setCurrentQuestion(questions[currentQuestionNumber - 1])
      setCurrentQuestionNumber(currentQuestionNumber - 1)
      popFromAnswerList()
    }
  }

  const clickNextButton = () => {
    if (currentQuestionNumber === questions.length - 1) navigate('/result')
    else {
      setCurrentQuestion(questions[currentQuestionNumber + 1])
      setCurrentQuestionNumber(currentQuestionNumber + 1)
      addToAnswerList()
    }
  }

  const onChangeAnswer = useCallback((event) => setCurrentAnswer(event.target.value), [setCurrentAnswer])

  return (
    <div className={style.container}>
      <h1>質問に答える画面</h1>
      <div className={style.personImage}>image</div>
      <div className={style.questionForm}>
        <div className={style.questionText}>
          <p>
            Q{currentQuestionNumber + 1} : {currentQuestion.question}
          </p>
        </div>
        <TextField className={style.answerInput} onChange={onChangeAnswer} label="回答欄" autoComplete="off" />
      </div>
      <div className={style.footerButtons}>
        <Button onClick={clickPrevButton} variant="outlined">
          ＜
        </Button>
        <Button onClick={clickNextButton} variant="outlined">
          ＞
        </Button>
      </div>
    </div>
  )
}

export default QuestionList
