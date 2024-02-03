import React from 'react';
import './apply.css';
import Form from './form';
import { Route, Link, Routes } from 'react-router-dom';

const CardComponent = ({ logoSrc, heading, description, linkTo }) => {
  return (
    <div className="card">
      <Link to={linkTo} className="card-link">
        <img src={logoSrc} alt="Logo" className="card-logo" />
        <div className="card-content">
          <h2 className="card-heading">{heading}</h2>
          <p className="card-description">{description}</p>
          {/* Removed onClick handler */}
          <button className="card-button">Go to Details</button>
        </div>
      </Link>
    </div>
  );
};

export const ApplyPatent = () => {
  return (
    <>
      <div className="app-container">
        <h1>Your App</h1>
        <div className="card-container">
          <CardComponent
            logoSrc="path/to/your-logo.png"
            heading="patent type 1"
            description="This is a sample description for Card 1."
            linkTo="/form" // Replace with the actual target route
          />
          <CardComponent
            logoSrc="path/to/your-logo.png"
            heading="patent type 2"
            description="This is a sample description for Card 2."
            linkTo="/form" // Replace with the actual target route
          />
          <CardComponent
            logoSrc="path/to/your-logo.png"
            heading="patent type 3"
            description="This is a sample description for Card 3."
            linkTo="/form" // Replace with the actual target route
          />
        </div>
      </div>
      
    </>
  );
};
