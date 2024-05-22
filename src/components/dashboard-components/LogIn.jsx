import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import '../../assets/styles/loginpage.scss'
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { userSchemaLogin } from '../../UserValidation/UserLogInValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLoginMutation } from '../../app/features/api/login'
import CryptoJS from 'crypto-js'
import calendar from '../../assets/images/calendar_front.png'
import { toast } from 'sonner'

function LogIn({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Prevent back and forward navigation
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }

    const disableNavigation = () => {
      history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', handleBeforeUnload)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    disableNavigation()

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handleBeforeUnload)
    }
  }, [])

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'success',
  })

  const handleClosesnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlert((prev) => ({ ...prev, show: false }))
  }

  const [login] = useLoginMutation()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(userSchemaLogin),
  })

  const logindata = (data) => {
    console.log('data', data)
    login(data)
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: 'bottom-left',
          style: {
            background: 'green',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
        })

        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response.result.token), 
          import.meta.env.VITE_CRYPTO_SALT_KEY,
        ).toString()

        localStorage.setItem('token', encryptedData)

        console.log({ response })
        navigate('/landingpage')
      })
      .catch((error) => {
        setAlert({ show: true, message: error.message, severity: 'error' })
        console.log(error)
      })
  }

  return (
    <Modal open={isOpen}>
      <Box className="login-page__form-container">
        <Box className=" signup-page__form-container__logo">
          <img className="logo-picture" src={calendar} alt="Calendar Logo" />
        </Box>
        <Box className="login-page__form-container__form" id="myform">
          <form
            className="login-page__form-container__login-form"
            id="login_form"
            onSubmit={handleSubmit(logindata)}
          >
            <IconButton color="error" sx={{ position: 'absolute', top: 20 }}>
              <CloseIcon
                onClick={() => {
                  onClose()
                  reset()
                }}
                className="x"
                color="primary"
              />
            </IconButton>
            <Typography className="login_label" variant="h3">
              LOG IN
            </Typography>
            <Box className="textfields">
              <TextField
                {...register('username')}
                error={!!errors?.username}
                helperText={errors?.username?.message}
                required
                autoComplete="off"
                className="username__text-field"
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
              <TextField
                {...register('password')}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                required
                autoComplete="off"
                className="password__text-field"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className="showpassword_icon"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                type={showPassword ? 'text' : 'password'}
                label="Password"
              />
            </Box>

            <Box className="input-box"></Box>
            <Box className="remember-forgot">
              <FormControlLabel
                className="checkbox"
                control={<Checkbox />}
                label="Remember Me"
              />
              <br></br>
              <a className="forgot-pass" href="#">
                Forgot Password
              </a>
            </Box>
            <div>
              <Button
                className="submit_button"
                variant="contained"
                type="submit"
              >
                Log In
              </Button>
            </div>
          </form>
          <Snackbar
            open={alert.show}
            autoHideDuration={1500}
            onClose={handleClosesnackbar}
          >
            <Alert
              elevation={6}
              onClose={handleClosesnackbar}
              severity={alert.severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Modal>
  )
}

export default LogIn