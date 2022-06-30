import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import Image from 'mui-image'
import axios from 'axios'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'

import style from './CreateConfirmation.module.scss'

const CreateConfirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { creatorName, title, images } = location.state

  const clickCreateButton = async () => {
    const data = new FormData()

    data.append('creator_name', creatorName)
    data.append('title', title)
    data.append('pictures', images)

    try {
      axios.post('/questions', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate('/thanks', { state: { text: '問題を作成しました！' } })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box sx={{ width: '60%', mx: 'auto', pt: '120px' }}>
      <Text text={`テーマ : ${title}`} align="center" style={{ fontSize: '30px', color: '#545454', mb: 4 }} />
      <Box>
        <ImageList
          cols={3}
          gap={0}
          sx={{
            border: '2px solid #545454',
            borderRadius: '4px',
            width: '100%',
            margin: '0 -3px 0 0',
            backgroundColor: '#fff',
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {images.map((item) => (
            <ImageListItem key="list" className={style.image_list}>
              <Image src={URL.createObjectURL(item)} style={{ width: 'auto', height: '210px', margin: 'auto' }} />
              <ImageListItemBar
                position="below"
                sx={{ borderBottom: '1px solid #545454', borderTop: '1px solid #545454', height: '2em' }}
              />
              <ImageListItemBar position="below" sx={{ borderBottom: '1px solid #545454', height: '5em' }} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
        <FlatButton text="もどる" onClick={() => navigate(-1)} variant="white" />
        <FlatButton text="作成する" onClick={clickCreateButton} />
      </Box>
    </Box>
  )
}

export default CreateConfirmation
