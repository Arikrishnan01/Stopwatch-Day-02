import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import './stopWatch.css';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(Math.floor((Date.now() - initialTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, initialTime]);

  const handleStart = () => {
    setIsRunning(true);
    setInitialTime(Date.now() - time * 1000);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime()}</div>
      <div className="buttons">
          <button onClick={handleStart}><FaPlay /> Start</button>
          <button onClick={handlePause}><FaPause /> Pause</button>
          <button onClick={handleRestart}><FaRedo /> Restart</button>
      </div>
    </div>
  );
};

export default StopWatch;
