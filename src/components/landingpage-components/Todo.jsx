import React, { useState } from 'react'
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

import '../../components/dashboard-components/SignUp'
import '../../assets/styles/landingpagesass.scss'
import { Close } from '@mui/icons-material'

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { DatePicker, MultiInputTimeRangeField } from '@mui/x-date-pickers-pro'

import dayjs from 'dayjs'
import moment from 'moment'

function Todo({ isOpen, onClose }) {
  const [list, setList] = useState([])
  const [openaddtodolist, setOpentodolist] = useState(false)

  const handleClosemodal = () => setOpentodolist(false)

  const [descriptionvalue, setdescriptionvalue] = useState('')
  const [starttime, setstarttime] = useState('')
  const [endtime, setendtime] = useState('')

  const [datevalue, setdatevalue] = useState()
  moment(datevalue).format('MM/DD/YYYY')

  const handleSubmit = (e) => {
    e.preventDefault()
    const sample = {
      descriptionvalue: descriptionvalue,
      datevalue: datevalue,
      starttime: starttime,
      endtime: endtime,
    }

    if (sample) {
      setList([...list, sample])
    }
  }
  console.log('😚 ~ handleSubmit ~ list:', list)
  const handlesettime = (e) => {
    const time = dayjs(e).format('hh')
    console.log(time)
  }

  console.log('starttime', starttime)
  console.log('endtime', endtime)

  const [datetime, setdatetime] = useState(false)

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

  return (
    <Modal open={isOpen}>
      <form className="todolist-form" onSubmit={handleSubmit}>
        <Close
          fontSize="large"
          className="todolist-form__closebtn"
          color="error"
          onClick={onClose}
        />

        <Typography className="todolist-form__description">
          Description
        </Typography>
        <TextField
          autoComplete="off"
          value={descriptionvalue}
          onChange={(e) => setdescriptionvalue(e.target.value)}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DateTimePicker', 'MultiInputTimeRangeField']}
          ></DemoContainer>
        </LocalizationProvider>

        {datetime && (
          <Box className="todolist-form__timepickers">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                className="todolist-form__timepickers"
                components={['TimeRangeField', 'DateRangePicker']}
              >
                <Typography>Set Date</Typography>
                <DemoItem component="DatePicker">
                  <DatePicker
                    label="Choose Date"
                    value={datevalue}
                    onChange={(datevalue) => setdatevalue(datevalue)}
                  />
                </DemoItem>
                <Typography>Set Time Range</Typography>

                <MultiInputTimeRangeField
                  ampm={handlesettime}
                  className="todolist-form__timepickers__timerange"
                  component="TimeRangeField"
                  label="Set Time"
                  disablePast
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === 'start' ? 'From' : 'To',
                      onSelect: (event) => {
                        if (position === 'start') {
                          setstarttime(event.target.value)
                        } else {
                          setendtime(event.target.value)
                        }
                      },
                    }),
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}

        <Button variant="contained" type="submit">
          SET
        </Button>
      </form>
    </Modal>
  )
}
export default Todo
