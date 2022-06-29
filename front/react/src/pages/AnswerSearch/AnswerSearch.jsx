import React from 'react'
import { useNavigate } from 'react-router-dom'

import style from './AnswerSearch.module.scss'
import Text from '../../components/Text'

const AnswerSearch = () => {
  // [問題id，タイトル，[写真id，写真]，問題作成者名]
  const questions = [
    { question_id: 0, title: "title0", imgs: [{ img_id: 0, img: "img0" }, { img_id: 1, img: "img1" }], name: "name0" },
    { question_id: 1, title: "title1", imgs: [{ img_id: 2, img: "img2" }, { img_id: 3, img: "img3" }], name: "name1" },
    { question_id: 2, title: "title2", imgs: [{ img_id: 4, img: "img4" }, { img_id: 5, img: "img5" }], name: "name2" }
  ]

  const navigate = useNavigate()
  const catName = (name) => `作成者：${name}`


  const clickBackButton = () => {
    navigate('/')
  }

  const clickLookAnswerButton = (title, imgs, name) => {
    navigate('/answer-select', {state: {title, imgs, name}})
  }

  return (
    <div className={style.container}>
      <button type="button" className={style.backButton} onClick={clickBackButton} variant="outlined" >みりしら</button>
      <input type="search" name="search" placeholder="テーマなどキーワードで入力" />
      <input type="submit" name="submit" value="検索" />
      <ul className={style.titles}>
        {questions.map(item => (
          <li key={item.question_id}>
            <button type="button" className={style.cards} onClick={() => clickLookAnswerButton(item.title, item.imgs, item.name)} onKeyDown={event => clickLookAnswerButton(event, item)}>
              <div className={style.personImage}>
                {item.imgs.map(img => (
                  <Text text={img.img} />
                // <img src={img.img} /> 
                ))} 
              </div> 
              <div className={style.card_info}>
                <Text text="テーマ：" style={{textAlign:'left', fontSize: '10px'}}/>
                <Text text={item.title} style={{fontSize: '30px'}}/>
                <Text text={catName(item.name)} style={{textAlign:'left', fontSize: '10px'}}/>
              </div>
            </button>
          </li>
          ))}
      </ul>
    </div>
  )
}

export default AnswerSearch
