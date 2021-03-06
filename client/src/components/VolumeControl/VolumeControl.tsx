import classes from './VolumeControl.module.scss'
import useMpvCommands from '../../hooks/useMpvCommands'
import { MdVolumeDown, MdVolumeMute, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import useMpvInformation from '../../hooks/useMpvInformation'

export default function VolumeControl () {
  const { mute, volume } = useMpvInformation()
  const { adjustVolumeDown, adjustVolumeUp, toggleMute } = useMpvCommands()

  return <div className={classes.volumeControl}>
    <button className={classes.downButton} onClick={adjustVolumeDown}>{<MdVolumeDown/>}</button>
    <button className={classes.muteButton} onClick={toggleMute}>{mute ? <MdVolumeOff/> : <MdVolumeMute/>}</button>
    <button className={classes.upButton} onClick={adjustVolumeUp}>{<MdVolumeUp/>}</button>
    <span className={classes.display}>{`Volume: ${volume} / 100`}</span>
  </div>
}
