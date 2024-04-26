import { Close } from '@mui/icons-material'
import React, { useEffect } from 'react'

import { Box, Typography, Modal, TextField, Button } from '@mui/material'
import { UpdateSchema } from '../../UserValidation/UpdateSchema'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../assets/styles/Updatetask.scss'
import moment from 'moment'
import { useUpdateTodoMutation } from '../../app/features/api/apiSlice'
import dayjs from 'dayjs'
import { toast } from 'sonner'

function Update({ isOpen, onClose, itemData, updateddata }) {
  const [update] = useUpdateTodoMutation()
  console.log(itemData)
  const {
    handleSubmit,
    control,
    setValue,
    // getValues,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      descriptionvalue: '',
      dateandtime: '',
    },
    resolver: yupResolver(UpdateSchema),
  })
  console.log('form-error', errors)
  useEffect(() => {
    // console.log({ updateddata })
    if (updateddata) {
      console.log(updateddata)
      setValue('descriptionvalue', updateddata.text)
      setValue('dateandtime', updateddata.end_date)
    }
  }, [updateddata])
  console.log(watch('dateandtime'))

  const handleUpdatetodo = (data) => {
    console.log('dataaaa', data)
    const formData = {
      id: updateddata.id,
      end_date: moment(data.dateandtime).format('YYYY-MM-DD HH:mm'),
      // end_date: data.dateandtime,
      text: data.descriptionvalue,
    }
    update(formData)
      .unwrap()
      .then((res) => {
        console.log(res.message, 'ressss')
        toast.success(res.message, {
          style: {
            background: 'green',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
          // onAutoClose: (t) => onClose(t),
          // duration: '1000',
        })
        onClose()
      })
      .catch((error) => {
        toast.error(error, {
          style: {
            background: 'red',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
        })
        console.log(error, 'error')
      })
  }

  return (
    <Modal open={isOpen}>
      <form
        className="todolist-form"
        autoComplete="off"
        onSubmit={handleSubmit(handleUpdatetodo)}
      >
        <Close
          fontSize="large"
          className="todolist-form__closebtn"
          color="error"
          onClick={() => {
            onClose()
          }}
        />
        <Typography className="setdescription">Set New Description</Typography>
        <Controller
          control={control}
          name="descriptionvalue"
          render={({ field }) => (
            <TextField
              id="descriptionvalue"
              {...field}
              focused
              error={!!errors?.descriptionvalue}
              helperText={errors?.descriptionvalue?.message}
              required
              className="todolist-form__label"
              label="What to do?"
            />
          )}
        />

        <Box className="todolist-form__timepickers">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              className="todolist-form__timepickers"
              components={['DateTimePicker']}
            >
              <Typography className="settimeanddate">
                Set New Time and Date
              </Typography>

              <Controller
                control={control}
                name="dateandtime"
                render={({ field: { value, onChange } }) => (
                  <DateTimePicker
                    id="dateandtime"
                    onChange={(e) =>
                      onChange(dayjs(e).format('YYYY-MM-DD HH:mm'))
                    }
                    value={value ? dayjs(value) : ''}
                    // value={value ? moment(value) : null}
                    focused
                    // error={!!errors?.dateandtime}
                    // helperText={errors?.dateandtime?.message}
                    slotProps={{
                      textField: {
                        error: !!errors?.dateandtime,
                        helperText: errors?.dateandtime?.message,
                      },
                    }}
                    onError={() => {
                      errors.dateandtime, errors?.dateandtime?.message
                    }}
                    required
                    className="dateandtimeinput"
                    label="Set new Date and Time."
                    // format="YYYY-MM-DD"
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Button variant="contained" type="submit">
          Update
        </Button>
      </form>
    </Modal>
  )
}

export default Update
