import React from 'react'
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const TaskModal = ({
  open,
  handleClose,
  NewTodo,
  setNewTodo,
  startdate,
  setStartdate,
  enddate,
  setEnddate,
  checked,
  handleChange,
  datetime,
  handleSubmit,
}) => {
  return (
    <Modal className="set-todolist_modal" open={open}>
      <form className="todolist-form" onSubmit={handleSubmit}>
        <Close
          fontSize="large"
          className="todolist-form__closebtn"
          color="error"
          onClick={handleClose}
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
              <DateTimePicker
                disablePast
                minutesStep={1}
                timeSteps={{ minutes: 1 }}
                label="Set Date and Time"
                value={enddate}
                onChange={(newValue) => setEnddate(newValue)}
              />
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

export default TaskModal
