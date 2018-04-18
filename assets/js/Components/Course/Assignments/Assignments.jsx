import React from 'react';
import PageHeader from '../../common/PageHeader';
import AssignmentItem from './AssignmentItem';

class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        showSubmitted: false,
        showPrevious: false
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
          title={"Assignments"}
          links={[
            {
              name: "Home",
              url: "/course/1"
            }
          ]}
        />
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-default collapsed-box">
                <div className="box-header with-border ">
                  <h3 className="box-title">Filter</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <div className="box-body" style={{"display":"none"}}>
                  <div className="form-group">
                    <label >
                      <div 
                        className={"icheckbox_flat-green" + (this.state.filter.showPrevious ? " checked" : "")} 
                        style={{position: 'relative'}}
                      >
                        <input 
                          type="checkbox" 
                          className="flat-red" 
                          style={{position: 'absolute', opacity: 0}} 
                          onClick={(evt) => {
                            this.setState({filter: {
                              ...this.state.filter,
                              showPrevious: !this.state.filter.showPrevious
                            }})
                          }} 
                        />

                        <ins className="iCheck-helper" style={{position: 'absolute', top: '0%', left: '0%', display: 'block', width: '100%', height: '100%', margin: 0, padding: 0, background: 'rgb(255, 255, 255)', border: 0, opacity: 0}} />
                      </div>
                      Show previous assignments
                    </label>
                  </div>
                  <div className="form-group">
                    <label >
                      <div 
                        className={"icheckbox_flat-green" + (this.state.filter.showSubmitted ? " checked" : "")} 
                        style={{position: 'relative'}}
                      >
                        <input 
                          type="checkbox" 
                          className="flat-red" 
                          style={{position: 'absolute', opacity: 0}} 
                          onClick={(evt) => {
                            this.setState({filter: {
                              ...this.state.filter,
                              showSubmitted: !this.state.filter.showSubmitted
                            }})
                          }} 
                        />

                        <ins className="iCheck-helper" style={{position: 'absolute', top: '0%', left: '0%', display: 'block', width: '100%', height: '100%', margin: 0, padding: 0, background: 'rgb(255, 255, 255)', border: 0, opacity: 0}} />
                      </div>
                      Show submitted assignments
                    </label>
                  </div>
                </div>
              </div>
            </div>    
          </div>
          {this.items.map((assignment, i) => 
            <AssignmentItem 
              key={i}
              isDone={assignment.done}
            /> 
          )}
        </div>
      </div>
   )
  }
};

export default Assignments;
