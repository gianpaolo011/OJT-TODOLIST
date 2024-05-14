import React from 'react'
import { Box, Button, Divider, List, ListItem } from '@mui/material'
import {
  LoopOutlined,
  DoneOutline,
  Close,
  KeyboardDoubleArrowLeft,
} from '@mui/icons-material'
import logo from '../../assets/images/GP-logo.png'

const DrawerList = ({ toggleDrawer, setParams, params, drawerColor }) => {
  return (
    <Box
      className="drawer"
      sx={{ width: 250, height: '100%', backgroundColor: drawerColor }}
      role="presentation"
    >
      <List>
        <ListItem>
          <Box className="drawer__close-btn">
            <KeyboardDoubleArrowLeft
              titleAccess="Close"
              fontSize="large"
              color="error"
              className="close_button"
              onClick={() => toggleDrawer(false)}
            />
          </Box>
        </ListItem>
        <Divider />
        <Box className="G_logo">
          <img className="G_logo__logo-picture" src={logo} alt="Logo" />
        </Box>
        <Box className="drawer__event-btn">
          <Button
            onClick={() => {
              setParams((prev) => ({ ...prev, status: 'pending' }))
              toggleDrawer(false)
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
              <LoopOutlined className="drawer_tab__icons" color="action" />
            }
            style={{ justifyContent: 'flex-start' }}
          >
            Ongoing Task
          </Button>
          <Button
            onClick={() => {
              setParams((prev) => ({ ...prev, status: 'done' }))
              toggleDrawer(false)
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
            startIcon={<DoneOutline color="action" />}
            style={{ justifyContent: 'flex-start' }}
          >
            Finished Task
          </Button>
          <Button
            onClick={() => {
              setParams((prev) => ({ ...prev, status: 'inactive' }))
              toggleDrawer(false)
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
            startIcon={<Close color="action" />}
            style={{ justifyContent: 'flex-start' }}
          >
            Failed to Do Task
          </Button>
        </Box>
      </List>
      <Divider />
    </Box>
  )
}

export default DrawerList
