import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const Thanks = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ paddingTop: '360px' }}>
      <Text text="回答を受け付けました！" align="center" />
      <FlatButton text="ホームにもどる" variant="black" onClick={() => navigate('/')} />
    </Box>
  )
}

export default Thanks
