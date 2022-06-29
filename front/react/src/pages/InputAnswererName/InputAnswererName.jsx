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
    if (answererName.length > 15) {
      alert(`15文字以内で入力してください : 現在${answererName.length}文字です`)
    } else if (answererName.length === 0) {
      alert('なまえを入力してください')
    } else navigate('/answer-preparation', { state: { questionItem, answererName } })
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '240px' }}>
      <Text text="あなたのお名前は？(15文字以内)" style={{ mb: 3 }} align="center" />
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
            '&:focus': { backgroundColor: '#fff' },
            '&:active': { backgroundColor: '#fff' },
          },
        }}
      />
      <FlatButton text="つぎへ" onClick={moveToAnswerPreparation} />
    </Box>
  )
}

export default InputAnswererName
