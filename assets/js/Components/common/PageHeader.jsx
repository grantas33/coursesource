import React from 'react';

const PageHeader = ({title, subtitle}) => (
<section className="content-header">
    <h1>
    {title}
    <small>{subtitle}</small>
    </h1>
    <ol className="breadcrumb">
    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
    <li className="active">Dashboard</li>
    </ol>
</section>
);

export default PageHeader;
