import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import footer from '../../assets/images/footer.png'
import '../../assets/styles/TodoListDescription.scss'
import { useNavigate } from 'react-router-dom'
function TodoListDescription() {
  const navigate = useNavigate()
  return (
    <>
      <Box classname="descriptionpage">
        <Box className="text-container">
          <Typography
            className="textt"
            sx={{
              fontFamily: 'cursive',
              fontSize: 'x-large',
              textAlign: 'center',
              padding: '25px',
              lineHeight: 1.5,
            }}
          >
            Introducing TodoList App, your ultimate productivity companion
            designed to streamline your daily tasks and boost your efficiency
            like never before. With TodoList App, managing your to-do lists has
            never been easier. Effortlessly organize your tasks into
            customizable categories, prioritize them with intuitive
            drag-and-drop functionality, and set due dates and reminders to stay
            on track. Whether its work projects, personal errands, or long-term
            goals, TodoList App empowers you to tackle everything with ease. But
            TodoList App isnt just about managing tasks, its about optimizing
            your workflow. Take advantage of smart features like recurring
            tasks, subtasks, and task notes to add granularity to your plans and
            ensure nothing slips through the cracks. With TodoList App, you have
            complete control over your tasks. Add, edit, delete, and retrieve
            tasks with just a few taps, giving you the flexibility to adapt your
            lists as your priorities shift. With a sleek and user-friendly
            interface, TodoList App makes staying organized a delightful
            experience. Sync seamlessly across all your devices, so you can
            access your to-do lists anytime, anywhere. Say goodbye to the chaos
            of scattered sticky notes and endless lists. Experience the
            simplicity and efficiency of TodoList App, and unlock your full
            productivity potential today. Empower Your Productivity, Unleash
            Your Potential – Your To-Do List, Your Success Story!
            <Button
              className="okay"
              variant="contained"
              onClick={() => {
                navigate('/')
              }}
            >
              OKAY
            </Button>
          </Typography>
        </Box>
        <Box>
          <img className="footer_img" src={footer}></img>
        </Box>
      </Box>
    </>
  )
}

export default TodoListDescription
