import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material'

function Darkmode() {
 const [darkMode, setDarkMode] = useState(false) // Step 1

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') // Step 3
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode)) // Step 5
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode) // Step 2
  }

  const backgroundColor = darkMode ? '#333' : '#fff'
  const textColor = darkMode ? 'white' : 'black'

  return (
    <>
      <IconButton
        onClick={toggleDarkMode}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 999,
        }}
      >
        {darkMode ? (
          <Brightness7Icon sx={{ color: 'inherit' }} />
        ) : (
          <Brightness4Icon sx={{ color: 'inherit' }} />
        )}
      </IconButton>
    </>
  )
}

export default Darkmode
