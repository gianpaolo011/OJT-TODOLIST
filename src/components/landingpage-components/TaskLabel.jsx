import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

function TaskLabel({ result }) {
  const filteredTask = (result?.result || []).filter((item) => {
    const currentDate = dayjs().format('YYYY-MM-DD')
    const taskEndDate = dayjs(item?.end_date).format('YYYY-MM-DD')
    return (
      taskEndDate >= currentDate &&
      item.status !== 'done' &&
      item.status !== 'inactive'
    )
  })
  return (
    <Typography
      className="landingpage__notif-label"
      variant="h6"
      component="div"
      sx={{ flexGrow: 1 }}
    >
      {`You have ${filteredTask.length} ongoing task(s) today`}
    </Typography>
  )
}

export default TaskLabel
