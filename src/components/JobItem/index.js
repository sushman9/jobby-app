import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDets} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDets

  return (
    <li className="job-list-item">
      <Link to={`jobs/${id}`} className="job-link-item">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-container">
            <h1 className="heading">{title}</h1>
            <div className="rating-container">
              <AiFillStar />
              <p className="rating">{rating}</p>
            </div>
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
          <h1 className="descrip-head">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
