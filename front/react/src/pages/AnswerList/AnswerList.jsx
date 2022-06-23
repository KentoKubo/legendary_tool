import React from 'react'
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

  const navigate = useNavigate()

  const clickBackButton = () => {
    navigate('/select-person')
  }

  const clickLookAnswerButton = () => {
    navigate('/answer-detail')
  }

  return (
    <div className={style.container}>
      <Button onClick={clickBackButton} variant="outlined">最初に戻る</Button>
      <h1>解答一覧を見る画面</h1>
      <div className={style.personImage}>image</div>
      <ul>
        {questions.map(item => (
            <li key={item}>Q{item.question_id+1} {item.question} <Button onClick={clickLookAnswerButton} variant="outlined">見る</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default AnswerList
