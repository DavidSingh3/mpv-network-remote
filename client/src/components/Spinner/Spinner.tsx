import { ImSpinner9 } from 'react-icons/im'
import classes from './Spinner.module.scss'
import { createPortal } from 'react-dom'
import { useContext } from 'react'
import { TasksContext } from '../TasksContextManager/TasksContextManager'

export default function Spinner () {
  const { tasks } = useContext(TasksContext)

  return tasks.length
    ? createPortal(
      <div className={classes.spinner}>
        <ImSpinner9 className={classes.icon}/>
        <div className={classes.tasksList}>
          {
            tasks.map((task, index) => {
              return <div key={index}>
                {task.description}
              </div>
            })
          }
        </div>
      </div>,
      document.body
    )
    : null
}
