import React from 'react'

import { Alert, Box, Button, Snackbar } from '@mui/material'
import { GroupAdd, Login } from '@mui/icons-material'

import calendar from '../../assets/images/calendar_front.png'
import footer from '../../assets/images/footer.png'
import logo from '../../assets/images/GP-logo.png'

import '../../assets/styles/dashboard.scss'
import { useState } from 'react'

// import { Snackbar, Alert } from '@mui/material'
import SignUp from '../../components/dashboard-components/SignUp'
import LogIn from '../../components/dashboard-components/LogIn'

function Dashboard() {
  const [open, setOpen] = useState(false)
  const [opensignup, setOpensignup] = useState(false)

  const [opensnackbar, setOpensnackbar] = useState(false)

  const handleClosesnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensnackbar(false)
  }

  return (
    <Box className="dashboard">
      {/* Upper_ Buttons */}
      <Box className="dashboard__G_logo">
        <img className="dashboard__G_logo__logo-picture" src={logo}></img>
      </Box>

      <Box className="dashboard__upper-container_btns">
        <Button
          onClick={() => setOpen(true)}
          size="small"
          color="primary"
          variant="contained"
          startIcon={<Login color="action" />}
        >
          Log In
        </Button>

        <Button
          onClick={() => setOpensignup(true)}
          size="small"
          color="primary"
          variant="text"
          startIcon={<GroupAdd color="action" />}
        >
          Sign Up
        </Button>
      </Box>

      <Box className="calendar-box">
        <img className="calendar-box__calendar" src={calendar} />
      </Box>
      <Box className="title_box" style={{ fontWeight: 'bold' }}>
        {' '}
        ToDo List Practice
      </Box>
      <Box className="label_box">
        Empower Your Productivity, Unleash Your Potential – Your To-Do List,
        Your Success Story!
      </Box>
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
