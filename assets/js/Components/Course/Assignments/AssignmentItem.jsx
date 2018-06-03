import React from 'react'
import hourglassImg from '../../../../Resources/img/Hourglass-128.png'
import checkImg from '../../../../Resources/img/check.png'
import moment from 'moment'
import Timestamp from 'react-timestamp'
import user3img from '../../../../Resources/img/user3-128x128.jpg'

const AssignmentItem = props => (
  <div className="row">
    <div className="col-md-12">
      <div className="box box-widget">
        <div className="box-header with-border">
          <div className="user-block">
            <img className="img-circle" src={props.assignment.teacher.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"}
                 alt="Teacher image" />
            <span className="username">{props.assignment.teacher.name} {props.assignment.teacher.surname}</span>
            <span className="description">{moment(props.assignment.creation_date).format('YYYY-MM-DD HH:mm')}</span>
          </div>
          {/* /.user-block */}
          <div className="box-tools">
            <button type="button" className="btn btn-box-tool" data-toggle="tooltip" data-original-title="Mark as read">
              <i className="fa fa-circle-o" />
            </button>
            <button type="button" className="btn btn-box-tool" data-widget="collapse">
              <i className="fa fa-minus" />
            </button>
            <button type="button" className="btn btn-box-tool" data-widget="remove">
              <i className="fa fa-times" />
            </button>
          </div>
          {/* /.box-tools */}
        </div>
        {/* /.box-header */}
          <div className="box-body">
              {/* post text */}
              {moment().isBefore(props.assignment.deadline_date) ? (
                  <div className="callout callout-warning">
                      <h4>{props.assignment.title}</h4>
                      <h4>
                          Deadline: <Timestamp time={new Date()} until={new Date(props.assignment.deadline_date)}/>
                      </h4>
                      <p>
                          This assignment should be completed due to{' '}
                          {moment(props.assignment.deadline_date).format('YYYY-MM-DD HH:mm:ss')}
                      </p>
                  </div>
              ) : (
                  <div className="callout callout-danger">
                      <h4>{props.assignment.title}</h4>
                      {props.assignment.is_submittable ? (
                              <div>
                                  <h4>Its too late</h4>
                                  <p>You haven't submitted this assignment</p>
                              </div>) :
                          (
                              <h4>The deadline date for this assignment was{' '}
                                  {moment(props.assignment.deadline_date).format('YYYY-MM-DD HH:mm:ss')}
                              </h4>
                          )}
                  </div>
              )}
            <p>{props.assignment.description}</p>

          {/*<button type="button" className="btn btn-default btn-xs">*/}
            {/*<i className="fa fa-share" /> Upload*/}
          {/*</button>*/}
          {/*<span className="pull-right text-muted">2 comments</span>*/}
        </div>
        {/* /.box-body */}
        {/*<div className="box-footer box-comments">*/}
          {/*<div className="box-comment">*/}
            {/*/!* User image *!/*/}
            {/*<img className="img-circle img-sm" src={user3img} alt="User Image" />*/}
            {/*<div className="comment-text">*/}
              {/*<span className="username">*/}
                {/*Maria Gonzales*/}
                {/*<span className="text-muted pull-right">8:03 PM Today</span>*/}
              {/*</span>*/}
              {/*/!* /.username *!/*/}
              {/*It is a long established fact that a reader will be distracted by the readable content of a page when*/}
              {/*looking at its layout.*/}
            {/*</div>*/}
            {/*/!* /.comment-text *!/*/}
          {/*</div>*/}
          {/*<div className="box-comment">*/}
            {/*<img className="img-circle img-sm" src={user3img} alt="User Image" />*/}
            {/*<div className="comment-text">*/}
              {/*<span className="username">*/}
                {/*Nora Havisham*/}
                {/*<span className="text-muted pull-right">8:03 PM Today</span>*/}
              {/*</span>*/}
              {/*The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to*/}
              {/*using 'Content here, content here', making it look like readable English.*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="box-footer">*/}
          {/*<form action="#" method="post">*/}
            {/*<img className="img-responsive img-circle img-sm" src={user3img} alt="Alt Text" />*/}
            {/*/!* .img-push is used to add margin to elements next to floating images *!/*/}
            {/*<div className="img-push">*/}
              {/*<input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />*/}
            {/*</div>*/}
          {/*</form>*/}
        {/*</div>*/}
      </div>
    </div>
  </div>
)

export default AssignmentItem
