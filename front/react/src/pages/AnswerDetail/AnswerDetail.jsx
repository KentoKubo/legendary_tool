import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

import Image from 'mui-image'
import style from './AnswerDetail.module.scss'
import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'
// import "./fontello.css"

import pic1 from '../../images/pic1.png'
import pic2 from '../../images/pic2.png'
import pic3 from '../../images/pic3.png'
import pic4 from '../../images/pic4.png'
import pic5 from '../../images/pic5.png'
import pic6 from '../../images/pic6.png'
import left from '../../images/left.png'
import right from '../../images/right.png'

/* eslint no-console:0 */
/* eslint no-return-assign:0 */
/* eslint no-param-reassign:0 */

const AnswerDetail = () => {
  // const answers = [
  //     {
  //         "answer_id": 0,
  //         "answerer_name": "hira",
  //         "create_at": "2022-01-31T23:59"
  //     },
  //     {
  //         "answer_id": 1,
  //         "answerer_name": "hira",
  //         "create_at": "2022-01-31T23:59"
  //     },
  // ]

  const [selectedAnswerNum, setSelectedAnswerNum] = useState(0)

  // const answer = answers[selectedAnswerNum].answer_id

  const answer = [
    {
      picture_id: 0,
      character_name: '炭治郎',
      character_explanation: '優しい人で強い',
    },
    {
      picture_id: 1,
      character_name: 'nezuko',
      character_explanation: 'かわいい',
    },
    {
      picture_id: 2,
      character_name: 'zennitsu',
      character_explanation: '黄色い',
    },
    {
      picture_id: 3,
      character_name: 'inosuke',
      character_explanation: '猪',
    },
    {
      picture_id: 4,
      character_name: 'shinobu',
      character_explanation: '怖い',
    },
    {
      picture_id: 5,
      character_name: 'giyu',
      character_explanation: '無口',
    },
  ]

  const question = {
    question_id: 0,
    title: '鬼滅の刃 ミリしら',
    pictures: [
      {
        picture_id: 0,
        picture: pic1,
      },
      {
        picture_id: 1,
        picture: pic2,
      },
      {
        picture_id: 2,
        picture: pic3,
      },
      {
        picture_id: 3,
        picture: pic4,
      },
      {
        picture_id: 4,
        picture: pic5,
      },
      {
        picture_id: 5,
        picture: pic6,
      },
    ],
    creator_name: 'hk',
    create_at: '2022-01-31T23:59',
  }

  const navigate = useNavigate()
  question.pictures.map((quesItem) =>
    answer.map((ansItem) => ansItem.picture_id === quesItem.picture_id && (ansItem.picture = quesItem.picture))
  )

  const clickBackButton = () => {
    navigate(-2)
  }

  const clickPrevButton = () => {
    setSelectedAnswerNum(selectedAnswerNum - 1)
  }
  const clickNextButton = () => {
    setSelectedAnswerNum(selectedAnswerNum + 1)
  }

  return (
    <div className={style.container}>
      <i className="icon-download" style={{ fontSize: '80px' }} />
      <div style={{ display: 'flex' }}>
        <button type="button" onClick={clickPrevButton}>
          <img src={left} alt="previous" />
          <Text text="前の回答へ" style={{ color: '#545454', fontSize: 'small' }} />
        </button>
        <ImageList
          cols={3}
          gap={0}
          sx={{
            border: '3px solid #545454',
            borderRadius: '10px',
            width: '70%',
            margin: 'auto',
            boxShadow: '0 0 25px 0 rgba(0, 0, 0, .3)',
            backgroundColor: '#fff',
          }}
        >
          {answer.map((item) => (
            <ImageListItem className={style.imgListItem} key={item.img} sx={{ margin: '0 0 -1px -1px' }}>
              <Image className={style.imgList} src={item.picture} style={{ width: '50%', margin: 'auto' }} />
              <ImageListItemBar
                position="below"
                title={item.character_name}
                sx={{ borderBottom: '1px solid #545454', borderTop: '1px solid #545454' }}
              />
              <ImageListItemBar
                position="below"
                title={item.character_explanation}
                sx={{ borderBottom: '1px solid #545454' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <button type="button" onClick={clickNextButton}>
          <img src={right} alt="next" />
          <Text text="次の回答へ" style={{ color: '#545454', fontSize: 'small' }} />
        </button>
      </div>
      <FlatButton text="一覧に戻る" onClick={clickBackButton} variant="white" />
    </div>
  )
}

export default AnswerDetail
