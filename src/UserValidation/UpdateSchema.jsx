import moment from 'moment'
import * as yup from 'yup'
// import { apiSlice } from '../app/features/api/apiSlice'

export const UpdateSchema = yup.object().shape({
  descriptionvalue: yup.string().required('Description Required'),
  dateandtime: yup
    .date()
    .min(
      moment().format('YYYY-MM-DD hh:mm:ss'),
      'Date and Time must be present or future',
    )
    .required('Date and Time is required.'),
})
