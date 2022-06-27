import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

const ProgressTimer = (props) => {
  const [progress, setProgress] = useState(0)

  const { finishTimer, pictureId } = props

  const resetProgress = () => {
    finishTimer()
  }

  useEffect(() => {
    setProgress(0)
  }, [pictureId])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? resetProgress() : Math.min(prevProgress + 3.34, 100)))
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box sx={{ textAlign: 'center', margin: '2em 0' }}>
      <CircularProgress variant="determinate" value={progress} />
    </Box>
  )
}

export default ProgressTimer
