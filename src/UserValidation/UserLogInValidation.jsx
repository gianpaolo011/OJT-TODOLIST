import * as yup from 'yup'
import { apiSlice } from '../app/features/api/apiSlice'

export const userSchemaLogin = yup.object().shape({
  username: yup.string().required('Username Required'),
  password: yup.string().min(4).required('Password Required'),
})
