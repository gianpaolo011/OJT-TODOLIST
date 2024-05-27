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
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    const handlePopState = () => {
      if (token) {
        history.pushState(null, '', window.location.href)
      }
    }

    const disableNavigation = () => {
      if (token) {
        history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', handlePopState)
      }
    }

    disableNavigation()

    return () => {
      if (token) {
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [])

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername')
    const savedPassword = localStorage.getItem('rememberedPassword')
    if (savedUsername && savedPassword) {
      setValue('username', savedUsername)
      setValue('password', savedPassword)
      setRememberMe(true)
    }
  }, [])

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked)
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(userSchemaLogin),
  })

  const logindata = (data) => {
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
        localStorage.setItem('user_data', JSON.stringify(response.result))

        if (rememberMe) {
          localStorage.setItem('rememberedUsername', data.username)
          localStorage.setItem('rememberedPassword', data.password)
        } else {
          localStorage.removeItem('rememberedUsername')
          localStorage.removeItem('rememberedPassword')
        }

        navigate('/TaskOverview')
        console.log(response)
      })
      .catch((error) => {
        toast.error("The provided credentials are incorrect.", {
          position: 'bottom-left',
          style: {
            background: 'red',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
        })
        console.log('ERROR', error)
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
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
                label="Remember Me"
              />
            
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
          
        </Box>
      </Box>
    </Modal>
  )
}

export default LogIn
