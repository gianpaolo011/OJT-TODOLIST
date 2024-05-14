import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

function TaskLabel({ result, textColor }) {
  const filteredTask = (result?.result || []).filter((item) => {
    const currentDate = dayjs().startOf('day') // Start of today
    const taskEndDate = dayjs(item?.end_date) // End date of task
    return (
      taskEndDate.isSame(currentDate, 'day') && // Check if task end date is same as today
      item.status !== 'done' &&
      item.status !== 'inactive'
    )
  })

  return (
    <Typography
      className="landingpage__notif-label"
      variant="h6"
      component="div"
      sx={{ flexGrow: 0.7 , color: textColor}}
    >
      {`You have ${filteredTask.length} ongoing task(s) today`}
    </Typography>
  )
}

export default TaskLabel
