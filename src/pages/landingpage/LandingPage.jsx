import React, { useEffect, useState } from 'react'

//MUI
import {
  Box,
  Divider,
  Drawer,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Card,
  Menu,
  MenuItem,
  Fade,
  CircularProgress,
  Modal,
} from '@mui/material'
import {
  AddCircleOutlineRounded,
  Close,
  CloudSync,
  Delete,
  DoneAll,
  OpenInFull,
  Update,
} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'

//Import COMPONENTS
import ActionMenuCard from '../../components/ActionMenu'
import NotifBadge from '../../components/landingpage-components/Notif-Badge'
import Updatetask from '../../components/landingpage-components/Updatetask'
import ConfirmationDialog from '../../components/confirmation/confirmation-dialog'
import SearchBar from '../../components/landingpage-components/SearchBar'
import TaskLabel from '../../components/landingpage-components/TaskLabel'
import AvatarMenu from '../../components/landingpage-components/AvatarMenu'
import DrawerList from '../../components/landingpage-components/DrawerList'
import TaskModal from '../../components/landingpage-components/TaskModal'
// import TaskZoom from '../../components/landingpage-components/TaskZoom'

//Images and Styles

import nodatafound from '../../assets/images/nodata.png'
import '../../assets/styles/landingpagesass.scss'

//Slices
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodostatusMutation,
} from '../../app/features/api/apiSlice'

//Others
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { Toaster } from 'sonner'

