import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, TextField } from '@mui/material'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const InputAnswererName = () => {
  const [answererName, setAnswererName] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const { questionItem } = location.state

  const handleChange = (event) => {
    setAnswererName(event.target.value)
  }

  const moveToAnswerPreparation = () => {
    navigate('/answer-preparation', { state: { questionItem, answererName } })
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '240px' }}>
      <Text text="あなたのお名前は？" style={{ mb: 3 }} align="center" />
      <TextField
        value={answererName}
        onChange={handleChange}
        variant="filled"
        autoComplete="off"
        sx={{
          width: '50%',
          border: '2px solid #545454',
          borderRadius: '4px',
          '& .MuiFilledInput-root': {
            backgroundColor: '#fff',
            '&:before': { borderBottom: 'none' },
            '&:after': { borderBottom: 'none' },
            '&:hover': { backgroundColor: '#fff' },
          },
          '& .MuiFilledInput-input': {
            padding: '16px 12px',
          },
        }}
      />
      <FlatButton text="つぎへ" onClick={moveToAnswerPreparation} />
    </Box>
  )
}

export default InputAnswererName
