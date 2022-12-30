import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const jobApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class jobItemDetails extends Component {
  state = {
    apiStatus: jobApiStatusConstants.initial,
    jobData: {},
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    this.setState({apiStatus: jobApiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const initialData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = initialData
      const initialJobDetails = {
        skills: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
      }
      const {skills, lifeAtCompany} = initialJobDetails
      const updatedSkills = skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: updatedSkills,
        title: jobDetails.title,
        lifeAtCompany: updatedLifeAtCompany,
      }
      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      const updatedJobData = {
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      }
      this.setState({
        jobData: updatedJobData,
        apiStatus: jobApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: jobApiStatusConstants.failure})
    }
  }

  renderInProgressPage = () => (
    <div className="loader-container-jobs">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onJobItemRetry = () => {
    this.getJobItem()
  }

  renderFailurePage = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="job-retry-button"
        onClick={this.onJobItemRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-item-container-1">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="title-container">
            <h1 className="heading">{title}</h1>
            <div className="rating-container">
              <AiFillStar />
              <p className="rating">{rating}</p>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="container-1-2">
              <div className="location-container">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <div className="description-container">
            <div className="website-container">
              <h1 className="descrip-head">Description</h1>
              <a href={companyWebsiteUrl} target="">
                Visit
              </a>
            </div>
            <p>{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="descrip-head">Skills</h1>
            <ul className="skills-list">
              {skills.map(each => (
                <li className="skill-item">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill-image"
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <div className="life-at-company-description-container">
              <h1 className="descrip-head">Life at Company</h1>
              <p>{description}</p>
            </div>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company"
            />
          </div>
        </div>
        <div>
          <h1 className="descrip-head">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(each => (
              <SimilarJobItem similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSuccessPage = () => <div>{this.renderJobDetails()}</div>

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobApiStatusConstants.success:
        return this.renderSuccessPage()
      case jobApiStatusConstants.failure:
        return this.renderFailurePage()
      case jobApiStatusConstants.inProgress:
        return this.renderInProgressPage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container">{this.renderJobItemDetails()}</div>
      </>
    )
  }
}
export default jobItemDetails
