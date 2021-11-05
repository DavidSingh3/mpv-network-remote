import React, { useContext, useEffect, useState } from 'react'
import { getDirectoryEntities } from '../util/getDirectoryEntities'
import { TasksContext } from '../components/TasksContextManager/TasksContextManager'

export default function useFileSystem (mimeTypeRegex?: RegExp): [
  {
    path: string,
    success: boolean,
    error: string | null,
    files: Array<string>,
    directories: Array<string>,
  },
  {
    setPath: React.Dispatch<React.SetStateAction<string>>,
    setPathToSubDirectory: (path: string) => void,
    setPathToParentDirectory: () => void,
  }
] {
  const [path, setPath] = useState<string>('/')
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<Array<string>>([])
  const [directories, setDirectories] = useState<Array<string>>([])
  const { addTask } = useContext(TasksContext)

  useEffect(() => {
    let isMounted = true
    const task = addTask(`Loading ${path} ...`)
    getDirectoryEntities(path, mimeTypeRegex)
      .then(({ files, directories }) => {
        if (isMounted) {
          setSuccess(true)
          setError(null)
          setFiles(files ?? [])
          setDirectories(directories ?? [])
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.message)
        }
      })
      .finally(() => {
        task.finish()
      })

    return () => {
      isMounted = false
    }
  }, [addTask, mimeTypeRegex, path])

  function setPathToParentDirectory () {
    if (path !== '/') {
      setPath(path.replace(/[^/]+\/?$/, ''))
    }
  }

  function setPathToSubDirectory (directory: string) {
    setPath(path.replace(/\/?$/, '/').concat(directory).concat('/'))
  }

  return [
    { path, success, error, files, directories },
    { setPath, setPathToSubDirectory, setPathToParentDirectory }
  ]
}
