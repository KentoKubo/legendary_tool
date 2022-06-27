import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const Top = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', width: '50%', margin: '0 auto', paddingTop: '240px' }}>
      <Box sx={{ width: '50%' }}>
        <Text text="画像" align="center" />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Text text="みりしら" align="center" />
        <FlatButton text="作ってあそぶ！" variant="white" onClick={() => navigate('/create-questions')} />
        <FlatButton text="答えてあそぶ！" variant="white" onClick={() => navigate('/search-problems')} />
        <FlatButton text="見てあそぶ！" variant="white" onClick={() => navigate('/answer-list')} />
      </Box>
    </Box>
  )
}

export default Top
