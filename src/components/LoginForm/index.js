import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showErrorMsg: true, errMsg: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <form
          className="name-password-input-container"
          onSubmit={this.onSubmitForm}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="username-id" className="label-styling">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            id="username-id"
            className="input-styling"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password-id" className="label-styling">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            id="password-id"
            className="input-styling"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="submit-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
