import React, { useEffect } from 'react';

export default function Timer({ timeLeft, setTimeLeft, onTimeout }) {
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, setTimeLeft, onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return <div>Thời gian: {minutes}:{seconds < 10 ? '0'+seconds : seconds}</div>;
}