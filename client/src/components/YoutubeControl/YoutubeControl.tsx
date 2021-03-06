import classes from './YoutubeControl.module.scss'
import { ImYoutube2 } from 'react-icons/im'
import IconButton from '../IconButton/IconButton'
import useBooleanState from '../../hooks/useBooleanState'
import Modal from '../Modal/Modal'
import DelaySearchField from '../DelaySearchField/DelaySearchField'
import { useCallback, useContext, useEffect, useState } from 'react'
import youtubeSearch, { YouTubeSearchResults } from 'youtube-search'
import useMpvCommands from '../../hooks/useMpvCommands'
import { TasksContext } from '../TasksContextManager/TasksContextManager'
import useIsMounted from '../../hooks/useIsMounted'

export default function YoutubeControl () {
  const [showModal, flipOrSetShowModal] = useBooleanState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<YouTubeSearchResults[]>([])
  const { addTask } = useContext(TasksContext)
  const { selectURL } = useMpvCommands()
  const isMounted = useIsMounted()

  useEffect(() => {
    const opts: youtubeSearch.YouTubeSearchOptions = {
      maxResults: 10,
      key: process.env.REACT_APP_YOUTUBE_API_KEY
    }

    if (search.length) {
      youtubeSearch(search, opts)
        .then(({ results }) => {
          if (isMounted()) {
            setSearchResults(results)
          }
        })
        .catch(console.error)
    } else {
      setSearchResults([])
    }
  }, [isMounted, search])

  const handleClickVideo = useCallback((url: string) => {
    return () => {
      const task = addTask('Opening YouTube video ...')
      selectURL(url).catch(console.error).finally(task.finish)
      flipOrSetShowModal()
    }
  }, [addTask, flipOrSetShowModal, selectURL])

  return <div className={classes.youtubeControl}>
    <IconButton
      Icon={ImYoutube2}
      text="Search on YouTube"
      className={classes.selectVideoButton}
      onClick={flipOrSetShowModal}
    />
    {
      showModal && <Modal closeCallback={flipOrSetShowModal} title="Choose a video">
        <div className={classes.modalBody}>
          <DelaySearchField initialState={search} onChange={setSearch}/>
          <div className={classes.results}>
            {searchResults.map((searchResult) => {
              return <div key={searchResult.id} className={classes.result}
                          onClick={handleClickVideo(searchResult.link)}>
                <img className={classes.thumb} src={searchResult.thumbnails.default?.url} alt=""/>
                <div className={classes.title}>{searchResult.title}</div>
                <div className={classes.channelTitle}>{searchResult.channelTitle}</div>
                <div className={classes.description}>{searchResult.description}</div>
              </div>
            })}
          </div>
        </div>
      </Modal>
    }
  </div>
}
