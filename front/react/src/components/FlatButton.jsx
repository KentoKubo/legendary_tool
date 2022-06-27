import React from 'react'
import { Box, Button } from '@mui/material'

import Text from './Text'

const FlatButton = (props) => {
  const { text, onClick, variant } = props

  return (
    <Box sx={{ m: 4, textAlign: 'center' }}>
      {variant === 'white' ? (
        <Button
          onClick={onClick}
          variant="outlined"
          sx={{
            border: '2px solid #1A4263',
            borderRadius: '100vh',
            backgroundColor: '#FFFFFF',
            color: '#1A4263',
            width: '240px',
            padding: '12px 40px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          <Text text={text} align="center" />
        </Button>
      ) : (
        <Button
          onClick={onClick}
          variant="contained"
          sx={{
            border: '2px solid #1A4263',
            borderRadius: '100vh',
            backgroundColor: '#1A4263',
            color: '#FFFFFF',
            width: '240px',
            padding: '12px 40px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          <Text text={text} align="center" />
        </Button>
      )}
    </Box>
  )
}

export default FlatButton
