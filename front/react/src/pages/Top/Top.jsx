import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { Image } from 'mui-image'

import FlatButton from '../../components/FlatButton'
import TopImage from '../../images/top.png'
import '../../font/mini-wakuwaku.otf'

import style from './Top.module.scss'

const Top = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', width: '50%', margin: '0 auto', paddingTop: '240px' }}>
      <Box sx={{ width: '50%' }}>
        <Image src={TopImage} alt="みりしらイメージ画像" sx={{ width: '100%', animation: 'none !important' }} />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h1" align="center" className={style.title} sx={{ fontSize: '4rem' }}>
          みりしら
        </Typography>
        <FlatButton
          text="作ってあそぶ！"
          variant="white"
          onClick={() => navigate('/input-name', { state: { from: 'create' } })}
          style={{
            '&:hover': {
              backgroundColor: '#1A4263',
              color: '#fff',
              border: '2px solid #1A4263',
            }
          }}
        />
        <FlatButton
          text="答えてあそぶ！"
          variant="white"
          onClick={() => navigate('/search-questions', { state: { from: 'answer' } })}
          style={{
            '&:hover': {
              backgroundColor: '#1A4263',
              color: '#fff',
              border: '2px solid #1A4263',
            }
          }}
        />
        <FlatButton
          text="見てあそぶ！"
          variant="white"
          onClick={() => navigate('/search-questions', { state: { from: 'see' } })}
          style={{
            '&:hover': {
              backgroundColor: '#1A4263',
              color: '#fff',
              border: '2px solid #1A4263',
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Top
