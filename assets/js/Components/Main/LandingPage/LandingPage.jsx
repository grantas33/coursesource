import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => (
  <section className="content">
    <div className="row">
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="info-box">
          <span className="info-box-icon bg-aqua">
            <i className="ion ion-ios-gear-outline" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">CPU Traffic</span>
            <span className="info-box-number">
              90<small>%</small>
            </span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      {/* /.col */}
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="info-box">
          <span className="info-box-icon bg-red">
            <i className="fa fa-google-plus" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Likes</span>
            <span className="info-box-number">41,410</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      {/* /.col */}
      {/* fix for small devices only */}
      <div className="clearfix visible-sm-block" />
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="info-box">
          <span className="info-box-icon bg-green">
            <i className="ion ion-ios-cart-outline" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Sales</span>
            <span className="info-box-number">760</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      {/* /.col */}
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="info-box">
          <span className="info-box-icon bg-yellow">
            <i className="ion ion-ios-people-outline" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">New Members</span>
            <span className="info-box-number">2,000</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      {/* /.col */}
    </div>
  </section>
)

export default LandingPage
