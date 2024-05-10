import { useState, useEffect } from 'react';

export  const ShiveringProgressDialog = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulating progress update
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
    }, 500);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shivering-progress-dialog">
      <p>Progress: {progress}%</p>
    </div>
  );
};