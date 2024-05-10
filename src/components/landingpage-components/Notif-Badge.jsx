import { Badge, Divider, Menu, MenuItem, Typography } from '@mui/material'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import dayjs from 'dayjs'
import React, { useState } from 'react'

function NotifBadge({ result }) {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
      <Badge
        badgeContent={filteredTask.length + expiredTask.length}
        color="error"
        onClick={toggleMenu}
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CircleNotificationsIcon
          className="landingpage__notif-icon"
          color="info"
          sx={{ width: 30, height: 30 }}
        />
      </Badge>

      <Menu
        className="landingpage__notif-menu"
        id="ongoing-tasks-menu"
        anchorEl={null}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: {
            backgroundColor: 'white',
            color: 'black',
            gap: '20px',
            position: 'sticky',
            width: '100%',
          },
        }}
      >
        {/* Display the count of ongoing tasks */}
        <MenuItem style={{ pointerEvents: 'none' }}>
          <Typography variant="h6">
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
      </Menu>
    </>
  )
}

export default NotifBadge
