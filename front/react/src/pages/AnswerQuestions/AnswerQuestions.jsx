import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Box, TextField, CircularProgress } from '@mui/material'
import { Image } from 'mui-image'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'
import ProgressCircle from './ProgressCircle'

/* eslint no-alert: 0 */
/* eslint no-console: 0 */

const AnswerQuestions = () => {
  const location = useLocation()
  const { state } = location
  const { questionItem, answererName } = state

  const [currentPicture, setCurrentPicture] = useState(questionItem.pictures[0])
  const [currentPictureNumber, setCurrentPictureNumber] = useState(0)
  const [name, setName] = useState('')
  const [explanation, setExplanation] = useState('')
  const [answerList, setAnswerList] = useState([])

  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()

  const validateForm = () => {
    if (name.length > 11 && explanation > 30) {
      alert('キャラクター名は11文字以内・ひとことは30文字以内で入力してください')
    } else if (name.length > 15) {
      alert('キャラクター名は11文字以内で入力してください')
    } else if (explanation.length > 30) {
      alert('ひとことは30文字以内で入力してください')
    } else if (name.length === 0 && explanation.length === 0) {
      alert('キャラクター名とひとことを入力してください')
    } else if (name.length === 0) {
      alert('キャラクター名を入力してください')
    } else if (explanation.length === 0) {
      alert('ひとことを入力してください')
    } else {
      return true
    }
    return false
  }

  const popFromAnswerList = () => {
    const newAnswerList = [...answerList]
    newAnswerList.pop()
    setAnswerList(newAnswerList)
    setName('')
    setExplanation('')
  }

  const clickPrevButton = () => {
    if (currentPictureNumber > 0) {
      popFromAnswerList()
      setCurrentPicture(questionItem.pictures[currentPictureNumber - 1])
      setCurrentPictureNumber(currentPictureNumber - 1)
    }
  }

  const addToAnswerList = () => {
    const newAnswerList = [
      ...answerList,
      { picture_id: currentPicture.pictureId, character_name: name, character_explanation: explanation },
    ]
    setAnswerList(newAnswerList)
    setName('')
    setExplanation('')
  }

  const clickNextButton = () => {
    if (validateForm()) {
      addToAnswerList()
      setCurrentPicture(questionItem.pictures[currentPictureNumber + 1])
      setCurrentPictureNumber(currentPictureNumber + 1)
    }
  }

  const clickConfirmButton = () => {
    if (validateForm()) {
      const newAnswerList = [
        ...answerList,
        {
          picture_id: currentPicture.pictureId,
          character_name: name,
          character_explanation: explanation,
        },
      ]
      navigate('/answer-confirmation', { state: { questions: questionItem, answers: newAnswerList, answererName } })
    }
  }

  const onChangeName = useCallback((event) => setName(event.target.value), [setName])

  const onChangeExplanation = useCallback((event) => setExplanation(event.target.value), [setExplanation])

  const finishTimer = () => {
    clickNextButton()
    setProgress(0)
  }

  useEffect(() => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? finishTimer() : Math.min(prevProgress + 3.34, 100)))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [currentPictureNumber])

  return (
    <Container container sx={{ width: '60%', paddingTop: '120px' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CircularProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '40%', border: '1px solid #545454' }}>
          <Image src={currentPicture.picture} />
        </Box>
        <Box sx={{ width: '60%', px: 4 }}>
          <Box>
            <Text text="キャラクター名を入力" style={{ mb: 1 }} />
            <TextField
              sx={{ fieldset: { border: '2px solid #545454' } }}
              value={name}
              onChange={onChangeName}
              autoComplete="off"
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Text text="このキャラクターをひとことで！" style={{ mb: 1 }} />
            <TextField
              sx={{ fieldset: { border: '2px solid #545454' } }}
              value={explanation}
              onChange={onChangeExplanation}
              autoComplete="off"
              multiline
              rows={6}
              fullWidth
            />
          </Box>
        </Box>
      </Box>
      <ProgressCircle questionItem={questionItem} currentPictureNumber={currentPictureNumber} />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {currentPictureNumber > 0 ? (
          <FlatButton onClick={clickPrevButton} text="前の問題へ" variant="white" />
        ) : (
          <FlatButton onClick={clickPrevButton} text="前の問題へ" variant="white" disabled="true" />
        )}
        {currentPictureNumber < questionItem.pictures.length - 1 ? (
          <FlatButton onClick={() => clickNextButton()} text="つぎへ" variant="black" />
        ) : (
          <FlatButton onClick={() => clickConfirmButton()} text="回答を確認" variant="black" />
        )}
      </Box>
    </Container>
  )
}

export default AnswerQuestions
