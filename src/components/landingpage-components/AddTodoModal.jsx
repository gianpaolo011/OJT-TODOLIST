import { Close } from '@mui/icons-material'
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Button, Modal } from 'bootstrap'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useAddTodoMutation } from '../../app/features/api/apiSlice'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'sonner'

function AddTodoModal({isOpen, onClose}) {
  const [openaddtodolist, setOpentodolist] = useState(false)
  const handleOpenmodal = () => setOpentodolist(true)
  const [showmodal,setShowmodal] = useState(false)
  const [NewTodo, setNewTodo] = useState('')

  const [checked, setChecked] = useState(false)
    const handleChange = (event) => {
    const { checked } = event.target

    setChecked(checked)

    if (checked) {
      setdatetime(true)
    } else {
      setdatetime(false)
    }
  }
  
  const [datetime, setdatetime] = useState(false)
   const [startdate, setStartdate] = useState('')
   const [enddate, setEnddate] = useState('')
  const [addTodo] = useAddTodoMutation()
  const handlesubmit2 = (e) => {
    e.preventDefault()
    const startingdate = new Date(startdate.$d)
    const endingdate = new Date(enddate.$d)

    const body = {
      text: NewTodo,
      start_date: dayjs(startingdate).format('YYYY-MM-DD hh:mm'),
      end_date: dayjs(endingdate).format('YYYY-MM-DD HH:mm'),
    }

    addTodo(body)
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
        })
        handleClosemodal()
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
  const handleClosemodal = () => {
    setOpentodolist(false)
    resetFields()
  }
  const resetFields = () => {
    setNewTodo('')
    setChecked(false)
    setdatetime(false)
    setEnddate(null)
  }

  return (
    <Modal className="set-todolist_modal" open={isOpen}>
      <form className="todolist-form" onSubmit={handlesubmit2}>
        <Close
          fontSize="large"
          className="todolist-form__closebtn"
          color="error"
          onClick={() => {
            onClose()
            resetFields()
          }}
        />

        <Typography className="todolist-form__description">
          Description
        </Typography>

        <TextField
          autoComplete="off"
          value={NewTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todolist-form__label"
          label="What to do?"
        />

        <FormControlLabel
          className="todolist-form__controlabel"
          control={
            <Checkbox
              className="todolist-form__controllabel__checkbox"
              checked={checked}
              onChange={handleChange}
            ></Checkbox>
          }
          label="Set Date and Time"
        />

        {datetime && (
          <Box className="todolist-form__timepickers">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                className="todolist-form__timepickers"
                components={['TimeRangeField', 'DateRangePicker']}
              >
                <Typography>Set Time Range</Typography>

                <DateTimePicker
                  disablePast
                  minutesStep={1}
                  timeSteps={{ minutes: 1 }}
                  label="Set Date and Time"
                  value={enddate}
                  onChange={(newValue) => setEnddate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}

        <Button
          variant="contained"
          type="submit"
          // onClick={handlesubmit2}
          onClick={() => {
            handlesubmit2()
            window.location.reload()
          }}
        >
          SET
        </Button>
      </form>
    </Modal>
  )
}

export default AddTodoModal
