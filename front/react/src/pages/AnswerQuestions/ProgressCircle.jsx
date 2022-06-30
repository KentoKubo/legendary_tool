import React from 'react'
import { Box } from '@mui/material'

const ProgressCircle = (props) => {
  const { questionItem, currentPictureNumber } = props

  return (
    <Box my={2} sx={{ textAlign: 'center' }}>
      {questionItem.pictures.map((item, idx) =>
        idx !== currentPictureNumber ? (
          <Box
            sx={{
              display: 'inline-block',
              width: '1em',
              height: '1em',
              margin: '0 0.5em',
              backgroundColor: '#D9D9D9',
              borderRadius: '50%',
            }}
          />
        ) : (
          <Box
            sx={{
              display: 'inline-block',
              width: '1em',
              height: '1em',
              margin: '0 0.5em',
              backgroundColor: '#1A4263',
              borderRadius: '50%',
            }}
          />
        )
      )}
    </Box>
  )
}

export default ProgressCircle
