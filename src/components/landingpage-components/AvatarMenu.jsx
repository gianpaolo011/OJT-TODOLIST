import { Avatar, Fade, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import Darkmode from '../../components/landingpage-components/Darkmode'
import { useNavigate } from 'react-router-dom'
import { ExitToApp } from '@mui/icons-material'
import { lightBlue } from '@mui/material/colors'

function AvatarMenu({ toggleDarkMode, darkMode, buttonText }) {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const isopen = Boolean(anchorMenu)

  const handleClickmenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleClosemenu = () => {
    setAnchorMenu(null)
  }
  const navigate = useNavigate()

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
        />

        <MenuItem
          onClick={() => {
            navigate('/')
          }}
        >
          {' '}
          <ExitToApp sx={{ marginRight: '10px' }} />
          Log Outt
        </MenuItem>
      </Menu>
    </>
  )
}

export default AvatarMenu
