import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import style from './Header.module.scss'

const Header = (props) => {
  const { from, children } = props

  return (
    <Box>
      <Box sx={{ height: '120px', display: 'flex', justifyContent: 'space-between' }}>
        <Box mt={2} pl={3}>
          <Button
            variant="text"
            component={Link}
            to="/"
            sx={{
              '&:hover': {
                background: 'none',
              },
              '&:active': {
                background: 'none',
              },
            }}
          >
            <Typography className={style.logo} sx={{ fontSize: '24px', color: '#545454' }}>
              みりしら
            </Typography>
          </Button>
        </Box>
        <Box mt={2} pr={3}>
          <Typography component="p" fontFamily="Noto Sans JP, sans-serif" sx={{ lineHeight: '2rem', color: '#545454' }}>
            モード : {from === 'create' && '作ってあそぶ'}
            {from === 'answer' && '答えてあそぶ'}
            {from === 'see' && '見てあそぶ'}
          </Typography>
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default Header
