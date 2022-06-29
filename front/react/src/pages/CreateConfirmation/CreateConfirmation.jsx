import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import axios from 'axios'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const CreateConfirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { creatorName, title, images } = location.state

  const clickCreateButton = async () => {
    const data = new FormData()

    data.append('creator_name', creatorName)
    data.append('title', title)
    data.append('pictures', images)

    try {
      axios.post('/questions', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate('/thanks', { state: { text: '問題を作成しました！' } })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Text text={`テーマ : ${title}`} align="center" />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
        <FlatButton text="もどる" onClick={() => navigate(-1)} variant="white" />
        <FlatButton text="作成する" onClick={clickCreateButton} />
      </Box>
    </Box>
  )
}

export default CreateConfirmation
