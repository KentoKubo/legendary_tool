import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const Thanks = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const { text } = location.state

  return (
    <Box sx={{ paddingTop: '360px' }}>
      <Text text={text} align="center" />
      <FlatButton text="ホームにもどる" variant="black" onClick={() => navigate('/')} />
    </Box>
  )
}

export default Thanks
