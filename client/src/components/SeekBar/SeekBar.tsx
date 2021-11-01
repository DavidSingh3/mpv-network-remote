import { MPVFile } from '../../hooks/useMpvFile'
import { intervalToDuration } from 'date-fns'
import useMpvInformation from '../../hooks/useMpvInformation'
import { MdPlayArrow, MdPause, MdStop, MdCloseFullscreen, MdFullscreen } from 'react-icons/md'
import classes from './SeekBar.module.scss'
import { setTimePosition, togglePause, stop, toggleFullscreen } from '../../util/mpvCommands'
import { ChangeEvent } from 'react'
import useSocketIO from '../../hooks/useSocketIO'

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

  function handleChangeSlider (event: ChangeEvent<HTMLInputElement>) {
    setTimePosition(parseInt(event.target.value ?? 0, 10)).then(() => {
      socket.emit('mpv-property-change-request')
    })
  }

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
        value={props.file.timePosition}
        onChangeCapture={handleChangeSlider}
        id="myRange"
    />
  </nav>
}
