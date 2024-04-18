import React, { useEffect, useState } from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Modal,
  TextField,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../../assets/images/GP-logo.png'
import '../../components/dashboard-components/SignUp'
import '../../assets/styles/landingpagesass.scss'
import {
  AddCircleOutlineRounded,
  Close,
  DoneOutline,
  KeyboardDoubleArrowLeft,
  Logout,
  LoopOutlined,
} from '@mui/icons-material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { Link } from 'react-router-dom'
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodostatusMutation,
} from '../../app/features/api/apiSlice'

import ActionMenuCard from '../../components/ActionMenu'
import Updatetask from '../../components/landingpage-components/Updatetask'
import dayjs from 'dayjs'

function LandingPage() {
  const [update] = useUpdateTodostatusMutation()
  const [openupdate, setOpenupdate] = useState(false)
  const [openaddtodolist, setOpentodolist] = useState(false)
  const handleOpenmodal = () => setOpentodolist(true)
  const handleClosemodal = () => setOpentodolist(false)

  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [NewTodo, setNewTodo] = useState('')
  const [params, setparams] = useState({ status: 'pending' })

  const {
    data: result,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery(params)
  console.log(result, 'result', isSuccess, 'success')

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const handlesubmit2 = (e) => {
    e.preventDefault()
    const startingdate = new Date(startdate.$d)
    const endingdate = new Date(enddate.$d)

    const body = {
      text: NewTodo,
      start_date: dayjs(startingdate).format('YYYY-MM-DD hh:mm'),
      end_date: dayjs(endingdate).format('YYYY-MM-DD HH:mm'),
    }

    addTodo(body)
      .unwrap()
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
    handleClosemodal()
  }

  const [datetime, setdatetime] = useState(false)

  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    const { checked } = event.target

    setChecked(checked)

    if (checked) {
      setdatetime(true)
    } else {
      setdatetime(false)
    }
  }

  const [updatedata, setUpdatedata] = useState(null)
  console.log(updatedata)
  const [getdata, setGetdata] = useState('')

  const [anchorEl, setAnchorEl] = useState(null)
  const opens = Boolean(anchorEl)
  const handleClick = (event, id, item) => {
    setGetdata(id)
    setUpdatedata(item)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
            }}
            className="drawer__tab1"
            size="small"
            color="primary"
            variant="contrained"
            sx={{ width: '100%' }}
            startIcon={
              <LoopOutlined className="drawer_tab__icons"></LoopOutlined>
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
            variant="contrained"
            sx={{ width: '100%' }}
            startIcon={<DoneOutline></DoneOutline>}
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
            variant="contrained"
            sx={{ width: '100%' }}
            startIcon={<Close></Close>}
            style={{ justifyContent: 'flex-start' }}
          >
            Failed to Do Task
          </Button>
        </Box>
      </List>
      <Divider />
      <Box className="drawer__btn-container">
        <Link to="/">
          <Logout
            titleAccess="Log out"
            className="drawer__logoutbtn"
            color="info"
            fontSize="large"
          ></Logout>
        </Link>
      </Box>
    </Box>
  )

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = result?.result?.map((item) => (
      <Card className="map-container" key={item?.id}>
        <Box
          sx={{
            alignItems: 'end',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            display: ' flex',
            width: '100%',
          }}
        >
          {params.status === 'pending' && (
            <Box className="morevert_container">
              <ActionMenuCard
                id={item?.id}
                item={item}
                opens={opens}
                handleClick={handleClick}
              />
            </Box>
          )}
          <Box className="date-created">
            {`Date Created: ${dayjs(item?.start_date).format('LLL')}`}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {`What to do:  ${item?.text}`}
          <Divider />
          <Divider />
          {`Date: ${dayjs(item?.end_date).format('LLLL')}`}
        </Box>
      </Card>
    ))
  } else if (isError) {
    content = <p>{error.data.message}</p>
  }
  return (
    <>
      <Box className="landingpage">
        <Box className="landingpage__appbar">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar component="div" color="inherit" position="fixed" >
              <Toolbar>
                <IconButton
                  onClick={toggleDrawer(true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  className="landingpage__appbar__label"
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  To Do List Practice
                </Typography>
                {params.status === 'pending' && <AddCircleOutlineRounded
                  titleAccess="Add Task"
                  onClick={handleOpenmodal}
                  className="landingpage-body__addbtn"
                  fontSize="large"
                  color="primary"
                />}
                <Modal open={openaddtodolist}>
                  <form className="todolist-form" onSubmit={handlesubmit2}>
                    <Close
                      fontSize="large"
                      className="todolist-form__closebtn"
                      color="error"
                      onClick={handleClosemodal}
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
                          <DemoContainer
                            className="todolist-form__timepickers"
                            components={['TimeRangeField', 'DateRangePicker']}
                          >
                            <Typography>Set Time Range</Typography>

                            <DateTimePicker
                              label="Basic date time picker"
                              value={enddate}
                              onChange={(newValue) => setEnddate(newValue)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    )}

                    <Button
                      variant="contained"
                      type="submit"
                      // onClick={handlesubmit2}
                      onClick={() => {
                        handlesubmit2()
                      }}
                    >
                      SET
                    </Button>
                  </form>
                </Modal>
              </Toolbar>
            </AppBar>
          </Box>

          <Drawer
            // PaperProps={{ style: { backgroundColor: 'lightgrey' } }}
            className="drawer"
            onClick={toggleDrawer(false)}
            open={open}
          >
            {DrawerList}
          </Drawer>
        </Box>

        {/* ADD TASK BUTTON */}

        <Box className="landingpage-body">
          {/* <Outlet /> */}

          {/* Event Containers */}
          <Box className="events-container" position="inherit">
            {params.status === 'pending' && (
              <Box className="events-container__print-container">
                {'Ongoing Task'}
                <Box className="events-container__print-container__ongoing">
                  {content}
                </Box>
              </Box>
            )}
            {params.status === 'done' && (
              <Box className="finished">
                {'Finished Task '}
                <Box className="events-container__print-container__finished">
                  {content}
                </Box>
              </Box>
            )}
            {params.status === 'inactive' && (
              <Box className="failed">
                {'Failed To Do Task '}
                <Box className="events-container__print-container__failed">
                  {content}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={opens}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            update({
              id: updatedata.id,
            })
            handleClose()
          }}
        >
          Done
        </MenuItem>

        <MenuItem
          onClick={() => {
            deleteTodo(getdata)
            handleClose()
          }}
        >
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpenupdate(true)
            updateTodo(item)
            handleClose()
          }}
        >
          Update
        </MenuItem>
      </Menu>
      <Updatetask
        updateddata={updatedata}
        isOpen={openupdate}
        onClose={() => {
          setOpenupdate(false)
        }}
      />
    </>
  )
}
export default LandingPage
