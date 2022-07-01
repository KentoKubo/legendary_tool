import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import axios from 'axios'

import Image from 'mui-image'
import style from './AnswerDetail.module.scss'
import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

import left from '../../images/left.png'
import right from '../../images/right.png'

/* eslint no-console:0 */
/* eslint no-return-assign:0 */
/* eslint no-param-reassign:0 */

const AnswerDetail = () => {
  // const answer = answers[selectedAnswerNum].answer_id

  // const answers1 = [
  //   {
  //     answer_id: 0,
  //     answerer_name: 'hira',
  //     create_at: '2022-06-28T06:47:20.347612Z',
  //   },
  //   {
  //     answer_id: 1,
  //     answerer_name: 'hira',
  //     create_at: '2022-06-28T06:47:20.347612Z',
  //   },
  // ]

  // const answer1 = [
  //   {
  //     picture_id: 0,
  //     character_name: '炭治郎',
  //     character_explanation: '優しい人で強い',
  //   },
  //   {
  //     picture_id: 1,
  //     character_name: 'nezuko',
  //     character_explanation: 'かわいい',
  //   },
  //   {
  //     picture_id: 2,
  //     character_name: 'zennitsu',
  //     character_explanation: '黄色い',
  //   },
  //   {
  //     picture_id: 3,
  //     character_name: 'inosuke',
  //     character_explanation: '猪',
  //   },
  //   {
  //     picture_id: 4,
  //     character_name: 'shinobu',
  //     character_explanation: '怖い',
  //   },
  //   {
  //     picture_id: 5,
  //     character_name: 'giyu',
  //     character_explanation: '無口',
  //   },
  // ]

  // const answer2 = [
  //   {
  //     picture_id: 0,
  //     character_name: '炭治郎',
  //     character_explanation: '111111111122222222223333333333',
  //   },
  //   {
  //     picture_id: 1,
  //     character_name: 'nezuko',
  //     character_explanation: '2',
  //   },
  //   {
  //     picture_id: 2,
  //     character_name: 'zennitsu',
  //     character_explanation: '2',
  //   },
  //   {
  //     picture_id: 3,
  //     character_name: 'inosuke',
  //     character_explanation: '2',
  //   },
  //   {
  //     picture_id: 4,
  //     character_name: 'shinobu',
  //     character_explanation: '2',
  //   },
  //   {
  //     picture_id: 5,
  //     character_name: 'giyu',
  //     character_explanation: '2',
  //   },
  // ]

  const [selectedAnswerNum, setSelectedAnswerNum] = useState(0)
  const [answerList, setAnswerList] = useState([])
  const [answer, setAnswer] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  const { questionItem } = location.state


  useEffect(() => {
    const getAnswerList = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_HOST}/answers/`, { param: { question_id: questionItem.question_id } })
      setAnswerList(result.data.answers)
    }
    getAnswerList()
  }, [])

  useEffect(() => {
    const fetchAnswer = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_HOST}/answers/${answerList[selectedAnswerNum].answer_id}/`)
      setAnswer(result.data.characters)
    }
    fetchAnswer()
    // setAnswer(answer1)
  }, [answerList])

  questionItem.pictures.map((quesItem) =>
    answer.map((ansItem) => ansItem.picture_id === quesItem.picture_id && (ansItem.picture = quesItem.picture))
  )

  const clickBackButton = () => {
    navigate(-2)
  }

  const clickPrevButton = () => {
    if (selectedAnswerNum > 0) {
      setSelectedAnswerNum(selectedAnswerNum - 1)
      setAnswer(answerList[selectedAnswerNum])
    }
  }

  const clickNextButton = () => {
    if (selectedAnswerNum < answerList.length) {
      setSelectedAnswerNum(selectedAnswerNum + 1)
      setAnswer(answerList[selectedAnswerNum])
    }
  }

  return (
    <div className={style.container}>
      <i className="icon-download" style={{ fontSize: '80px' }} />
      <div style={{ display: 'flex' }}>
        {(selectedAnswerNum !== 0)
          ? <button className={style.button} type='button' onClick={clickPrevButton}>
              <img src={left} alt="previous"/>
              <Text text='前の回答へ' style={{color: '#545454', fontSize: 'small'}}/>
            </button>
          : <button type='button' onClick={clickPrevButton}>
              <img src={left} alt="previous" style={{opacity: "50%"}}/>
              <Text text='前の回答へ' style={{color: '#545454', fontSize: 'small', opacity: "50%"}}/>
            </button>
        }
        <ImageList
          cols={3}
          gap={0}
          sx={{
            border: '3px solid #545454',
            borderRadius: '4px',
            width: '70%',
            margin: 'auto',
            boxShadow: '0 0 25px 0 rgba(0, 0, 0, .3)',
            backgroundColor: '#fff',
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {answer.length > 0 &&
            questionItem.pictures.map((picture, idx) => (
              <ImageListItem className={style.imgListItem} key={picture.picture_id} sx={{ margin: '0 0 -1px -1px' }}>
                <Image className={style.imgList} src={picture.picture} style={{ width: '50%', margin: 'auto' }} />
                <ImageListItemBar
                  position="below"
                  title={answer[idx].character_name}
                  sx={{
                    borderBottom: '1px solid #545454',
                    borderTop: '1px solid #545454',
                    height: '2em',
                  }}
                />
                <ImageListItemBar
                  position="below"
                  title={answer[idx].character_explanation}
                  sx={{ borderBottom: '1px solid #545454', height: '5em', lineHeight: '2em' }}
                />
              </ImageListItem>
            ))}
        </ImageList>
        {(selectedAnswerNum !== 0)
          ? <button type="button" onClick={clickNextButton}>
              <img src={right} alt="next" />
              <Text text="次の回答へ" style={{ color: '#545454', fontSize: 'small' }} />
            </button>
          : <button type="button" onClick={clickNextButton}>
              <img src={right} alt="next" style={{opacity: "50%"}}/>
              <Text text="次の回答へ" style={{ color: '#545454', fontSize: 'small', opacity: "50%"}} />
            </button>
        }
      </div>
      <FlatButton text="一覧に戻る" onClick={clickBackButton} variant="white" />
    </div>
  )
}

export default AnswerDetail
