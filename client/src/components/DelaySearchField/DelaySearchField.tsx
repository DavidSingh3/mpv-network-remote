import classes from './DelaySearchField.module.scss'
import useDelay from '../../hooks/useDelay'
import { useEffect } from 'react'
import { MdSearch } from 'react-icons/md'

export default function DelaySearchField ({
  initialState,
  onChange
}: { initialState: string, onChange: (searchTerm: string) => void }) {
  const [search, _search, setSearch] = useDelay(initialState)
  useEffect(function () {
    onChange(_search)
  },
  [_search, onChange])
  return <div className={classes.delaySearchFieldContainer}>
    <div className={classes.iconContainer}>
      <MdSearch className={classes.icon}/>
    </div>
    <input
      className={classes.delaySearchField}
      type="search"
      placeholder="Search YouTube"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  </div>
}
