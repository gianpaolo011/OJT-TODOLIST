import React from 'react'

import { Alert, Box, Button, Snackbar } from '@mui/material'
import { GroupAdd, Login } from '@mui/icons-material'


import calendarsvg from "../../assets/images/calendar-svg.svg"
import footer from '../../assets/images/footer.png'
import logo from '../../assets/images/GP-logo.png'

import '../../assets/styles/dashboard.scss'
import { useState } from 'react'

import SignUp from '../../components/dashboard-components/SignUp'
import LogIn from '../../components/dashboard-components/LogIn'

import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [open, setOpen] = useState(false)
  const [opensignup, setOpensignup] = useState(false)

  const [opensnackbar, setOpensnackbar] = useState(false)
 const [fade, setFade] = useState(false);
  const handleClosesnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensnackbar(false)
  }
  const navigate = useNavigate()

  const handleReadMoreClick = () => {
    setFade(true);
    setTimeout(() => {
      navigate('/Description');
    }, 500);
  };

  return (
     <Box className={`dashboard ${fade ? 'fade-out' : ''}`}>
      {/* Upper_ Buttons */}
      <Box className="dashboard__G_logo">
        <img className="dashboard__G_logo__logo-picture" src={logo}></img>
      </Box>

      <Box className="dashboard__upper-container_btns">
        <Button
          onClick={() => setOpen(true)}
          size="large"
          color="primary"
          variant="text"
          startIcon={<Login color="action" />}
          sx={{fontSize: '20px'}}
        >
          Log In
        </Button>

        <Button
          onClick={() => setOpensignup(true)}
          size="large"
          color="primary"
          variant="text"
          startIcon={<GroupAdd color="action" />}
          sx={{fontSize: '20px'}}
        >
          Sign Up
        </Button>
      </Box>

      <Box className="calendar-box">
        <img className="calendar-box__calendar" src={calendarsvg} />
      </Box>
      <Box className="title_box" style={{ fontWeight: 'bold' }}>
        {' '}
        To Do List
      </Box>
      <Box className="label_box">
        Empower Your Productivity, Unleash Your Potential – Your To-Do List,
        Your Success Story!
      </Box>
      <Button
        className="read-more"
        variant="contained"
        color="success"
        sx={{ cursor: 'pointer' }}
        onClick={handleReadMoreClick}
      >
        READ MORE
      </Button>
      <Box>
        <img className="ftr_img" src={footer}></img>
      </Box>

      <LogIn
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
      />
      <SignUp
        isOpen={opensignup}
        onClose={() => {
          setOpensignup(false)
        }}
      />

      <Snackbar
        open={opensnackbar}
        autoHideDuration={1500}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Welcome!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Dashboard
