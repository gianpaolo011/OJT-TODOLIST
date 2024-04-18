import * as yup from 'yup'

export const userSchema = yup.object().shape({
  Firstname: yup.string().email().required('First Name Required'),
  Lastname: yup.string().email().required('Last Name Required'),
  MiddleInitial: yup.string().max(1, 'Maximum of 1 character only').required('Middle Initial Required'),
  Contactnumber: yup.number().max(11, 'Maximum of 11 numbers only').required('Contact Number Required'),
  username: yup.string().required('Username Required'),
  password: yup.string().min(4).max(20).required('Password Required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})
