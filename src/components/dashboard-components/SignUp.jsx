import {
  Alert,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
// import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Visibility, VisibilityOff } from '@mui/icons-material'
// import * as yup from 'yup'
import { userSchema } from '../../UserValidation/UserSignUpValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignupMutation } from '../../app/features/api/signup'
import calendar from '../../assets/images/calendar_front.png'
import '../../assets/styles/signup.scss'

function SignUp({ isOpen, onClose }) {
  const {
    reset,
    register,
    setError,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: '',
      username: '',
      password: '',
      last_name: '',
      confirm: '',
    },
    // resolver: yupResolver(userSchema),
  })

  const [signup] = useSignupMutation()
  //  const [opensignup, setOpensignup] = useState(false)
  // const handleOpensignup = () => setOpensignup(true)
  // const handleClosesignup = () => setOpensignup(false)

  const [showPassword, setShowPassword] = useState(false)

  const createUser = async (data) => {
    console.log(data)
    if (data.password !== data.confirm) {
      return setError('confirm', {
        type: 'custom',
        message: 'Password are not match.',
      })
    }
    const {
      first_name,
      last_name,
      middle_name,
      contact_no,
      username,
      password,
    } = data

    let formData = {
      first_name,
      last_name,
      middle_name,
      contact_no,
      username,
      password,
    }

    signup(formData)
    // const isValid = await userSchema.isValid(formData)
    console.log({ formData })
  }

  const [opensnackbar, setOpensnackbar] = useState(false)

  const handleClosesnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensnackbar(false)
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  console.log({ errors }, Boolean(errors.confirm))
  // console.log(data)
  return (
    <div>
      <Modal open={isOpen}>
        <Box className="signup-page__form-container">
          <Box className=" signup-page__form-container__logo">
            <img className="logo-picture" src={calendar}></img>
          </Box>
          <Box className="signup-page__form-container__form">
            <form
              className="signup-page__form-container__sign-form"
              id="signup_form"
              onSubmit={handleSubmit(createUser)}
            >
              <IconButton sx={{ position: 'fixed' }}>
                <CloseIcon
                  onClick={() => {
                    onClose()
                    reset()
                  }}
                  className="x"
                  color="error"
                />
              </IconButton>
              <Typography className="signup_label" variant="h3">
                SIGN UP
              </Typography>
              <Box className="textfield">
                <Typography variant="h5">Personal Information</Typography>
                <Box className="personal-info">
                  <TextField
                    {...register('first_name')}
                    autoComplete="off"
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    className="personal-info__textfield"
                    id="outlined-basic"
                    label="First Name"
                    variant="standard"
                  />

                  <TextField
                    {...register('last_name')}
                    autoComplete="off"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                    className="personal-info__textfield"
                    id="outlined-basic"
                    label="Last Name"
                    variant="standard"
                  />

                  <TextField
                    {...register('middle_name')}
                    autoComplete="off"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                    className="personal-info__textfield"
                    id="outlined-basic"
                    label="Middle Initial"
                   variant="standard"
                  />

                  <TextField
                    {...register('contact_no')}
                    autoComplete="off"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                    className="personal-info__textfield"
                    id="outlined-basic"
                    label="Contact Number"
                    variant="standard" 
                  />
                </Box>
                <Typography variant="h5">Credentials</Typography>
                <TextField
                  {...register('username')}
                  autoComplete="off"
                  error={!!errors?.username}
                  helperText={errors?.username?.message}
                  className="sign_textfield"
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                />

                <TextField
                  {...register('password')}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                  // value={password}
                  // required
                  className="sign_textfield"
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
                  // onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                />

                <TextField
                  // value={confirmPassword}
                  {...register('confirm')}
                  error={Boolean(errors.confirm)}
                  helperText={errors?.confirm?.message}
                  //required
                  className="sign_textfield"
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
                  label="ConfirmPassword"
                />
              </Box>
              <Box className="input-box"></Box>

              <Box>
                <Button
                  // onClick={handleClick}
                  className="submit_button"
                  variant="contained"
                  type="submit"
                >
                  Register
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>

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
          Resgistration Successfully.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SignUp
