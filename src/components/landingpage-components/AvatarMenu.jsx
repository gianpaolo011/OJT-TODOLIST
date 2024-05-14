import { Avatar, Fade, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import Darkmode from '../../components/landingpage-components/Darkmode'
import { useNavigate } from 'react-router-dom'
import { ExitToApp } from '@mui/icons-material'
import { lightBlue } from '@mui/material/colors'
import { toast } from 'sonner'

function AvatarMenu({ toggleDarkMode, darkMode, buttonText }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const isopen = Boolean(anchorMenu)
  const [loading, setLoading] = useState(false)

  const handleClickmenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleClosemenu = () => {
    setAnchorMenu(null)
  }
  const navigate = useNavigate()
  const handleLogout = () => {
    // Show toast message
    toast('Logging out...', {
      duration: 2000,
      style: {
        background: 'green',
        textAlign: 'center',
        fontSize: 'large',
        color: 'white',
      },
    })

    // After 1 second, navigate to '/'
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <>
      <Avatar
        sx={{
          bgcolor: lightBlue[400],
          cursor: 'pointer',
          marginRight: '10px',
          width: 30,
          height: 30,
        }}
        onClick={handleClickmenu}
      />
      <Menu
        className="user-menu"
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: {
            backgroundColor: '#494c7d',
            color: 'white',
            gap: '10px',
          },
        }}
        anchorEl={anchorMenu}
        open={isopen}
        onClose={handleClosemenu}
        TransitionComponent={Fade}
      >
        <Darkmode
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          buttonText={buttonText}
          handleClosemenu={handleClosemenu} 
          
        />

        <MenuItem
          onClick={() => {
            // navigate('/')
            handleLogout()
          }}
        >
          {' '}
          <ExitToApp sx={{ marginRight: '10px' }} />
          Log Out
        </MenuItem>
      </Menu>
    </>
  )
}

export default AvatarMenu
