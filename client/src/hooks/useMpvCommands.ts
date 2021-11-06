import getEndpointURL from '../util/getEndpointURL'
import { useCallback, useContext } from 'react'
import { TasksContext } from '../components/TasksContextManager/TasksContextManager'

export default function useMpvCommands () {
  const { addTask } = useContext(TasksContext)

  const doAction = useCallback((endpoint: string, query: {} = {}, taskDescription?: string) => {
    const task = addTask(taskDescription ?? `Loading ${endpoint}`)
    const url = getEndpointURL(endpoint, new URLSearchParams(query)).toString()
    return new Promise<void>((resolve, reject) => {
      fetch(url, { method: 'post' })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(await response.text())
          }
          resolve()
        })
        .catch(reject)
        .finally(task.finish)
    })
  }, [addTask])

  const selectVideo = useCallback(
    function (path: string) {
      return doAction('selectVideo', { path })
    }, [doAction]
  )
  const selectURL = useCallback(
    function (url: string) {
      return doAction('selectVideo', { url })
    }, [doAction]
  )
  const addSubtitles = useCallback(
    function (path: string) {
      return doAction('addSubtitles', { path })
    }, [doAction]
  )
  const togglePause = useCallback(
    function () {
      return doAction('togglePause')
    }, [doAction]
  )
  const stop = useCallback(
    function () {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Stop playing this video?')) {
        doAction('stop').then().catch()
      }
    }, [doAction]
  )
  const toggleFullscreen = useCallback(
    function () {
      return doAction('toggleFullscreen')
    }, [doAction]
  )
  const toggleMute = useCallback(
    function () {
      return doAction('toggleMute')
    }, [doAction]
  )
  const adjustVolumeUp = useCallback(
    function () {
      return doAction('adjustVolume', { adjustment: 10 })
    }, [doAction]
  )
  const adjustVolumeDown = useCallback(
    function () {
      return doAction('adjustVolume', { adjustment: -10 })
    }, [doAction]
  )
  const setTimePosition = useCallback(
    function (timePosition: number) {
      return doAction('seek', { timePosition, mode: 'absolute' })
    }, [doAction]
  )
  return {
    selectVideo,
    selectURL,
    addSubtitles,
    togglePause,
    stop,
    toggleFullscreen,
    toggleMute,
    adjustVolumeUp,
    adjustVolumeDown,
    setTimePosition
  }
}
