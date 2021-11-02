import classes from './App.module.scss'
import MediaControls from '../MediaControls/MediaControls'
import useMpvInformation from '../../hooks/useMpvInformation'
import FileControl from '../FileControl/FileControl'
import YoutubeControl from '../YoutubeControl/YoutubeControl'

function App () {
  const { file } = useMpvInformation()

  return (
        <main className={classes.app}>
            {file && <MediaControls file={file}/>}
            <FileControl/>
            <YoutubeControl/>
        </main>
  )
}

export default App
