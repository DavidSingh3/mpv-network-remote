import classes from './FileControl.module.scss'
import FilePicker from '../FilePicker/FilePicker'
import useMpvCommands from '../../hooks/useMpvCommands'
import { MdOndemandVideo, MdTranslate } from 'react-icons/md'
import useBooleanState from '../../hooks/useBooleanState'
import useMpvFile from '../../hooks/useMpvFile'
import IconButton from '../IconButton/IconButton'

const videoFileRegex = /^video\/.*$/

export default function FileControl () {
  const file = useMpvFile()
  const [selectVideoFilePicker, flipOrSetSelectVideoFilePicker] = useBooleanState(false)
  const [selectSubtitlesFilePicker, flipOrSetSelectSubtitlesFilePicker] = useBooleanState(false)
  const { addSubtitles, selectVideo } = useMpvCommands()

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
        mimeTypeRegex={videoFileRegex}
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
