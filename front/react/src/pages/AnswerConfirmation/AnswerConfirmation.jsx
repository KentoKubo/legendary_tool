import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { Container, Grid, Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Image } from 'mui-image'

import style from './AnswerConfirmation.module.scss'
import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const AnswerConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { questions, answers, answererName } = location.state

  console.log(answererName)

  const postAnswers = async () => {
    // const res = await axios.post('/answers', { characters: { answers }, answer_name: answererName })
    // console.log(res)
    navigate('/thanks', { state: { text: '回答を受け付けました！' } })
  }

  return (
    <Container>
      <Text text="回答を確認して提出しよう！" align="center" style={{ mb: 2 }} />
      <Box sx={{ mx: '20%' }}>
        <Grid container>
          {/* {questions.pictures.map((item, idx) => (
            <Grid item sm={4} key={item.picture_id}>
              <Box sx={{ border: '1px solid #545454', backgroundColor: '#fff' }}>
                <Box sx={{ textAlign: 'center', border: '1px solid' }}>
                  <Image src={`data:image/png;base64,${item.picture}`} height="100%" />
                </Box>
                <Box sx={{ p: 1, border: '1px solid #545454', height: '1.5em' }}>
                  <Text text={answers[idx].character_name} align="center" />
                </Box>
                <Box sx={{ p: 1, border: '1px solid #545454', height: '4.5em' }}>
                  <Text text={answers[idx].character_explanation} />
                </Box>
              </Box>
            </Grid>
          ))} */}
          <Box>
            <ImageList
              cols={3}
              gap={0}
              sx={{
                border: '2px solid #545454',
                borderRadius: '4px',
                width: '100%',
                margin: '0 -3px 0 0',
                backgroundColor: '#fff',
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {questions.pictures.map((item, idx) => (
                <ImageListItem key="list" className={style.image_list}>
                  <Image
                    src={`data:image/png;base64,${item.picture}`}
                    style={{ width: 'auto', height: '210px', margin: 'auto' }}
                  />
                  <ImageListItemBar
                    position="below"
                    sx={{ borderBottom: '1px solid #545454', borderTop: '1px solid #545454', height: '2em' }}
                  >
                    <Text text={answers[idx].character_name} />
                  </ImageListItemBar>
                  <ImageListItemBar position="below" sx={{ borderBottom: '1px solid #545454', height: '5em' }}>
                    <Text text={answers[idx].character_explanation} align="center" />
                  </ImageListItemBar>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FlatButton text="前の問題へ" onClick={() => navigate(-1)} variant="white" />
        <FlatButton onClick={postAnswers} text="提出する" variant="black" />
      </Box>
    </Container>
  )
}

export default AnswerConfirmation
