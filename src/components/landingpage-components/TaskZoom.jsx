import React from 'react'
import { Modal, Typography, Button, Divider } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Close } from '@mui/icons-material'

const TaskZoom = ({ onClose, isOpen, itemStartDate, itemText, itemEndDate }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Close
          fontSize="large"
          className="todolist-form__closebtn"
          color="error"
          onClick={onClose}
        />
        <Box className="date-created">
          {`Date Created: ${dayjs(itemStartDate).format('LLL')}`}
        </Box>
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis !important',
            fontSize: '25px',
          }}
        >
          {`What to do:  ${itemText}`}
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="body1">
          {' '}
          {`Date: ${dayjs(itemEndDate).format('LLLL')}`}
        </Typography>
        {/* Add more task details as needed */}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  )
}

export default TaskZoom