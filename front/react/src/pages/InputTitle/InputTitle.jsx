import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, TextField, ImageList, ImageListItem } from '@mui/material'
import Image from 'mui-image'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const InputTitle = () => {
  const [title, setTitle] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const { images, creatorName } = location.state

  console.log(images[0])

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const validateTitle = () => {
    if (title.length > 30) {
      alert(`30文字以内で入力してください : 現在${title.length}文字です`)
    } else if (title.length === 0) {
      alert('タイトルを入力してください')
    } else return true
    return false
  }

  const clickNextButton = () => {
    if (validateTitle()) {
      navigate('/create-confirmation', { state: { creatorName, title, images } })
    }
  }

  return (
    <Box sx={{ textAlign: 'center', paddingTop: '120px' }}>
      <Box
        sx={{
          width: '70%',
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: '50%',
            mx: 4,
          }}
        >
          <ImageList
            cols={3}
            gap={0}
            sx={{
              border: '2px solid #545454',
              borderRadius: '4px',
              width: '100%',
              backgroundColor: '#fff',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {images.map((item) => (
              <ImageListItem key="a" sx={{ margin: '0 0 -1px -1px' }}>
                <Image
                  src={URL.createObjectURL(item)}
                  style={{ width: '100%', margin: 'auto', animation: 'none !important', transitionDuration: 'none' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Text text="この問題のタイトルは？" style={{ mb: 3, color: '#545454' }} align="left" />
          <TextField
            value={title}
            onChange={handleChange}
            variant="filled"
            autoComplete="off"
            sx={{
              border: '2px solid #545454',
              borderRadius: '4px',
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&:hover': { backgroundColor: '#fff' },
              },
              '& .MuiFilledInput-input': {
                padding: '12px 12px',
                '&:focus': { backgroundColor: '#fff' },
                '&:active': { backgroundColor: '#fff' },
              },
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
        <FlatButton text="写真選択にもどる" onClick={() => navigate(-1)} variant="white" />
        <FlatButton text="つぎへ" onClick={clickNextButton} />
      </Box>
    </Box>
  )
}

export default InputTitle
