import { MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DarkMode, LightMode } from '@mui/icons-material'

function Darkmode({ darkMode, toggleDarkMode }) {
  const [modeText, setModeText] = useState('Dark Mode')
  const [modeIcon, setModeIcon] = useState(<DarkMode />)
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    setModeText(darkMode ? 'Light Mode' : 'Dark Mode')
    setModeIcon(
      darkMode ? (
        <LightMode sx={{ marginRight: '10px' }} />
      ) : (
        <DarkMode sx={{ marginRight: '10px' }} />
      ),
    )
  }, [darkMode])

  return (
    <>
      <MenuItem onClick={toggleDarkMode}>
        {' '}
        {modeIcon}
        {modeText}
      </MenuItem>
    </>
  )
}

export default Darkmode
