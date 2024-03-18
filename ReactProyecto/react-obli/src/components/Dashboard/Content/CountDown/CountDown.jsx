import React, { useState, useEffect } from "react";
import {
  differenceInSeconds,
  differenceInDays,
} from "date-fns";
import './CountDown.css'

const CountdownTimer = () => {
  const targetDate = new Date(2023, 8, 1); // 31 de agosto (el mes es 0-indexado)

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const secondsRemaining = differenceInSeconds(targetDate, now);

      if (secondsRemaining <= 0) {
        clearInterval(interval);
        return;
      }

      const days = differenceInDays(targetDate, now);
      const hours = Math.floor((secondsRemaining % 86400) / 3600);
      const minutes = Math.floor((secondsRemaining % 3600) / 60);
      const seconds = secondsRemaining % 60;

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  },);

  return (
    <div className="countdown-timer">
      <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
        Tiempo restante
      </div>
      <div className="time">
        <div className="time-part">
          <div className="value cantDias">{timeRemaining.days} Días </div>
          <div className="label"></div>
        </div>
        <div className="time-part">
          <div className="value cantHoras">{timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}</div>
         
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
