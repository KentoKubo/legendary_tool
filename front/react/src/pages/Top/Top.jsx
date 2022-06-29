import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { Image } from 'mui-image'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'
import TopImage from '../../images/top.png'

const Top = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', width: '50%', margin: '0 auto', paddingTop: '240px' }}>
      <Box sx={{ width: '50%' }}>
        <Image src={TopImage} alt="みりしらイメージ画像" sx={{ width: '100%', animation: 'none !important' }} />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Text text="みりしら" align="center" />
        <FlatButton
          text="作ってあそぶ！"
          variant="white"
          onClick={() => navigate('/input-name', {state: {from: "create"}})}
          style={{
            background: 'blue',
          }}
        />
        <FlatButton text="答えてあそぶ！" variant="white" onClick={() => navigate('/search-problems', {state: {from: "answer"}})} />
        <FlatButton text="見てあそぶ！" variant="white" onClick={() => navigate('/answer-search')} />
      </Box>
    </Box>
  )
}

export default Top
