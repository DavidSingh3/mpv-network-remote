import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getDirectoryEntities } from '../util/getDirectoryEntities'
import { TasksContext } from '../components/TasksContextManager/TasksContextManager'
import useIsMounted from './useIsMounted'

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
  const isMounted = useIsMounted()

  useEffect(() => {
    const task = addTask(`Loading ${path} ...`)
    getDirectoryEntities(path, mimeTypeRegex)
      .then(({ files, directories }) => {
        if (isMounted()) {
          setSuccess(true)
          setError(null)
          setFiles(files ?? [])
          setDirectories(directories ?? [])
        }
      })
      .catch((error) => {
        if (isMounted()) {
          setError(error.message)
        }
      })
      .finally(() => {
        task.finish()
      })
  }, [addTask, isMounted, mimeTypeRegex, path])

  const setPathToParentDirectory = useCallback(() => {
    if (path !== '/') {
      setPath(path.replace(/[^/]+\/?$/, ''))
    }
  }, [path])

  const setPathToSubDirectory = useCallback((directory: string) => {
    setPath(path.replace(/\/?$/, '/').concat(directory).concat('/'))
  }, [path])

  return [
    { path, success, error, files, directories },
    { setPath, setPathToSubDirectory, setPathToParentDirectory }
  ]
}
