import React from 'react';
import '@/assets/css/style.css'

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;