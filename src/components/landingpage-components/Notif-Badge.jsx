import {
  Badge,
  Divider,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import dayjs from 'dayjs'
import React from 'react'

function NotifBadge({ result, backgroundColor, textColor }) {
  const filteredTask = (result?.result || []).filter((item) => {
    const currentDate = dayjs().startOf('day') // Start of today
    const taskEndDate = dayjs(item?.end_date) // End date of task
    return (
      taskEndDate.isSame(currentDate, 'day') && // Check if task end date is same as today
      item.status !== 'done' &&
      item.status !== 'inactive'
    )
  })

  // Filter tasks that have exceeded their end date
  const expiredTask = (result?.result || []).filter((item) => {
    const currentDate = dayjs().format('YYYY-MM-DD')
    const taskEndDate = dayjs(item?.end_date).format('YYYY-MM-DD')
    return (
      taskEndDate < currentDate &&
      item.status !== 'done' &&
      item.status !== 'inactive'
    )
  })

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Badge
        badgeContent={filteredTask.length + expiredTask.length}
        color="error"
        onClick={handleClick}
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircleNotificationsIcon
          className="landingpage__notif-icon"
          color="info"
          sx={{ width: 30, height: 30 }}
        />
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            border: `1px solid  `,
            borderRadius: '20px',
            backgroundColor: backgroundColor,
            color: textColor,
            padding: '10px',
          },
        }}
      >
        {/* Display the count of ongoing tasks */}
        <MenuItem style={{ pointerEvents: 'none' }}>
          <Typography variant="h6" style={{ pointerEvents: 'none' }}>
            Task scheduled today: {filteredTask.length}
          </Typography>
        </MenuItem>
        <Divider />

        {filteredTask.map((task) => (
          <MenuItem key={task.id} onClick={() => {}}>
            {task.text}
          </MenuItem>
        ))}

        <Divider style={{ backgroundColor: 'black', height: '2px' }} />

        {/* Display the count of expired tasks */}
        <MenuItem style={{ pointerEvents: 'none' }}>
          <Typography variant="h6" color="error">
            Expired Tasks : {expiredTask.length}
          </Typography>
        </MenuItem>
        <Divider />

        {expiredTask.map((task) => (
          <MenuItem key={task.id} onClick={() => {}}>
            {task.text}
          </MenuItem>
        ))}
      </Popover>
    </>
  )
}

export default NotifBadge
