import classes from './FileControl.module.scss'
import FilePicker from '../FilePicker/FilePicker'
import { addSubtitles, selectVideo } from '../../util/mpvCommands'
import { MdOndemandVideo, MdTranslate } from 'react-icons/md'
import useBooleanState from '../../hooks/useBooleanState'
import useMpvFile from '../../hooks/useMpvFile'
import IconButton from '../IconButton/IconButton'

export default function FileControl () {
  const file = useMpvFile()
  const [selectVideoFilePicker,, flipSelectVideoFilePicker] = useBooleanState(false)
  const [selectSubtitlesFilePicker,, flipSelectSubtitlesFilePicker] = useBooleanState(false)
  return <div className={classes.fileControl}>
      <IconButton
          Icon={MdOndemandVideo}
          text="Select video file"
          className={classes.selectVideoButton}
          onClick={flipSelectVideoFilePicker}
      />
      {
          file && <IconButton
            Icon={MdTranslate}
            text="Select subtitles file"
            className={classes.selectSubtitlesButton}
            onClick={flipSelectSubtitlesFilePicker}
          />
      }
      {
          selectVideoFilePicker && <FilePicker
            title='Select video file'
            pickFileCallback={selectVideo}
            closeCallback={flipSelectVideoFilePicker}
          />
      }
      {
          selectSubtitlesFilePicker && <FilePicker
            title='Select subtitles file'
            pickFileCallback={addSubtitles}
            closeCallback={flipSelectSubtitlesFilePicker}
          />
      }
    </div>
}
