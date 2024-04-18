import React from 'react'
import { Check, Delete, Edit } from '@mui/icons-material'

const ToDo = ({ task, onDeleteTask, onMarkDone, setUpdateData }) => {
  return (
    <React.Fragment>
      {task?.map((task, index) => {
        return (
          <div key={task.id}>
            <div className="col taskBg">
              {/* setting class name on Complete Condition  */}
              <div className={task.completed ? 'done' : ''}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.todo}</span>
              </div>
              <div className="iconsWrap">
                <span
                  title="Completed / Not Completed"
                  onClick={() => onMarkDone(task.id)}
                >
                  <Check />
                </span>
                {/* checking Task Completed Or Not  */}
                {task.completed ? null : (
                  <span
                    title="Edit"
                    onClick={() =>
                      setUpdateData({
                        id: task.id,
                        title: task.title,
                        completed: task.completed ? true : false,
                      })
                    }
                  >
                    <Edit />
                  </span>
                )}
                <span title="Delete" onClick={() => onDeleteTask(task.id)}>
                  <Delete />
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default ToDo
