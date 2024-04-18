import * as yup from 'yup'

export const userSchema = yup.object().shape({
  first_name: yup.string().required('First Name Required'),
  last_name: yup.string().required('Last Name Required'),
  middle_name: yup
    .string()
    .max(1, 'Maximum of 1 character only')
    .required('Middle Initial Required'),
  contact_no: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 5 digits')
    .max(11, 'Must be exactly 5 digits')
    .required('Contact Number Required'),
  username: yup.string().required('Username Required'),
  password: yup.string().min(4).max(20).required('Password Required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
