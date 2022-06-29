import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, TextField } from '@mui/material'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const InputName = () => {
  const [name, setName] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const { questionItem, from } = location.state

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const validateName = () =>{
    if (name.length > 15) {
      alert(`15文字以内で入力してください : 現在${name.length}文字です`)
    } else if (name.length === 0) {
      alert('なまえを入力してください')
    } else return true
    return false
  }

  const moveToAnswerPreparation = () => {
    if (validateName()) {
      if (from === "create") {
        navigate('/upload-images', { state: { creatorName: name }})
      }
      if (from === "answer") {
        navigate('/answer-preparation', { state: { questionItem, answererName: name } })
      }
    }
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '240px' }}>
      <Text text="あなたのお名前は？(15文字以内)" style={{ mb: 3 }} align="center" />
      <TextField
        value={name}
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

export default InputName
