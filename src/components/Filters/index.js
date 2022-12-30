import {Component} from 'react'
import './index.css'

class Filters extends Component {
  state = {employmentQuery: [], salaryRange: ''}

  sendEmploymentQuery = () => {
    const {employmentQuery} = this.state
    const employmentQueryString = employmentQuery.join(',')
    const {changeEmploymentFilter} = this.props
    changeEmploymentFilter(employmentQueryString)
  }

  onClickingCheckbox = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentQuery: [...prevState.employmentQuery, event.target.id],
        }),
        this.sendEmploymentQuery,
      )
    } else {
      this.setState(
        prevState => ({
          employmentQuery: prevState.employmentQuery.filter(
            each => each !== event.target.id,
          ),
        }),
        this.sendEmploymentQuery,
      )
    }
  }

  renderEmploymentList = () => {
    const {employmentTypesList} = this.props

    return employmentTypesList.map(eachType => (
      <li key={eachType.employmentTypeId} className="filter-list-item">
        <input
          type="checkbox"
          value={eachType.label}
          id={eachType.employmentTypeId}
          onClick={this.onClickingCheckbox}
        />
        <p className="label">{eachType.label}</p>
      </li>
    ))
  }

  sendSalaryQuery = () => {
    const {salaryRange} = this.state
    const {changeSalaryFilter} = this.props
    changeSalaryFilter(salaryRange)
  }

  onChangingRadio = event => {
    this.setState({salaryRange: event.target.value}, this.sendSalaryQuery)
  }

  renderSalaryList = () => {
    const {salaryRangesList} = this.props

    return salaryRangesList.map(eachType => (
      <li key={eachType.salaryRangeId} className="filter-list-item">
        <input
          type="radio"
          value={eachType.salaryRangeId}
          id={eachType.salaryRangeId}
          onChange={this.onChangingRadio}
          name="salary"
        />
        <p className="label">{eachType.label}</p>
      </li>
    ))
  }

  render() {
    return (
      <div className="filters-container">
        <div className="employment-container">
          <h1 className="employ-heading">Type of Employment</h1>
          <ul className="employment-items-list">
            {this.renderEmploymentList()}
          </ul>
        </div>
        <div className="salary-container">
          <h1 className="employ-heading">Salary Range</h1>
          <ul className="employment-items-list">{this.renderSalaryList()}</ul>
        </div>
      </div>
    )
  }
}

export default Filters
