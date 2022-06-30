import React from 'react'
import { Typography } from '@mui/material'

const Text = (props) => {
  const { text, style, align } = props

  return (
    <Typography component="p" fontFamily="Noto Sans JP, sans-serif" sx={style} align={align}>
      {text}
    </Typography>
  )
}

export default Text
