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
/* eslint react/jsx-curly-brace-presence:0 */

const AnswerDetail = () => {
  const [selectedAnswerNum, setSelectedAnswerNum] = useState(0)
  const [answerList, setAnswerList] = useState([])
  const [answer, setAnswer] = useState([])
  // const [answerName, setAnswerName] = useState()
  // const [createAt, setCreateAt] = useState()

  const navigate = useNavigate()
  const location = useLocation()

  const { questionItem } = location.state

  useEffect(() => {
    const getAnswerList = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_HOST}/answers/`, {
        params: { question_id: questionItem.question_id },
      })
      setAnswerList(result.data.answers)
    }
    getAnswerList()
  }, [])
  useEffect(() => {
    const fetchAnswer = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API_HOST}/answers/${answerList[selectedAnswerNum].answer_id}/`
      )
      setAnswer(result.data.characters)
    }
    fetchAnswer()
  }, [answerList, selectedAnswerNum])

  const clickBackButton = () => {
    navigate(-2)
  }

  const clickPrevButton = () => {
    if (selectedAnswerNum >= 0) {
      setSelectedAnswerNum(selectedAnswerNum - 1)
    }
  }

  const clickNextButton = () => {
    if (selectedAnswerNum < answerList.length) {
      setSelectedAnswerNum(selectedAnswerNum + 1)
    }
  }
  const toDate = () => {
    const date = new Date(answerList[selectedAnswerNum].create_at)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <div className={style.container}>
      <i className="icon-download" style={{ fontSize: '80px' }} />
      <div style={{ display: 'flex' }}>
        {selectedAnswerNum !== 0 ? (
          <button className={style.button} type="button" onClick={clickPrevButton}>
            <img src={left} alt="previous" />
            <Text text="前の回答へ" style={{ color: '#545454', fontSize: 'small' }} />
          </button>
        ) : (
          <button type="button">
            <img src={left} alt="previous" style={{ opacity: '50%' }} />
            <Text text="前の回答へ" style={{ color: '#545454', fontSize: 'small', opacity: '50%' }} />
          </button>
        )}
        <div>
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
                  <Image
                    className={style.imgList}
                    src={`data:image/png;base64,${picture.picture}`}
                    style={{ width: '50%', margin: 'auto' }}
                  />
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
          {answerList.length > 0 && (
            <Text
              text={`回答者 : ${answerList[selectedAnswerNum].answerer_name}\u3000 回答日時 : ${toDate()}`}
              align="right"
              style={{
                width: '70%',
                margin: 'auto',
                color: '#545454',
              }}
            />
          )}
        </div>
        {selectedAnswerNum !== answerList.length - 1 ? (
          <button type="button" onClick={clickNextButton}>
            <img src={right} alt="next" />
            <Text text="次の回答へ" style={{ color: '#545454', fontSize: 'small' }} />
          </button>
        ) : (
          <button type="button">
            <img src={right} alt="next" style={{ opacity: '50%' }} />
            <Text text="次の回答へ" style={{ color: '#545454', fontSize: 'small', opacity: '50%' }} />
          </button>
        )}
      </div>
      <FlatButton text="一覧に戻る" onClick={clickBackButton} variant="white" />
    </div>
  )
}

export default AnswerDetail
