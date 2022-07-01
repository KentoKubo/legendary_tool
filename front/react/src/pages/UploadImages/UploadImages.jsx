import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

const UploadImages = () => {
  const [images, setImages] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const { creatorName } = location.state

  const handleOnAddImage = (event) => {
    if (!event.target.files) return
    console.log(event.target.files)
    console.log(event.target.files[0])

    setImages([...images, event.target.files[0]])
  }

  const handleOnRemoveImage = (index) => {
    // 選択した画像は削除可能
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const clickNextPage = () => {
    navigate('/input-title', { state: { images, creatorName } })
  }

  return (
    <Box
      sx={{
        width: '70%',
        mx: 'auto',
        height: '70vh',
      }}
    >
      <Box
        sx={{
          height: '75%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px solid #a8a8a8',
          color: '#a8a8a8',
        }}
      >
        <Box>
          <CloudUploadIcon sx={{ fontSize: '100px' }} />
          <Text text="画像のアップロード（10枚まで）" style={{ fontSize: '20px' }} />
          <label htmlFor="form-id">
            <Button variant="text" disabled={images.length >= 10} component="span" sx={{ color: '#a8a8a8', mt: 2 }}>
              <Text text="ファイルを開く" style={{ borderBottom: '1px solid #a8a8a8' }} />
            </Button>
            <input
              id="form-id"
              type="file"
              multiple
              accept="image/*,.png,.jpg,.jpeg,.gif"
              onChange={(event) => handleOnAddImage(event)}
              style={{ display: 'none' }}
            />
          </label>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        {images.map((image, idx) => (
          <Box sx={{ position: 'relative', width: '120px', mr: 2 }}>
            <IconButton
              aria-label="delete image"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              onClick={() => handleOnRemoveImage(idx)}
            >
              <CancelIcon />
            </IconButton>
            <img
              src={URL.createObjectURL(image)}
              alt="im"
              style={{
                width: '100%',
              }}
            />
          </Box>
        ))}
      </Box>

      <FlatButton text="つくる" onClick={clickNextPage} />
    </Box>
  )
}

export default UploadImages
