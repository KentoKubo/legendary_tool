import React from 'react'
import { useNavigate, useLocation  } from 'react-router-dom'

import { Button } from '@mui/material'
import style from './AnswerSelect.module.scss'

const AnswerSelect = () => {
  const answers = [
    { answer_id: 0, answer_name: "name1", date: "2022-06-25", reaction: 3},
    { answer_id: 1, answer_name: "name1", date: "2022-06-26", reaction: 4},
    { answer_id: 2, answer_name: "name2", date: "2022-06-25", reaction: 5},
    { answer_id: 3, answer_name: "name2", date: "2022-06-25", reaction: 6},
    { answer_id: 4, answer_name: "name2", date: "2022-06-26", reaction: 7}
  ]

  const navigate = useNavigate()
  const location = useLocation()

  const {title} = location.state.title

  const clickBackButton = () => {
    navigate('/answer-search')
  }
  const clickLookAnswerButton = (item) => {
    navigate('/answer-detail', {state: {title: item} })
  }

  return (
    <div className={style.container}>
      <button type="button" className={style.backButton} onClick={clickBackButton} variant="outlined" >みりしら</button>
      <h1>回答選択画面</h1>
      <h1>{title}</h1>
      <ul>
        {answers.map(item => (
            <li key={item.answer_id}>A{item.answer_id+1} {item.reaction} {item.answer_name} <Button onClick={() => clickLookAnswerButton(title)} variant="outlined">答える</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default AnswerSelect
