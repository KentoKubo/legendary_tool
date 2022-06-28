import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { Container, Grid, Box } from '@mui/material'
import { Image } from 'mui-image'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const AnswerConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { questions, answers, answererName } = location.state

  console.log(answererName)

  const postAnswers = async () => {
    // await axios.post('/answers', { characters: { answers }, answer_name: answererName })
    navigate('/thanks')
  }

  return (
    <Container sx={{ paddingTop: '120px' }}>
      <Text text="回答を確認して提出しよう！" align="center" style={{ mb: 2 }} />
      <Box sx={{ mx: '20%' }}>
        <Grid container>
          {questions.pictures.map((item, idx) => (
            <Grid item sm={4} key={item.picture_id}>
              <Box sx={{ border: '1px solid #545454', backgroundColor: '#fff' }}>
                <Box sx={{ textAlign: 'center', border: '1px solid' }}>
                  <Image src={item.picture} height="100%" />
                </Box>
                <Box sx={{ p: 1, border: '1px solid #545454', height: '1.5em' }}>
                  <Text text={answers[idx].character_name} align="center" />
                </Box>
                <Box sx={{ p: 1, border: '1px solid #545454', height: '4.5em' }}>
                  <Text text={answers[idx].character_explanation} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FlatButton text="前の問題へ" variant="white" />
        <FlatButton onClick={postAnswers} text="提出する" variant="black" />
      </Box>
    </Container>
  )
}

export default AnswerConfirmation