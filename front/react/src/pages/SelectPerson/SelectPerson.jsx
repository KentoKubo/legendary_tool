import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'

import style from './SelectPerson.module.scss'

const SelectPerson = () => {
  const persons = [
    { targetid: 'id1', picture: 'picture1', name: 'test1' },
    { targetid: 'id2', picture: 'picture2', name: 'test2' },
    { targetid: 'id3', picture: 'picture3', name: 'test3' },
  ]

  const navigate = useNavigate()

  const clickAnswerQuestionButton = (targetid) => {
    // 質問を答える画面へ遷移する関数
    // stateにtargetid格納し，遷移先の画面へ値を渡す
    navigate('/question-list', { state: { targetid } })
  }
  const clickSeeAnswerButton = (targetid) => {
    // 回答を見る画面へ遷移する関数
    // stateにtargetid格納し，遷移先の画面へ値を渡す
    navigate('/answer-list', { state: { targetid } })
  }

  return (
    <div className={style.container}>
      <h1>対象の人を選ぶ画面</h1>
      <div className={style.personContainer}>
        {persons.map((person) => (
          <div className={style.personRow} key={person.targetid}>
            <div className="person-image">{person.picture}</div>
            {/* TODO: divからbase64形式の画像表示に変更 */}
            <Button onClick={() => clickAnswerQuestionButton(person.targetid)} variant="outlined">
              回答する
            </Button>
            <Button onClick={() => clickSeeAnswerButton(person.targetid)} variant="outlined">
              回答を見る
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectPerson
