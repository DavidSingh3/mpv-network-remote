import classes from './App.module.scss'
import MediaControls from '../MediaControls/MediaControls'
import useMpvInformation from '../../hooks/useMpvInformation'
import FileControl from '../FileControl/FileControl'

function App () {
  const { file } = useMpvInformation()

  return (
        <main className={classes.app}>
            {file && <MediaControls file={file}/>}
            <FileControl/>
        </main>
  )
}

export default App
