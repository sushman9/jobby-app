import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import SearchBar from '../SearchBar'
import JobItem from '../JobItem'
import Filters from '../Filters'
import './index.css'

const jobApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    searchTitle: '',
    jobApiStatus: jobApiStatusConstants.initial,
    employmentType: '',
    minPackage: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobApiStatus: jobApiStatusConstants.inProgress})
    const {searchTitle, employmentType, minPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${searchTitle}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      if (data.total === 0) {
        this.setState({jobApiStatus: jobApiStatusConstants.noJobs})
      } else {
        const updatedJobs = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))
        this.setState({
          jobsList: updatedJobs,
          jobApiStatus: jobApiStatusConstants.success,
        })
      }
    } else {
      this.setState({jobApiStatus: jobApiStatusConstants.failure})
    }
  }

  changeSearchText = title => {
    this.setState({searchTitle: title})
  }

  startSearch = () => {
    this.getJobs()
  }

  renderJobSuccess = () => {
    const {jobsList} = this.state
    console.log(jobsList)

    return (
      <ul className="jobs-display-container">
        {jobsList.map(each => (
          <JobItem jobDets={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onJobRetry = () => {
    this.getJobs()
  }

  renderJobFailure = () => (
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
        onClick={this.onJobRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobInProgress = () => (
    <div className="loader-container-jobs">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobs = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case jobApiStatusConstants.success:
        return this.renderJobSuccess()
      case jobApiStatusConstants.failure:
        return this.renderJobFailure()
      case jobApiStatusConstants.inProgress:
        return this.renderJobInProgress()
      case jobApiStatusConstants.noJobs:
        return this.renderJobNoJobs()
      default:
        return null
    }
  }

  changeEmploymentFilter = employmentQueryString => {
    console.log(employmentQueryString)
    this.setState({employmentType: employmentQueryString}, this.getJobs)
  }

  changeSalaryFilter = salary => {
    this.setState({minPackage: salary}, this.getJobs)
  }

  render() {
    const {searchTitle} = this.state
    return (
      <>
        <div className="jobs-bg-container-small">
          <SearchBar
            searchTitle={searchTitle}
            changeSearchText={this.changeSearchText}
            startSearch={this.startSearch}
          />
          <Profile />
          <Filters
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentFilter={this.changeEmploymentFilter}
            changeSalaryFilter={this.changeSalaryFilter}
          />
          {this.renderJobs()}
        </div>
        <div className="jobs-bg-container-large">
          <div className="profile-filters-container">
            <Profile />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentFilter={this.changeEmploymentFilter}
              changeSalaryFilter={this.changeSalaryFilter}
            />
          </div>
          <div className="search-jobs-list-container">
            <SearchBar
              searchTitle={searchTitle}
              changeSearchText={this.changeSearchText}
              startSearch={this.startSearch}
            />
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobsSection
