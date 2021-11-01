import useFileSystem from '../../hooks/useFileSystem'
import Error from '../Error/Error'
import { MdClose, MdOutlineFolderOpen, MdOutlineFolder, MdDriveFolderUpload, MdOutlinePermMedia } from 'react-icons/md'
import classes from './FilePicker.module.scss'
import Modal from '../Modal/Modal'

function FilePicker (props: {
    title: string | null,
    pickFileCallback: (path: string) => Promise<void>,
    closeCallback: () => void,
}) {
  const [fileSystem, { setPathToParentDirectory, setPathToSubDirectory }] = useFileSystem()
  const handleSelectFile = (name: string) => () => {
    props.pickFileCallback(fileSystem.path.concat(name))
      .then(props.closeCallback)
      .catch((error) => {
        console.log('there is an error:', error.message)
      })
  }
  return <Modal>
        <div className={classes.filePicker}>
            {props.title && <div className={classes.title}>{props.title}</div>}
            <div className={classes.closeButtonContainer}>
                <MdClose onClick={props.closeCallback}/>
            </div>
            {fileSystem.loading && <div>loading</div>}
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
