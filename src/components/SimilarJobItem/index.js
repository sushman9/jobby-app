import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-list-item">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      </div>
      <div className="description-container">
        <h1 className="descrip-head">Description</h1>
        <p>{jobDescription}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
