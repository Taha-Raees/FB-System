import React, { useState } from 'react';
import './Loading.scss';

const Loading = () => {
  const [dotMovement, setDotMovement] = useState(false);

  const handleDotMovementToggle = () => {
    setDotMovement(!dotMovement);
  };

  return (
    <div className="loading-container">
      <svg width="200" height="200" id="svg" className={dotMovement ? 'no-spin' : ''}>
        <circle id="dot1" className={`shape ${dotMovement ? 'linear-movement' : ''}`} />
        <circle id="dot2" className={`shape ${dotMovement ? 'linear-movement' : ''}`} />
        <circle id="dot3" className={`shape ${dotMovement ? 'linear-movement' : ''}`} />
        <circle id="dot4" className={`shape ${dotMovement ? 'linear-movement' : ''}`} />
      </svg>
      <p className="loadingMessage">Redirecting to dashboard, please wait...</p>
      <div className="control-panel">
        <p className="switch-label" id="switchLabel2">Dot Movement</p>
        <label className="switch movement">
          <input type="checkbox" id="myCheck2" checked={dotMovement} onChange={handleDotMovementToggle} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Loading;
