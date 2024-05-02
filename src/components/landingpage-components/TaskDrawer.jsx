import React, { useState } from 'react'

import {
  Close,
  DoneOutline,
  KeyboardDoubleArrowLeft,
  LoopOutlined,
} from '@mui/icons-material'
import { Divider, Drawer, List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
import { Button } from 'bootstrap'

import logo from '../../assets/images/GP-logo.png'

function TaskDrawer({isOpen, onCLose}) {
  const [params, setparams] = useState({ status: 'pending' })
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  const DrawerList = (
    <Box className="drawer" sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Box className="drawer__close-btn">
            <KeyboardDoubleArrowLeft
              titleAccess="Close"
              fontSize="large"
              color="error"
              className="close_button"
              onClick={toggleDrawer(false)}
            />
          </Box>
        </ListItem>
        <Divider />
        <Box className="G_logo">
          <img className="G_logo__logo-picture" src={logo}></img>
        </Box>
        <Box className="drawer__event-btn">
          <Button
            onClick={() => {
              setparams((prev) => ({ ...prev, status: 'pending' }))
              window.location.reload()
            }}
            className="drawer__tab1"
            size="small"
            color="primary"
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor:
                params.status === 'pending' ? 'green' : undefined,
              '&:hover': {
                backgroundColor:
                  params.status === 'pending' ? 'green' : undefined,
              },
            }}
            startIcon={
              <LoopOutlined
                className="drawer_tab__icons"
                color="action"
              ></LoopOutlined>
            }
            style={{ justifyContent: 'flex-start' }}
          >
            Ongoing Task
          </Button>

          <Button
            onClick={() => {
              setparams((prev) => ({ ...prev, status: 'done' }))
            }}
            className="drawer__tab2"
            size="small"
            color="primary"
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: params.status === 'done' ? 'green' : undefined,
              '&:hover': {
                backgroundColor: params.status === 'done' ? 'green' : undefined,
              },
            }}
            startIcon={<DoneOutline color="action"></DoneOutline>}
            style={{ justifyContent: 'flex-start' }}
          >
            Finished Task
          </Button>

          <Button
            onClick={() => {
              setparams((prev) => ({ ...prev, status: 'inactive' }))
            }}
            className="drawer__tab3"
            size="small"
            color="primary"
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor:
                params.status === 'inactive' ? 'green' : undefined,
              '&:hover': {
                backgroundColor:
                  params.status === 'inactive' ? 'green' : undefined,
              },
            }}
            startIcon={<Close color="action"></Close>}
            style={{ justifyContent: 'flex-start' }}
          >
            Failed to Do Task
          </Button>
        </Box>
      </List>
      <Divider />
      <Box className="drawer__btn-container"></Box>
    </Box>
  )

  return (
    <>
      <Drawer className="drawer" onClick={toggleDrawer(false)} open={open}>
        {DrawerList}
      </Drawer>
    </>
  )
}

export default TaskDrawer
