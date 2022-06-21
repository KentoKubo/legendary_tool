import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import style from './AnswerList.module.scss'

const AnswerList = () => {
  const questions = [
    { question_id: 0, question: "どんな人？" },
    { question_id: 1, question: "あだ名は？" },
    { question_id: 2, question: "あだ名は？" },
    { question_id: 3, question: "どんな人？" },
    { question_id: 4, question: "どんな人？" }
  ]

  const [setCurrentQuestion] = useState(questions[0])
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
  const [setCurrentAnswer] = useState('')
  const [answerList, setAnswerList] = useState([])

  const navigate = useNavigate()

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

  return (
    <div className={style.container}>
      <h1>解答一覧を見る画面</h1>
      <div className={style.personImage}>image</div>
      <ul>
        {questions.map(item => (
            <li key={item}>Q{item.question_id+1} {item.question} <Button onClick={clickPrevButton} variant="outlined">見る</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default AnswerList
