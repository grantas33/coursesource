import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({title, subtitle, links}) => (
<section className="content-header">
    <h1>
    {title}
    <small>{subtitle}</small>
    </h1>
    <ol className="breadcrumb">
    {links && links.map((link, i) => 
        <li key={i}><Link to={link.url}>{link.name}</Link></li>
    )}
    <li className="active">{title}</li>
    </ol>
</section>
);

export default PageHeader;
