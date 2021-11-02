import classes from './FileControl.module.scss'
import FilePicker from '../FilePicker/FilePicker'
import { addSubtitles, selectVideo } from '../../util/mpvCommands'
import { MdOndemandVideo, MdTranslate } from 'react-icons/md'
import useBooleanState from '../../hooks/useBooleanState'
import useMpvFile from '../../hooks/useMpvFile'
import IconButton from '../IconButton/IconButton'

export default function FileControl () {
  const file = useMpvFile()
  const [selectVideoFilePicker, flipOrSetSelectVideoFilePicker] = useBooleanState(false)
  const [selectSubtitlesFilePicker, flipOrSetSelectSubtitlesFilePicker] = useBooleanState(false)
  return <div className={classes.fileControl}>
      <IconButton
          Icon={MdOndemandVideo}
          text="Select video file"
          className={classes.selectVideoButton}
          onClick={flipOrSetSelectVideoFilePicker}
      />
      {
          file && <IconButton
            Icon={MdTranslate}
            text="Select subtitles file"
            className={classes.selectSubtitlesButton}
            onClick={flipOrSetSelectSubtitlesFilePicker}
          />
      }
      {
          selectVideoFilePicker && <FilePicker
            title='Select video file'
            pickFileCallback={selectVideo}
            closeCallback={flipOrSetSelectVideoFilePicker}
          />
      }
      {
          selectSubtitlesFilePicker && <FilePicker
            title='Select subtitles file'
            pickFileCallback={addSubtitles}
            closeCallback={flipOrSetSelectSubtitlesFilePicker}
          />
      }
    </div>
}
