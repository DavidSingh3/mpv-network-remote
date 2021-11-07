import classes from './ChapterControl.module.scss'
import useChapters, { Chapter, Chapters } from '../../hooks/useChapters'
import IconButton from '../IconButton/IconButton'
import { MdFormatListNumbered } from 'react-icons/all'
import useBooleanState from '../../hooks/useBooleanState'
import Modal from '../Modal/Modal'
import { useCallback, useContext, useEffect } from 'react'
import useMpvCommands from '../../hooks/useMpvCommands'
import { TasksContext } from '../TasksContextManager/TasksContextManager'
import secondsToTimestamp from '../../util/secondsToTimestamp'
import useMpvFile from '../../hooks/useMpvFile'
import useIsMounted from '../../hooks/useIsMounted'

export default function ChapterControl () {
  const file = useMpvFile()
  const chaptersOrNull = useChapters()
  const [showModal, flipOrSetShowModal] = useBooleanState(false)
  const { addTask } = useContext(TasksContext)
  const { setTimePosition } = useMpvCommands()
  const isMounted = useIsMounted()

  const selectChapter = useCallback((chapter: Chapter) => {
    if (isMounted()) {
      const task = addTask(`Loading ${chapter.title}`)
      setTimePosition(chapter.time)
        .then(() => {
          if (isMounted()) {
            flipOrSetShowModal(false)
            console.log('updated')
          }
        })
        .finally(task.finish)
    }
  }, [addTask, flipOrSetShowModal, isMounted, setTimePosition])

  if (chaptersOrNull === null) {
    return null
  }

  const chapters = chaptersOrNull as Chapters

  return <div className={classes.chapterControl}>
    <IconButton
      className={classes.mainButton}
      Icon={MdFormatListNumbered}
      onClick={flipOrSetShowModal}
      text={chapters.current.title}
    />
    {
      showModal && <Modal title='Chapters' closeCallback={flipOrSetShowModal}>
        <div className={classes.modalInner}>
          {
            chapters.list.map((chapter, index) => {
              const classNames = [classes.chapter]
              if (index === chapters.index) {
                classNames.push(classes.currentChapter)
              }
              const startTime = secondsToTimestamp(chapter.time)
              const endTime = index === chapters.list.length - 1
                ? secondsToTimestamp(file?.duration ?? 0)
                : secondsToTimestamp(chapters.list[index + 1].time)
              return <div
                key={index}
                className={classNames.join(' ')}
                onClick={() => selectChapter(chapter)}
              >
                ({startTime} - {endTime}) {chapter.title}
              </div>
            })
          }
        </div>
      </Modal>
    }
  </div>
}
