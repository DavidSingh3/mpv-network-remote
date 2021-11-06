import { ImSpinner9 } from 'react-icons/im'
import classes from './Spinner.module.scss'
import { createPortal } from 'react-dom'
import { useContext, useEffect } from 'react'
import { TasksContext } from '../TasksContextManager/TasksContextManager'
import useBooleanState from '../../hooks/useBooleanState'

export default function Spinner () {
  const { tasks } = useContext(TasksContext)
  const [showSpinner, flipOrSetShowSpinner] = useBooleanState(false)

  useEffect(() => {
    if (tasks.length) {
      const timeout = window.setTimeout(() => {
        flipOrSetShowSpinner(true)
      }, 300)

      return () => {
        window.clearTimeout(timeout)
      }
    } else {
      flipOrSetShowSpinner(false)
    }
  }, [flipOrSetShowSpinner, tasks.length])

  return showSpinner
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
