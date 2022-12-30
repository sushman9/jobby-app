import {BsSearch} from 'react-icons/bs'
import './index.css'

const SearchBar = props => {
  const {searchTitle, changeSearchText, startSearch} = props

  const onChangeText = event => {
    changeSearchText(event.target.value)
  }

  const onClickingSearch = () => {
    startSearch()
  }

  return (
    <div className="search-bar-container">
      <input
        value={searchTitle}
        type="search"
        onChange={onChangeText}
        placeholder="Search"
        className="search-input"
      />
      <button
        type="button"
        onClick={onClickingSearch}
        className="search-icon-button"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default SearchBar
