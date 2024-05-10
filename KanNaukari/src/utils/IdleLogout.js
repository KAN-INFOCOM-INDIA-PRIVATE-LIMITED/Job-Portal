import { useEffect } from 'react';
import { useIdle } from 'use-idle';

const IdleLogout = ({ onLogout }) => {
  const { isIdle } = useIdle({ timeToIdle: 10 * 60 * 1000 }); // 10 minutes in milliseconds

  useEffect(() => {
    if (isIdle) {
      onLogout();
    }
  }, [isIdle, onLogout]);

  return null; // This component doesn't render anything
};

export default IdleLogout;