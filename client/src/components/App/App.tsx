import classes from './App.module.scss'
import MediaControls from '../MediaControls/MediaControls'
import FileControl from '../FileControl/FileControl'
import YoutubeControl from '../YoutubeControl/YoutubeControl'
import TasksContextManager from '../TasksContextManager/TasksContextManager'
import SocketStatus from '../SocketStatus/SocketStatus'
import SocketContextManager from '../SocketContextManager/SocketContextManager'

function App () {
  return (
        <TasksContextManager>
            <SocketContextManager>
                <div className={classes.app}>
                    <main>
                        <MediaControls/>
                        <FileControl/>
                        <YoutubeControl/>
                    </main>
                    <footer>
                         <SocketStatus/>
                    </footer>
                </div>
            </SocketContextManager>
        </TasksContextManager>
  )
}

export default App
