import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import AddTaskForm from '../components/CRUD/AddTaskForm'
import UpdateForm from '../components/CRUD/UpdateForm'
import ToDo from '../components/CRUD/ToDo'
// import '../assets/styles/TodoContainer.css'
import '../assets/styles/TodoContainer.scss'
//import LandingPage from '../pages/landingpage/LandingPage'
// import { useGetTodosQuery } from '../../app/features/api/apiSlice'

function TodoContainer({ fakeTodosArr }) {
  const [result, setResult] = useState(fakeTodosArr.result)
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  const addTaskHandler = () => {
    // e.preventDefault()
    if (newTask) {
      let newEntry = {
        id: Date.now(),
        title: newTask,
        completed: false,
      }
      setResult([newEntry, ...result])
      setNewTask('')
    }
  }
  // console.log(newTask)

  const deleteTaskHandler = (id) => {
    setResult((result) => result.filter((todo) => todo.id !== id))
  }

  const markDoneHandler = (id) =>
    setResult((result) =>
      result.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )

  const cancelUpdateHandler = () => {
    setUpdateData('')
  }

  const changeTaskHandler = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      completed: updateData.completed ? true : false,
    }
    setUpdateData(newEntry)
  }

  const updateTaskHandler = () => {
    let filterRecord = [...result].filter((result) => result.id !== updateData.id)
    let UpdatedObject = [updateData, ...filterRecord]
    setResult(UpdatedObject)
    setUpdateData('')
  }

  return (
    <React.Fragment>
      <div className="container App">
        {updateData && updateData ? (
          <UpdateForm
            updateData={updateData}
            OnChangeTask={changeTaskHandler}
            onUpdateTask={updateTaskHandler}
            onCancelUpdate={cancelUpdateHandler}
          />
        ) : (
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            onAddTask={addTaskHandler}
          />
        )}

        <ToDo
          todos={result}
          onMarkDone={markDoneHandler}
          onDeleteTask={deleteTaskHandler}
          setUpdateData={setUpdateData}
        />
      </div>
    </React.Fragment>
  )
}

export default TodoContainer
