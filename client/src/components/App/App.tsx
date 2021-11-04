import classes from './App.module.scss'
import MediaControls from '../MediaControls/MediaControls'
import useMpvInformation from '../../hooks/useMpvInformation'
import FileControl from '../FileControl/FileControl'
import YoutubeControl from '../YoutubeControl/YoutubeControl'
import TaskManager from '../TaskManager/TaskManager'

function App () {
  const { file } = useMpvInformation()

  return (
        <TaskManager>
            <main className={classes.app}>
                {file && <MediaControls file={file}/>}
                <FileControl/>
                <YoutubeControl/>
            </main>
        </TaskManager>
  )
}

export default App
