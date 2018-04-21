import React from 'react';
import PageHeader from '../../common/PageHeader';
import Datetime from 'react-datetime';
import './Datetime.css';

class CreateNewAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        showSubmitted: true,
        showPrevious: true
      }
    }
    this.items = [
      {
        done: true,
      },
      {
        done: false,
      },
      {
        done: false
      }
    ]
  }

  render () {
    return (
      <div>
        <PageHeader 
          title={"Create a new assignment"}
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            },
            {
              name: "Assignments",
              url: `/course/${this.props.match.params.course}/assignments`              
            }
          ]}
        />
        <div className="content">
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">New assignment</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <form role="form">

                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="Enter ..." />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" rows={3} placeholder="Enter ..." defaultValue={""} />
                </div>

                
                <div className="form-group">
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                      Option one is this and that—be sure to include why it's great
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                      Option two can be something else and selecting it will deselect option one
                    </label>
                  </div>
                </div>

                <label>Deadline</label>
                <Datetime timeFormat={"HH:mm"} dateFormat={"YYYY-MM-DD"} />

                <div className="form-group">
                  <label>Choose students</label>
                  <select multiple className="form-control" size={"10"}>
                    <option>option 1</option>
                    <option>option 2</option>
                    <option>option 3</option>
                    <option>option 4</option>
                    <option>option 5</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="box-footer">
              <button type="submit" className="btn btn-info pull-right">Create</button>
            </div>

          </div>
        </div>
      </div>
   )
  }
};

export default CreateNewAssignment;
