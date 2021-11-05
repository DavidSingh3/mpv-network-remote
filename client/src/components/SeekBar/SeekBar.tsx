import { MPVFile } from '../../hooks/useMpvFile'
import useMpvInformation from '../../hooks/useMpvInformation'
import { MdPlayArrow, MdPause, MdStop, MdCloseFullscreen, MdFullscreen } from 'react-icons/md'
import classes from './SeekBar.module.scss'
import { setTimePosition, togglePause, stop, toggleFullscreen } from '../../util/mpvCommands'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import useDelay from '../../hooks/useDelay'
import { SocketContext } from '../SocketContextManager/SocketContextManager'
import secondsToTimestamp from '../../util/secondsToTimestamp'
import { TasksContext } from '../TasksContextManager/TasksContextManager'

export default function SeekBar (props: {file: MPVFile}) {
  const { pause, fullscreen } = useMpvInformation()
  const timePassedHumanReadable = secondsToTimestamp(props.file.timePosition)
  const durationHumanReadable = secondsToTimestamp(props.file.duration)
  const { socket } = useContext(SocketContext)
  const [controllerTimePosition, delayedControllerTimePosition, setControllerTimePosition] = useDelay<number>(props.file.timePosition)
  const [displayTimePosition, setDisplayTimePosition] = useState(props.file.timePosition)
  const isFirstRender = useRef(true)
  const { addTask } = useContext(TasksContext)

  function handleChangeSlider (event: ChangeEvent<HTMLInputElement>) {
    setControllerTimePosition(parseInt(event.target.value ?? 0, 10))
  }

  useEffect(function () {
    if (controllerTimePosition !== delayedControllerTimePosition) {
      setDisplayTimePosition(controllerTimePosition)
    } else {
      setDisplayTimePosition(props.file.timePosition)
    }
  }, [controllerTimePosition, delayedControllerTimePosition, props.file.timePosition])

  useEffect(function () {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const task = addTask('Loading')
    setTimePosition(delayedControllerTimePosition).finally(task.finish)
  }, [addTask, delayedControllerTimePosition, socket])

  return <nav className={classes.seekBar}>
    <button className={classes.playButton} onClick={togglePause}>
      {
        pause
          ? <MdPlayArrow/>
          : <MdPause/>
      }
    </button>
    <button className={classes.fullscreenButton} onClick={toggleFullscreen}>
      {
        fullscreen
          ? <MdCloseFullscreen/>
          : <MdFullscreen/>
      }
    </button>
    <button className={classes.stopButton} onClick={stop}>
      <MdStop/>
    </button>
    <div className={classes.timers}>
      <span className={classes.timePassedHumanReadable}>{timePassedHumanReadable}</span>
      <span className={classes.durationHumanReadable}>/&nbsp;{durationHumanReadable}</span>
    </div>
    <input
        className={classes.slider}
        type="range"
        min="0"
        max={props.file.duration}
        value={displayTimePosition}
        onChange={handleChangeSlider}
        id="myRange"
    />
  </nav>
}
