import React from 'react'
import { Box, Button } from '@mui/material'
import Image from 'mui-image'
import Text from './Text'

const FlatButton = (props) => {
  const { text, onClick, variant, disabled, style, img } = props

  return (
    <Box sx={{ m: 4, textAlign: 'center' }}>
      {variant === 'white' ? (
        <Box>
          <Button
            onClick={onClick}
            variant="outlined"
            sx={[{
              border: '2px solid #1A4263',
              borderRadius: '100vh',
              backgroundColor: '#FFFFFF',
              color: '#1A4263',
              width: '240px',
              padding: '12px 40px',
              zIndex: '100',
              '&:hover': {
                backgroundColor: '#fff',
                borderWidth: '2px',
              },
              '&:hover +.imgBox': {
                opacity: '1',
              }
            }, style]}
            disabled={disabled}
          >
            <Text text={text} align="center" />
          </Button>
          <Box className='imgBox'
            sx={{opacity: '0', zIndex:'-100',}}
          >
            <Image className='image1' src={img} alt='飾り' style={{
              width: '107%',
              height: '107%',
              left:'-12px',
              zIndex:'-1',
              marginTop:'-70px',
            }}/>
          </Box>
        </Box>
      ) : (
        <Box>
          <Button
            onClick={onClick}
            variant="contained"
            sx={[{
              border: '2px solid #1A4263',
              borderRadius: '100vh',
              backgroundColor: '#1A4263',
              color: '#FFFFFF',
              width: '240px',
              padding: '12px 40px',
              zIndex: '100',
              '&:hover': {
                backgroundColor: '#1A4263',
                borderWidth: '2px',
              },
              // '&:hover +.imgBox': {
              //   opacity: '1',
              // }
            }, style]}
            disabled={disabled}
          >
            <Text text={text} align="center" />
          </Button>
          <Box className='imgBox'
            sx={{opacity: '0', zIndex:'-100',}}
          >
          <Image className='image1' src={img} alt='飾り' style={{
              width: '107%',
              height: '107%',
              left:'-12px',
              zIndex:'-1',
              marginTop:'-70px',
            }}/>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FlatButton
