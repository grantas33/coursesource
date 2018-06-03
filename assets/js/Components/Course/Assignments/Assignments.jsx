import React from 'react'
import PageHeader from '../../common/PageHeader'
import AssignmentItem from './AssignmentItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAssignments } from '../../../modules/assignments'
import { bindActionCreators } from 'redux'
import { ROLES } from '../../../consts/userRoles';

class Assignments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        showSubmitted: true,
        showPrevious: true,
      },
      isDrawerOpen: false
    }
  }

  onFilterToggle = () => {
      this.setState({
          isDrawerOpen: !this.state.isDrawerOpen
      })
  };

  componentWillMount = () => {
    this.props.fetchAssignments(this.props.match.params.course, false)
  }

  render() {
    return (
      <div>
        <PageHeader
          title={'Assignments'}
          subtitle={
            !this.props.user.courseRole.loading && (this.props.user.courseRole.item.role === ROLES.ADMIN ||
                this.props.user.courseRole.item.role === ROLES.LECTOR) &&
            <Link to={`/course/${this.props.match.params.course}/create-new-assignment`}> Create a new assignment</Link>
          }
          links={[
            {
              name: 'Home',
              url: `/course/${this.props.match.params.course}`,
            },
          ]}
        />
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className={this.state.isDrawerOpen ? 'box box-default' : 'box box-default collapsed-box'}>
                <div className="box-header with-border ">
                  <h3 className="box-title">Filter</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" onClick={this.onFilterToggle}>
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <div className="box-body" style={{ display: this.state.isDrawerOpen ? '' : 'none' }}>
                  <div className="form-group">
                    <label>
                      <div
                        className={'icheckbox_flat-green' + (this.state.filter.showPrevious ? ' checked' : '')}
                        style={{ position: 'relative' }}
                      >
                        <input
                          type="checkbox"
                          className="flat-red"
                          style={{ position: 'absolute', opacity: 0 }}
                          onClick={evt => {
                              if (!this.state.filter.showPrevious) {
                                  this.props.fetchAssignments(
                                      this.props.match.params.course,
                                  );
                              } else {
                                  this.props.fetchAssignments(
                                      this.props.match.params.course,
                                      true
                                  );
                              }
                              this.setState({
                                  filter: {
                                      ...this.state.filter,
                                      showPrevious: !this.state.filter.showPrevious
                                  }
                              });
                          }}
                        />

                        <ins
                          className="iCheck-helper"
                          style={{
                            position: 'absolute',
                            top: '0%',
                            left: '0%',
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            background: 'rgb(255, 255, 255)',
                            border: 0,
                            opacity: 0,
                          }}
                        />
                      </div>
                      Show previous assignments
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <div
                        className={'icheckbox_flat-green' + (this.state.filter.showSubmitted ? ' checked' : '')}
                        style={{ position: 'relative' }}
                      >
                        <input
                          type="checkbox"
                          className="flat-red"
                          style={{ position: 'absolute', opacity: 0 }}
                          onClick={evt => {
                            this.setState({
                              filter: {
                                ...this.state.filter,
                                showSubmitted: !this.state.filter.showSubmitted,
                              },
                            })
                          }}
                        />

                        <ins
                          className="iCheck-helper"
                          style={{
                            position: 'absolute',
                            top: '0%',
                            left: '0%',
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            background: 'rgb(255, 255, 255)',
                            border: 0,
                            opacity: 0,
                          }}
                        />
                      </div>
                      Show submitted assignments
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.assignments.items.map(assignment => (
            <AssignmentItem key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments,
  user: state.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAssignments,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
