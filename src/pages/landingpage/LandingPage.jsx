import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
  Avatar,
  Fade,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../../assets/images/GP-logo.png'
import nodatafound from '../../assets/images/nodata.png'
import '../../components/dashboard-components/SignUp'
import '../../assets/styles/landingpagesass.scss'
import SearchIcon from '@mui/icons-material/Search' // Import the search icon
import debounce from 'lodash.debounce'
import {
  AddCircleOutlineRounded,
  Close,
  CloudSync,
  Delete,
  DoneAll,
  DoneOutline,
  ExitToApp,
  KeyboardDoubleArrowLeft,
  LoopOutlined,
  Update,
} from '@mui/icons-material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

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
import { lightBlue } from '@mui/material/colors'
import ConfirmationDialog from '../../components/confirmation/confirmation-dialog'
import { Toaster } from 'sonner'
import { settaskschema } from '../../UserValidation/SetTaskSchema'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

function LandingPage() {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      text: '',
      end_date: '',
    },
    resolver: yupResolver(settaskschema),
  })
  console.log('try error', errors)
  const [update] = useUpdateTodostatusMutation()
  const [openupdate, setOpenupdate] = useState(false)
  const [openaddtodolist, setOpentodolist] = useState(false)
  const handleOpenmodal = () => setOpentodolist(true)
  // const handleClosemodal = () => setOpentodolist(false)

  const handleClosemodal = () => {
    setOpentodolist(false)
    resetFields()
  }

  const resetFields = () => {
    setNewTodo('')
    setChecked(false)
    setdatetime(false)
    setEnddate(null)
  }

  const navigate = useNavigate()

  const [openconfirmdialog, setOpenconfirmdialog] = useState(false)
  const [opendoneconfirmdialog, setOpendoneconfirmdialog] = useState(false)
  const [openretrieveconfirmdialog, setOpenretrieveconfirmdialog] = useState(
    false,
  )

  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [NewTodo, setNewTodo] = useState('')
  const [params, setparams] = useState({ status: 'pending' })

  const { data: result, isLoading, isSuccess, isError } = useGetTodosQuery(
    params,
  )

  const [errorToastAppeared, setErrorToastAppeared] = useState(false)

  useEffect(() => {
    if (isSuccess && result?.result) {
      result.result.forEach((item) => {
        const endDate = new Date(item.end_date)
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        const endDateWithoutTime = new Date(endDate)
        endDateWithoutTime.setHours(0, 0, 0, 0)

        if (
          endDate < currentDate &&
          params.status === 'pending' &&
          item.status !== 'done' &&
          item.status !== 'inactive'
        ) {
          const message = `The task "${item.text}" has exceeded its date.`
          toast.error(message, {
            duration: 5000,
            style: {
              background: 'red',
              textAlign: 'center',
              fontSize: 'large',
              color: 'white',
            },
          })

          setErrorToastAppeared(true)
        }
      })
    }
  }, [isSuccess, result, params.status])

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
      .then((res) => {
        console.log(res.message, 'ressss')
        toast.success(res.message, {
          style: {
            background: 'green',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
        })
        handleClosemodal()
      })
      .catch((error) => {
        toast.error(error, {
          style: {
            background: 'red',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
        })
        console.log(error, 'error')
      })
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

  const [anchorMenu, setAnchorMenu] = useState(null)
  const isopen = Boolean(anchorMenu)

  const handleClickmenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleClosemenu = () => {
    setAnchorMenu(null)
  }

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

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTasks, setFilteredTasks] = useState([])

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase()
    if (trimmedQuery === '') {
      setFilteredTasks(result?.result || [])
    } else {
      const filtered = result?.result?.filter((item) =>
        item.text.toLowerCase().includes(trimmedQuery),
      )
      setFilteredTasks(filtered)
    }
  }

  const debouncedSearch = debounce(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase()
    if (trimmedQuery === '') {
      setFilteredTasks(result?.result || [])
    } else {
      const filtered = result?.result?.filter((item) =>
        item.text.toLowerCase().includes(trimmedQuery),
      )
      setFilteredTasks(filtered)
    }
  }, 300)


  

  useEffect(() => {
    debouncedSearch()
  }, [searchQuery])

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
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
            sx={{
              width: '100%',
              backgroundColor:
                params.status === 'pending' ? 'green' : undefined, // Change color to green when status is 'pending'
              '&:hover': {
                backgroundColor:
                  params.status === 'pending' ? 'green' : undefined, // Change color to green on hover when status is 'pending'
              },
            }}
            startIcon={
              <LoopOutlined
                className="drawer_tab__icons"
                color="primary"
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
            variant="contrained"
            sx={{
              width: '100%',
              backgroundColor: params.status === 'done' ? 'green' : undefined,
              '&:hover': {
                backgroundColor: params.status === 'done' ? 'green' : undefined,
              },
            }}
            startIcon={<DoneOutline color="primary"></DoneOutline>}
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
            sx={{
              width: '100%',
              backgroundColor:
                params.status === 'inactive' ? 'green' : undefined,
              '&:hover': {
                backgroundColor:
                  params.status === 'inactive' ? 'green' : undefined,
              },
            }}
            startIcon={<Close color="primary"></Close>}
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

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = (filteredTasks.length > 0 ? filteredTasks : result?.result)?.map(
      (item) => (
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
            {(params.status === 'pending' || params.status === 'inactive') && (
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
      ),
    )
  } else if (isError) {
    // content = <p>{error.data.message}</p>
    content = <img className="nodatafound-picture" src={nodatafound}></img>
  }

  return (
    <>
      <Box className="landingpage">
        <Box className="landingpage__appbar">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar component="div" color="inherit" position="fixed">
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

               {params.status === 'pending' &&  <Box className="landingpage__searchbar">
                  <TextField
                    label="Search Tasks"
                    onChange={handleSearchInputChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>}

                {params.status === 'pending' && (
                  <AddCircleOutlineRounded
                    titleAccess="Add Task"
                    onClick={handleOpenmodal}
                    className="landingpage-body__addbtn"
                    fontSize="large"
                    color="primary"
                  />
                )}
                <Avatar
                  sx={{ bgcolor: lightBlue[500], cursor: 'pointer' }}
                  onClick={handleClickmenu}
                />

                <Menu
                  className="user-menu"
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorMenu}
                  open={isopen}
                  onClose={handleClosemenu}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    onClick={() => {
                      navigate('/')
                    }}
                  >
                    {' '}
                    <ExitToApp color="info" />
                    Log Out
                  </MenuItem>
                </Menu>

                <Modal className="set-todolist_modal" open={openaddtodolist}>
                  <form className="todolist-form" onSubmit={handlesubmit2}>
                    <Close
                      fontSize="large"
                      className="todolist-form__closebtn"
                      color="error"
                      onClick={() => {
                        handleClosemodal()
                      }}
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
                              disablePast
                              minutesStep={1}
                              timeSteps={{ minutes: 1 }}
                              label="Set Date and Time"
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

          <Drawer className="drawer" onClick={toggleDrawer(false)} open={open}>
            {DrawerList}
          </Drawer>
        </Box>

        {/* ADD TASK BUTTON */}

        <Box className="landingpage-body">
          {/* <Outlet /> */}

          {/* Event Containers */}
          <Box className="events-container" position="inherit">
            {params.status === 'pending' && (
              // <Box className="events-container__print-container">
              <Box className="events-container__print-container">
                {'Ongoing Task'}
                <Box className="events-container__print-container__ongoing">
                  <i className="pin"></i>
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
        className="confirm-menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={opens}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: { backgroundColor: '#494c7d', color: 'white', gap: '10px' },
        }}
        TransitionComponent={Fade}
      >
        {params.status === 'pending' && (
          <MenuItem
            className="menu-item"
            onClick={() => {
              setOpendoneconfirmdialog(true)
              errorToastAppeared()
            }}
          >
            <DoneAll />
            Done
          </MenuItem>
        )}

        {params.status === 'pending' && (
          <MenuItem
            className="menu-item"
            onClick={() => {
              setOpenconfirmdialog(true)
              errorToastAppeared()
            }}
          >
            {' '}
            <Delete />
            Delete
          </MenuItem>
        )}

        {params.status === 'pending' && (
          <MenuItem
            className="menu-item"
            onClick={() => {
              setOpenupdate(true)
              updateTodo()
              // updateTodo(item)
              handleClose()
            }}
          >
            {' '}
            <Update />
            Update
          </MenuItem>
        )}

        {params.status === 'inactive' && (
          <MenuItem
            className="menu-item"
            onClick={() => {
              setOpenretrieveconfirmdialog(true)
            }}
          >
            {' '}
            <CloudSync />
            Retrieve
          </MenuItem>
        )}
      </Menu>
      <Updatetask
        updateddata={updatedata}
        isOpen={openupdate}
        onClose={() => {
          setOpenupdate(false)
          handleClose()
        }}
      />

      {/* DONE CONFIRMATION */}
      <ConfirmationDialog
        message="Are you sure this task is done?"
        handleYes={() => {
          update({
            id: updatedata.id,
          })
            .unwrap()
            .then((res) => {
              console.log(res.message, 'ressss')
              toast.success(res.message, {
                style: {
                  background: 'green',
                  textAlign: 'center',
                  fontSize: 'large',
                  color: 'white',
                },
              })
            })
            .catch((error) => {
              toast.error(error, {
                style: {
                  background: 'red',
                  textAlign: 'center',
                  fontSize: 'large',
                  color: 'white',
                },
              })
              console.log(error, 'error')
            })
          handleClose()
          setOpendoneconfirmdialog(false)
        }}
        isOpen={opendoneconfirmdialog}
        onClose={() => {
          setOpendoneconfirmdialog(false)
          handleClose()
        }}
      />
      {/* DELETE CONFIRMATION */}
      <ConfirmationDialog
        message="Are you sure you want to delete this task?"
        handleYes={() => {
          deleteTodo(getdata)
            .unwrap()
            .then((res) => {
              console.log(res.message, 'ressss')
              toast.success(res.message, {
                style: {
                  background: 'green',
                  textAlign: 'center',
                  fontSize: 'large',
                  color: 'white',
                },
              })
            })
            .catch((error) => {
              toast.error(error, {
                style: {
                  background: 'red',
                  textAlign: 'center',
                  fontSize: 'large',
                  color: 'white',
                },
              })
              console.log(error, 'error')
            })
          handleClose()
          setOpenconfirmdialog(false)
        }}
        isOpen={openconfirmdialog}
        onClose={() => {
          setOpenconfirmdialog(false)
          handleClose()
        }}
      />

      {/* RETRIEVE CONFIRMATION */}

      <ConfirmationDialog
        message="Are you sure you want to retrieve this task?"
        handleYes={() => {
          deleteTodo(getdata)
            .unwrap()
            .then((res) => {
              console.log(res.message, 'ressss')
              toast.success(res.message, {
                style: {
                  background: 'green',
                  textAlign: 'center',
                  fontSize: 'large',
                  color: 'white',
                },
              })
            })
            .catch((error) => {
              toast.error(error, {
                style: {
                  background: 'red',
                  textAlign: 'center',
                  fontSize: 'large',
                  color: 'white',
                },
              })
              console.log(error, 'error')
            })
          handleClose()
          setOpenretrieveconfirmdialog(false)
        }}
        isOpen={openretrieveconfirmdialog}
        onClose={() => {
          setOpenretrieveconfirmdialog(false)
          handleClose()
        }}
      />

      {/* <Button onClick={showtoast}>toast</Button> */}
      <Toaster richColors />
    </>
  )
}
export default LandingPage
