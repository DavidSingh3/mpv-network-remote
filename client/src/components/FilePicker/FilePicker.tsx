import useFileSystem from '../../hooks/useFileSystem'
import Error from '../Error/Error'
import { MdOutlineFolderOpen, MdOutlineFolder, MdDriveFolderUpload, MdOutlinePermMedia } from 'react-icons/md'
import classes from './FilePicker.module.scss'
import Modal from '../Modal/Modal'
import { useContext } from 'react'
import { TasksContext } from '../TasksContextManager/TasksContextManager'

function FilePicker (props: {
    title: string,
    pickFileCallback: (path: string) => Promise<void>,
    closeCallback: () => void,
    mimeTypeRegex?: RegExp
}) {
  const [fileSystem, { setPathToParentDirectory, setPathToSubDirectory }] = useFileSystem(props.mimeTypeRegex)
  const { addTask } = useContext(TasksContext)

  const handleSelectFile = (name: string) => () => {
    const task = addTask(`Opening ${name} ...`)
    props.pickFileCallback(fileSystem.path.concat(name))
      .then(props.closeCallback)
      .catch((error) => {
        console.log('there is an error:', error.message)
      })
      .finally(task.finish)
  }

  return <Modal closeCallback={props.closeCallback} title={props.title}>
        <div className={classes.filePicker}>
            {fileSystem.error && <Error message={fileSystem.error} hideErrorCallback={setPathToParentDirectory}/>}
            <div className={classes.entitiesContainer}>
                <div className={classes.entities}>
                    <div><MdOutlineFolderOpen/> {fileSystem.path}</div>
                    {
                        fileSystem.path !== '/' && <div onClick={() => setPathToParentDirectory()}>
                          <MdDriveFolderUpload/> ..
                        </div>}
                    {
                        fileSystem.directories.map((name) => {
                          return name.startsWith('.')
                            ? null
                            : <div key={name} onClick={() => setPathToSubDirectory(name)}>
                                    <MdOutlineFolder/> {name}
                                </div>
                        })
                    }
                    {
                        fileSystem.files.map((name) => {
                          return name.startsWith('.')
                            ? null
                            : <div key={name} onClick={handleSelectFile(name)}>
                                    <MdOutlinePermMedia/> {name}
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    </Modal>
}

export default FilePicker
