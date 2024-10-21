import React from 'react';
import './Loading2.scss';

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="circle-container">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="circle" />
            ))}
          </div>
          <div className="pulse-ring"></div>
        </div>
        <div className="loading-text">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;