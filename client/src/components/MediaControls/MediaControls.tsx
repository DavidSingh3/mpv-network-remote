import classes from './MediaControls.module.scss'
import SeekBar from '../SeekBar/SeekBar'
import useMpvFile from '../../hooks/useMpvFile'
import VolumeControl from '../VolumeControl/VolumeControl'
import ChapterControl from '../ChapterControl/ChapterControl'

export default function MediaControls () {
  const file = useMpvFile()
  return file && <div className={classes.mediaControls}>
      <h4>{file.mediaTitle}</h4>
      <SeekBar file={file}/>
      <ChapterControl/>
      <VolumeControl/>
    </div>
}
