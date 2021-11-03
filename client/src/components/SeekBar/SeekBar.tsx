import { MPVFile } from '../../hooks/useMpvFile'
import { intervalToDuration } from 'date-fns'
import useMpvInformation from '../../hooks/useMpvInformation'
import { MdPlayArrow, MdPause, MdStop, MdCloseFullscreen, MdFullscreen } from 'react-icons/md'
import classes from './SeekBar.module.scss'
import { setTimePosition, togglePause, stop, toggleFullscreen } from '../../util/mpvCommands'
import { ChangeEvent, useEffect, useState } from 'react'
import useSocketIO from '../../hooks/useSocketIO'
import useDelay from '../../hooks/useDelay'

function formatSeconds (seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1_000 })
  return [
    duration.hours ?? 0,
    duration.minutes ?? 0,
    duration.seconds ?? 0
  ].map((n) => n.toString().padStart(2, '0')).join(':')
}

export default function SeekBar (props: {file: MPVFile}) {
  const { pause, fullscreen } = useMpvInformation()
  const timePassedHumanReadable = formatSeconds(props.file.timePosition)
  const durationHumanReadable = formatSeconds(props.file.duration)
  const socket = useSocketIO()
  const [controllerTimePosition, delayedControllerTimePosition, setControllerTimePosition] = useDelay<number>(props.file.timePosition)
  const [displayTimePosition, setDisplayTimePosition] = useState(props.file.timePosition)

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
    setTimePosition(delayedControllerTimePosition).then(() => {
      socket.emit('mpv-property-change-request')
    })
  }, [delayedControllerTimePosition, socket])

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
