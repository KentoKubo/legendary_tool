import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Box, Grid, TextField } from '@mui/material'
import { Image } from 'mui-image'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const AnswerPreparation = () => {
  const location = useLocation()
  const { state } = location
  const { questionItem, answererName } = state

  const navigate = useNavigate()

  const moveToAnswerPreparation = (_questionItem) => {
    navigate('/answer-questions', { state: { questionItem: _questionItem, answererName } })
  }

  console.log(questionItem)
  return (
    <Container>
      <Text text={`テーマ : ${questionItem.title}`} align="center" style={{ mb: 2 }} />
      <Box sx={{ mx: '20%' }}>
        <Grid container sx={{ backgroundColor: '#fff' }}>
          {questionItem.pictures.map((item) => (
            <Grid item sm={4} key={item.picture_id}>
              <Box>
                <Box sx={{ border: '1px solid #545454', height: '120px' }}>
                  <Image src={`data:image/png;base64,${item.picture}`} height="100%" />
                </Box>
                <TextField
                  disabled
                  sx={{ fieldset: { borderColor: '#545454 !important', borderRadius: '0px' } }}
                  fullWidth
                />
                <TextField
                  disabled
                  sx={{ fieldset: { borderColor: '#545454 !important', borderRadius: '0px' } }}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Text text={questionItem.creator_name} align="right" style={{ color: '#A8A8A8' }} />
      </Box>

      <FlatButton text="回答を始める！" onClick={() => moveToAnswerPreparation(questionItem)} variant="black" />
    </Container>
  )
}

export default AnswerPreparation
