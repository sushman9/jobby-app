import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-nav-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="small-container">
        <Link to="/" className="nav-link">
          <AiFillHome />
        </Link>
        <Link to="/jobs" className="nav-link">
          <BsBriefcaseFill />
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="logout-button-small"
        >
          <FiLogOut />
        </button>
      </div>
      <ul className="large-container">
        <Link to="/" className="nav-link-large">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="nav-link-large">
          <li>Jobs</li>
        </Link>
      </ul>
      <button className="logout-button-large" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
