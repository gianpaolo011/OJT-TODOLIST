import React from 'react'

const AddTaskForm = ({ onAddTask, newTask, setNewTask }) => {
  // fetch('https://dummyjson.com/todos/add', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     todo: newTask,
  //     completed: false,
  //     userId: 5,
  //   })
  // })
  // .then(res => res.json())
  // .then(console.log)

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
            type="text"
          />
        </div>
        <div className="col-auto">
          <button onClick={onAddTask} className="btn btn-lg btn-success">
            Add Task
          </button>
        </div>
      </div>
    </>
  )
}

export default AddTaskForm
