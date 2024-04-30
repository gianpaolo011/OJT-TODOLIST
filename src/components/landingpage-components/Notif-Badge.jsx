import { Badge, Divider, Menu, MenuItem, Typography } from '@mui/material'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import dayjs from 'dayjs'
import React, { useState } from 'react'

function NotifBadge({ result }) {
  const filteredTask = (result?.result || []).filter((item) => {
    const currentDate = dayjs().format('YYYY-MM-DD')
    const taskEndDate = dayjs(item?.end_date).format('YYYY-MM-DD')
    return (
      taskEndDate >= currentDate &&
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
            backgroundColor: '#0f171f',
            color: 'white',
            gap: '10px',
          },
        }}
      >
        {/* Display the count of ongoing tasks */}
        <MenuItem>
          <Typography>Task scheduled today:  {filteredTask.length}</Typography>
        </MenuItem>
        <Divider />

        {filteredTask.map((task) => (
          <MenuItem key={task.id} onClick={() => {}}>
            {task.text}
          </MenuItem>
        ))}

        <Divider />
        <MenuItem>
          <Typography color="error">
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
