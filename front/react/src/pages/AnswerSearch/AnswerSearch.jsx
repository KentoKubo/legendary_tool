import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import style from './AnswerSearch.module.scss'

const AnswerSearch = () => {
  // [問題id，タイトル，[写真id，写真]，問題作成者名]
  const questions = [
    { question_id: 0, title: "title0", photos: [{ photo_id: 0, photo: "photo0" }, { photo_id: 1, photo: "photo1" }], name: "name0" },
    { question_id: 1, title: "title1", photos: [{ photo_id: 2, photo: "photo2" }, { photo_id: 3, photo: "photo3" }], name: "name1" },
    { question_id: 2, title: "title2", photos: [{ photo_id: 4, photo: "photo4" }, { photo_id: 5, photo: "photo5" }], name: "name2" }
  ]

  const navigate = useNavigate()

  const clickBackButton = () => {
    navigate('/')
  }

  const clickLookAnswerButton = (item) => {
    navigate('/answer-select', {state: {title: item} })
  }

  return (
    <div className={style.container}>
      <Button onClick={clickBackButton} variant="outlined">メニューへ</Button>
      <h1>回答検索画面</h1>
      <input type="search" name="search" placeholder="キーワードを入力" />
      <input type="submit" name="submit" value="検索" />
      <div className={style.personImage}>image</div>
      <ul>
        {questions.map(item => (
            <li key={item.question_id}>Q{item.question_id+1} {item.title} <Button onClick={() => clickLookAnswerButton(item)} variant="outlined">見る</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default AnswerSearch
