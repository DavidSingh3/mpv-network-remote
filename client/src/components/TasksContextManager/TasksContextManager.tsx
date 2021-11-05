import Spinner from '../Spinner/Spinner'
import { createContext, ReactElement, useRef, useState } from 'react'

export type Task = {
  description: string,
  finish: () => void
}

export type TasksContextType = {
  tasks: Task[],
  addTask: (description: string) => Task
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: (): Task => {
    throw new Error('TasksContext.addTask should be replaced in the Provider element.')
  }
})

export default function TasksContextManager (props: { children: ReactElement }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = useRef((description?: string) => {
    const newTask = {
      description: description ?? 'Loading',
      finish: () => {
        setTasks(tasks.filter((task) => {
          return task !== newTask
        }))
      }
    }
    setTasks([...tasks, newTask])
    return newTask
  })

  return <TasksContext.Provider value={{ tasks, addTask: addTask.current }}>
    <Spinner/>
    {props.children}
  </TasksContext.Provider>
}
