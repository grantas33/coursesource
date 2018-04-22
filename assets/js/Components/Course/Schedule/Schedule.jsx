import React from 'react'
import Calendar from './Calendar/Calendar'
import { connect } from 'react-redux'
import { fetchLectures } from '../../../modules/lectures'
import { fetchAssignments } from '../../../modules/assignments'
import { bindActionCreators } from 'redux'
import moment from 'moment'

class Schedule extends React.Component {
  componentWillMount() {
    this.props.fetchAssignments(this.props.match.params.course)
    this.props.fetchLectures(this.props.match.params.course)
  }

  eventStyleGetter =(event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: '#' + event.hexColor
      }
    }
  }

  render() {
    let events = [
      ...this.props.lectures.items.map(lecture => ({
        title: 'Lecture: ' + lecture.title,
        start: new Date(lecture.start_date),
        end:
          new Date(lecture.end_date) ||
          moment(lecture.start_date)
            .add(2, 'hours')
            .toDate(),
        hexColor: "0000FF",
      })),
      ...this.props.assignments.items.map(assignement => ({
        title: 'Deadline for ' + assignement.title,
        end: new Date(assignement.deadline_date),
        start: moment(assignement.deadline_date)
          .add(-1, 'hours')
          .toDate(),
        hexColor: "FF0000",          
      })),
    ]
    return (
      <div>
        <Calendar 
          events={events} 
          eventStyleGetter={this.eventStyleGetter}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lectures: state.lectures,
  assignments: state.assignments,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLectures,
      fetchAssignments,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
