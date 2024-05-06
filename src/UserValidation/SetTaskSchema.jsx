import * as yup from 'yup'
import moment from 'moment'

export const settaskschema = yup.object().shape({
  text: yup.string().required('Description Required.'),
  end_date: yup
    .date()
    .min(
      moment().format('YYYY-MM-DD hh:mm'),
      'Date and Time must be present or futuree',
    )
    .required('Date and Time is required.'),
})
