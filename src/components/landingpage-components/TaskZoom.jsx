import React from 'react'
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'

const TaskZoom = ({ onClose, itemStartDate, itemText, itemEndDate }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  )
}

export default TaskZoom
