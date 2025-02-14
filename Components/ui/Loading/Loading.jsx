import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="circle-container">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="circle" />
            ))}
          </div>
          <div className="pulse-ring"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;