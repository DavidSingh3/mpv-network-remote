import React, { useEffect, useState } from 'react'
import { getDirectoryEntities } from '../util/getDirectoryEntities'

export default function useFileSystem (mimeTypeRegex?: RegExp): [
    {
        path: string,
        loading: boolean,
        success: boolean,
        error: string|null,
        files: Array<string>,
        directories: Array<string>,
    },
    {
        setPath:React.Dispatch<React.SetStateAction<string>>,
        setPathToSubDirectory: (path: string) => void,
        setPathToParentDirectory: () => void,
    }
    ] {
  const [path, setPath] = useState<string>('/')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string|null>(null)
  const [files, setFiles] = useState<Array<string>>([])
  const [directories, setDirectories] = useState<Array<string>>([])

  useEffect(() => {
    setLoading(true)
    getDirectoryEntities(path, mimeTypeRegex)
      .then(({ files, directories }) => {
        setSuccess(true)
        setError(null)
        setFiles(files ?? [])
        setDirectories(directories ?? [])
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [mimeTypeRegex, path])

  function setPathToParentDirectory () {
    if (path !== '/') {
      setPath(path.replace(/[^/]+\/?$/, ''))
    }
  }

  function setPathToSubDirectory (directory: string) {
    setPath(path.replace(/\/?$/, '/').concat(directory).concat('/'))
  }

  return [
    { path, loading, success, error, files, directories },
    { setPath, setPathToSubDirectory, setPathToParentDirectory }
  ]
}
