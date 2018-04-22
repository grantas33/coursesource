import React from 'react'
import hourglassImg from '../../../../Resources/img/Hourglass-128.png'
import checkImg from '../../../../Resources/img/check.png'
import moment from 'moment'
import Timestamp from 'react-timestamp'
import user3img from '../../../../Resources/img/user3-128x128.jpg'

const LectureItem = props => (
  <div className="row">
    <div className="col-md-12">
      <div className="box box-widget">
        <div className="box-header with-border">
          <div className="user-block">
            <img className="img-circle" src={user3img} alt="Lecture image" />
            <span className="username">{props.lecture.teacher == 1 ? 'Alexander Pierce' : 'Walter A. Smith'}</span>
            <span className="description">{moment(props.lecture.creation_date).format('YYYY-MM-DD HH:mm')}</span>
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
          {moment().isBefore(props.lecture.start_date) ? (
            <div className="callout callout-info">
              <h4>{props.lecture.title}</h4>
              <p>{props.lecture.start_date}</p>
              {props.lecture.end_date && <p>End: {props.lecture.end_date}</p>}
            </div>
          ) : (
            <div className="callout callout-warning">
              <h4>{props.lecture.title}</h4>
              <p>{props.lecture.start_date}</p>
              <p>Lecture has already ended</p>
            </div>
          )}

          <p>{props.lecture.description}</p>

          <span className="pull-right text-muted">2 comments</span>
        </div>
        {/* /.box-body */}
        <div className="box-footer box-comments">
          <div className="box-comment">
            {/* User image */}
            <img className="img-circle img-sm" src={user3img} alt="User Image" />
            <div className="comment-text">
              <span className="username">
                Maria Gonzales
                <span className="text-muted pull-right">8:03 PM Today</span>
              </span>
              {/* /.username */}
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout.
            </div>
            {/* /.comment-text */}
          </div>
          <div className="box-comment">
            <img className="img-circle img-sm" src={user3img} alt="User Image" />
            <div className="comment-text">
              <span className="username">
                Nora Havisham
                <span className="text-muted pull-right">8:03 PM Today</span>
              </span>
              The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable English.
            </div>
          </div>
        </div>
        <div className="box-footer">
          <form action="#" method="post">
            <img className="img-responsive img-circle img-sm" src={user3img} alt="Alt Text" />
            {/* .img-push is used to add margin to elements next to floating images */}
            <div className="img-push">
              <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)

export default LectureItem