function LandingPage() {
  const [openconfirmdialog, setOpenconfirmdialog] = useState(false)
  const [opendoneconfirmdialog, setOpendoneconfirmdialog] = useState(false)
  const [openretrieveconfirmdialog, setOpenretrieveconfirmdialog] = useState(
    false,
  )

  const [open, setOpen] = useState(false)

  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [NewTodo, setNewTodo] = useState('')
  const [params, setParams] = useState({ status: 'pending' })

  const { data: result, isLoading, isSuccess, isError } = useGetTodosQuery(
    params,
  )

  useEffect(() => {
    // Fetch todos data and handle success or error
  }, [params])

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [update] = useUpdateTodostatusMutation()

  const handlesubmit2 = (e) => {
    e.preventDefault()
    const newId = result?.result.length === 0 ? 1 : result?.result[0]?.id + 1

    const startingdate = new Date(startdate.$d)
    const endingdate = new Date(enddate.$d)

    const body = {
      id: newId,
      text: NewTodo,
      start_date: dayjs(startingdate).format('YYYY-MM-DD hh:mm'),
      end_date: dayjs(endingdate).format('YYYY-MM-DD HH:mm'),
    }

    addTodo(body)
      .unwrap()
      .then((res) => {
        console.log(res.message, 'ressss')

        toast.success(res.message, {
          duration: 5000,
          style: {
            background: 'green',
            textAlign: 'center',
            fontSize: 'large',
            color: 'white',
          },
        })
        setOpenTaskModal(!openTaskModal)
        if (openTaskModal) {
          resetFields()
        }
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

  //Add Task Modal
  const [openupdate, setOpenupdate] = useState(false)

  const [datetime, setdatetime] = useState(false)
  const [checked, setChecked] = useState(false)

  const [openTaskModal, setOpenTaskModal] = useState(false)

  const handleToggleDrawer = () => setOpen(!open)
  const handleToggleTaskModal = () => {
    setOpenTaskModal(!openTaskModal)
    if (openTaskModal) {
      resetFields()
    }
  }

  const handleChange = (event) => {
    const { checked } = event.target

    setChecked(checked)

    if (checked) {
      setdatetime(true)
    } else {
      setdatetime(false)
    }
  }

  const resetFields = () => {
    setNewTodo('')
    setChecked(false)
    setdatetime(false)
    setEnddate(null)
  }
  const [updatedata, setUpdatedata] = useState(null)

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

  const [filteredTasks, setFilteredTasks] = useState([])

  //--------------Darkmode----------------//
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  })

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  const backgroundColor = darkMode ? '#141414' : '#dcf2f1'
  const textColor = darkMode ? 'white' : 'black'
  const drawerColor = darkMode ? '#a1a7e3' : '#dcf2f1'

  const styles = {
    userSelectNone: {
      WebkitUserSelect: 'none' /* Safari */,
      MozUserSelect: 'none' /* Firefox */,
      msUserSelect: 'none' /* IE 10 and IE 11 */,
      userSelect: 'none' /* Standard syntax */,
    },
  }

  const [openTaskzoomModal, setOpenTaskzoomModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleToggleTaskzoomModal = () => {
    setOpenTaskzoomModal(!openTaskzoomModal)
  }

  const [taskModalBackgroundColor, setTaskModalBackgroundColor] = useState(
    'white',
  )

  // Function to handle task click and open modal
  const handleTaskClick = (item) => {
    const bgColor =
      params.status === 'pending' &&
      !dayjs(item?.end_date).isSame(new Date(), 'day') &&
      new Date(item?.end_date) < new Date()
        ? 'grey'
        : 'white'
    setTaskModalBackgroundColor(bgColor)
    setSelectedTask(item)
    setOpenTaskzoomModal(true)
  }

  let content
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: 'flex',
          justifySelf: 'end',
          marginLeft: '48%',
          marginTop: '15%',
        }}
      >
        <CircularProgress color="success" size={50} />
      </Box>
    )
  } else if (isSuccess) {
    content = (filteredTasks.length ? filteredTasks : result?.result)?.map(
      (item) => (
        <Card
          className="map-container"
          key={item?.id}
          style={{
            backgroundColor:
              params.status === 'pending' &&
              !dayjs(item?.end_date).isSame(new Date(), 'day') &&
              new Date(item?.end_date) < new Date()
                ? 'grey'
                : 'white',
            ...styles.userSelectNone,
          }}
        >
          <Box
            sx={{
              alignItems: 'end',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              display: ' flex',
              width: '100%',
            }}
          >
            <Box className="morevert_container">
              {params.status === 'pending' && (
                <OpenInFull
                  onClick={() => handleTaskClick(item)}
                  color="action"
                  sx={{ marginTop: '5px', cursor: 'pointer' }}
                />
              )}

              {(params.status === 'pending' ||
                params.status === 'inactive') && (
                <Box>
                  <ActionMenuCard
                    id={item?.id}
                    item={item}
                    opens={opens}
                    handleClick={handleClick}
                  />
                </Box>
              )}
            </Box>

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
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis !important',
                fontSize: '25px',
              }}
            >
              {`What to do:  ${item?.text}`}
            </Typography>

            <Divider />
            <Divider />
            {`Date: ${dayjs(item?.end_date).format('LLLL')}`}
          </Box>
        </Card>
      ),
    )
  } else if (isError) {
    content = <img className="nodatafound-picture" src={nodatafound}></img>
  }

  //--------------Toast----------------//
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

  return (
    <>
      <Box className="landingpage">
        <Box className="landingpage__appbar">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              component="div"
              position="fixed"
              sx={{
                backgroundColor: darkMode ? '#464646' : '#ffffff',
                color: textColor,
              }}
            >
              <Toolbar>
                <IconButton
                  onClick={handleToggleDrawer}
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
                {params.status === 'pending' && (
                  <TaskLabel result={result} textcolor={textColor} />
                )}

                {params.status === 'pending' && (
                  <SearchBar
                    setFilteredTasks={setFilteredTasks}
                    result={result}
                  />
                )}

                {params.status === 'pending' && (
                  <NotifBadge
                    result={result}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                  />
                )}

                {params.status === 'pending' && (
                  <AddCircleOutlineRounded
                    titleAccess="Add Task"
                    onClick={handleToggleTaskModal}
                    className="landingpage-body__addbtn"
                    fontSize="large"
                    color="primary"
                  />
                )}

                <AvatarMenu
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                  buttonText={darkMode ? 'Light Mode' : 'Dark Mode'}
                />

                {/* ADD TASK MODAL */}
                <TaskModal
                  open={openTaskModal}
                  handleClose={handleToggleTaskModal}
                  NewTodo={NewTodo}
                  setNewTodo={setNewTodo}
                  startdate={startdate}
                  setStartdate={setStartdate}
                  enddate={enddate}
                  setEnddate={setEnddate}
                  checked={checked}
                  handleChange={handleChange}
                  datetime={datetime}
                  handleSubmit={handlesubmit2}
                />
              </Toolbar>
            </AppBar>
          </Box>

          {/* DRAWER/DRAWERLIST */}
          <Drawer anchor={'left'} open={open} onClose={handleToggleDrawer}>
            <DrawerList
              toggleDrawer={handleToggleDrawer}
              setParams={setParams}
              params={params}
              drawerColor={drawerColor}
            />
          </Drawer>
        </Box>

        {/* ADD TASK BUTTON */}

        <Box
          className="landingpage-body"
          sx={{ backgroundColor, color: textColor }}
        >
          {/* <Outlet /> */}

          {/* Event Containers */}
          <Box className="events-container" position="inherit">
            {params.status === 'pending' && (
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

      <Modal
        className="taskzoommodal"
        open={openTaskzoomModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="taskzoommodal__task_modal"
          sx={{ backgroundColor: taskModalBackgroundColor }}
        >
          {selectedTask && (
            <>
              <Close
                fontSize="large"
                className="taskzoommodal__closebtn"
                color="error"
                onClick={handleToggleTaskzoomModal}
                sx={{ fontSize: '40px' }}
              />
              <Box className="taskzoommodal__date-created">
                {`Date Created: ${dayjs(selectedTask.start_date).format(
                  'LLL',
                )}`}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Typography variant="h5">
                  {`What to do: `}
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{ fontStyle: 'italic', textTransform:'uppercase' }}
                  >
                    {selectedTask.text}
                  </Typography>
                </Typography>
                <Divider />
                <Divider />

                <Typography variant="h5">
                  {`Date: `}
                  <Typography variant="h5" component="span">
                    {dayjs(selectedTask.end_date).format('LLLL')}
                  </Typography>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>

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
        {/* Mark as Done Task */}
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
        {/* Delete Task */}
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

        {/* Update Task */}
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

        {/* Retrieve deleted/failed to do task */}
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

      {/* Update Task */}
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
        textColor={textColor}
        backgroundColor={backgroundColor}
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
        textColor={textColor}
        backgroundColor={backgroundColor}
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
        textColor={textColor}
        backgroundColor={backgroundColor}
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
