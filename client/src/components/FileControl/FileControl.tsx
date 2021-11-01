import classes from './FileControl.module.scss'
import FilePicker from '../FilePicker/FilePicker'
import { addSubtitles, selectVideo } from '../../util/mpvCommands'
import { MdOndemandVideo, MdTranslate } from 'react-icons/md'
import useBooleanState from '../../hooks/useBooleanState'
import useMpvFile from '../../hooks/useMpvFile'

export default function FileControl () {
  const file = useMpvFile()
  const [selectVideoFilePicker,, flipSelectVideoFilePicker] = useBooleanState(false)
  const [selectSubtitlesFilePicker,, flipSelectSubtitlesFilePicker] = useBooleanState(false)
  return <div className={classes.fileControl}>
      <button className={classes.selectVideoButton} onClick={flipSelectVideoFilePicker}>
          <MdOndemandVideo/> <span>Select video file</span>
      </button>
      {
          file && <button className={classes.selectSubtitlesButton} onClick={flipSelectSubtitlesFilePicker}>
            <MdTranslate/> <span>Select subtitles file</span>
          </button>
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
