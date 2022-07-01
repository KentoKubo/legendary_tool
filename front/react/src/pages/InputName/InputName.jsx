import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, TextField, Alert } from '@mui/material'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'
import Header from '../../components/Header/Header'

const InputName = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const { questionItem, from } = location.state

  const handleChange = (event) => {
    setName(event.target.value)
    setError(false)
  }

  const validateName = () => {
    if (name.length > 15) {
      // alert(`1から15文字以内で入力してください : 現在${name.length}文字です`)
      setError(true)
      return false
    }
    if (name.length === 0) {
      // alert('なまえを入力してください')
      setError(true)
      return false
    }
    // } else return true
    // return false
    setError(false)
    return true
  }

  const moveToAnswerPreparation = () => {
    if (validateName()) {
      if (from === 'create') {
        navigate('/upload-images', { state: { creatorName: name } })
      }
      if (from === 'answer') {
        navigate('/answer-preparation', { state: { questionItem, answererName: name } })
      }
    }
  }

  return (
    <Header from={from}>
      <Box sx={{ textAlign: 'center', paddingTop: '120px' }}>
        <Text text="あなたのお名前は？(15文字以内)" style={{ mb: 3 }} align="center" />
        <Box
          sx={{
            width: '50%',
            mx: 'auto',
          }}
        >
          <TextField
            value={name}
            onChange={handleChange}
            variant="filled"
            autoComplete="off"
            sx={{
              width: '100%',
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
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              1から15文字以内で入力してください
            </Alert>
          )}
        </Box>
        <FlatButton text="つぎへ" onClick={moveToAnswerPreparation} />
      </Box>
    </Header>
  )
}

export default InputName
