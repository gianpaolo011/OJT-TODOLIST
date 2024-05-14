import { MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DarkMode, LightMode } from '@mui/icons-material'
import { toast } from 'sonner'
function Darkmode({ darkMode, toggleDarkMode, handleClosemenu }) {
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

    if (darkMode) {
      toast.success('Dark Mode Activated.', {
        duration: 1000,
        style: {
          background: 'black',
          textAlign: 'center',
          fontSize: 'large',
          color: 'white',
        },
      })
    } else {
      toast.success('Light Mode Activated', {
         duration: 1000,
        style: {
          background: 'white',
          textAlign: 'center',
          fontSize: 'large',
          color: 'black',
        },
      })
    }
  }, [darkMode])

  return (
    <>
      {/* <MenuItem onClick={toggleDarkMode}> */}
         <MenuItem  onClick={() => {
            handleClosemenu()
            toggleDarkMode()
          }}>
        {' '}
        {modeIcon}
        {modeText}
      </MenuItem>
    </>
  )
}

export default Darkmode
