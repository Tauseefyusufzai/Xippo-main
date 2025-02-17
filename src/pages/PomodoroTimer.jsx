import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const initialMinutes = parseInt(localStorage.getItem('pomodoroMinutes')) || 25;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sliderValue, setSliderValue] = useState(initialMinutes);

  useEffect(() => {
    setMinutes(sliderValue);
    setSeconds(0);
  }, [sliderValue]);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer is complete, reset
            clearInterval(interval);
            setIsActive(false);
            setSeconds(0);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, sliderValue]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(sliderValue);
    setSeconds(0);
  };

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setSliderValue(newValue);
    setMinutes(newValue);
    localStorage.setItem('pomodoroMinutes', newValue.toString()); // Save to localStorage
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="slider-container">
        <label>
          <span>Session Duration: {sliderValue} Minutes</span>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </label>
      </div>
      <div className="timer-controls">
        <button className="button1" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button className="button2" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
