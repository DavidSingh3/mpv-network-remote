import classes from './MediaControls.module.scss'
import SeekBar from '../SeekBar/SeekBar'
import { MPVFile } from '../../hooks/useMpvFile'
import VolumeControl from '../VolumeControl/VolumeControl'

export default function MediaControls (props: { file: MPVFile }) {
  return <div className={classes.mediaControls}>
        <h4>{props.file.mediaTitle}</h4>
        <SeekBar file={props.file}/>
        <VolumeControl/>
    </div>
}
