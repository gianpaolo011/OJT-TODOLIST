import React from 'react'
import { Modal, Box, Typography, IconButton, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Person } from '@mui/icons-material'
import '../../assets/styles/UserProfile.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: '#dcf2f1',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const darkModeStyle = {
  ...style,
  bgcolor: '#141414',
  color: '#fff',
}

function UserProfile({ isOpen, handleToggleProfileModal, handleClosemenu }) {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  const darkMode = localStorage.getItem('darkMode') === 'true'

  const getFullName = (user) => {
    return `${user.first_name} ${user.middle_name}. ${user.last_name}`.trim()
  }

  return (
    <>
      <MenuItem
        open={isOpen}
        onClick={() => {
          handleToggleProfileModal()
        }}
      >
        <Person sx={{ marginRight: '10px' }} />
        Profile
        <Modal
          open={isOpen}
          onClose={handleToggleProfileModal}
          aria-labelledby="user-details-modal-title"
          aria-describedby="user-details-modal-description"
          aria-hidden="true"
        >
          
          
          <Box
            sx={darkMode ? darkModeStyle : style}
            className="UserProfileModal"
          >
            <Box>
                 <Person sx={{ fontSize: '200px', marginRight: '30px' }} />
            </Box>
            <Box>
            <IconButton
              aria-label="close"
              onClick={() => {
                handleToggleProfileModal()
                handleClosemenu()
              }}
              sx={{ color: darkMode ? 'lightgrey' : 'black',  position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon sx={{fontSize :'30px'}}/>
            </IconButton>
        
            <Typography id="user-details-modal-title" variant="h2">
              User ID: {userData.id}
            </Typography>
            {userData && (
              <Box>
                <Typography variant="h5">
                  Name: {getFullName(userData)}
                </Typography>
                <Typography variant="h5">
                  Username: {userData.username}
                </Typography>
                <Typography variant="h5">
                  Contact No: {userData.contact_no}
                </Typography>
              </Box>
            )}
          </Box>
         </Box>
        </Modal>
      </MenuItem>
    </>
  )
}

export default UserProfile
