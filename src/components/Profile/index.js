import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileDetail: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileData = {
        profileDetails: data.profile_details,
      }
      const updatedData = {
        name: profileData.profileDetails.name,
        profileImageUrl: profileData.profileDetails.profile_image_url,
        shortBio: profileData.profileDetails.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetail: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetail} = this.state
    const {name, profileImageUrl, shortBio} = profileDetail

    return (
      <div className="profile-success-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  onRetry = () => {
    this.getProfile()
  }

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderProfileInProgress = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      case apiStatusConstants.inProgress:
        return this.renderProfileInProgress()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfile()}</>
  }
}
export default Profile
