import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Countdown() {
  const minuteToSeconds = 60;
  const hourToSeconds = 3600;
  const dayToSeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 180,
    strokeWidth: 10,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper text-center text-3xl hover:rotate-360 transition-all duration-1000 ease-in-out cursor-default">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteToSeconds - time) | 0;
  const getTimeMinutes = (time) =>
    ((time % hourToSeconds) / minuteToSeconds) | 0;
  const getTimeHours = (time) => ((time % dayToSeconds) / hourToSeconds) | 0;
  const getTimeDays = (time) => (time / dayToSeconds) | 0;

  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = startTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / dayToSeconds);
  const daysDuration = days * dayToSeconds;

  const [darkMode] = useState(() => localStorage.getItem("theme") === "dark");
  let timerColors1, timerColors2, timerColors3, timerColors4;

  if (darkMode) {
    timerColors1 = "#9AA6B2";
    timerColors2 = "#BCCCDC";
    timerColors3 = "#D9EAFD";
    timerColors4 = "#F8FAFC";
  } else {
    timerColors1 = "#3E3232";
    timerColors2 = "#503C3C";
    timerColors3 = "#7E6363";
    timerColors4 = "#A87C7C";
  }

  return (
    <div className="flex gap-20 mt-8 justify-center mb-1">
      <CountdownCircleTimer
        {...timerProps}
        colors={timerColors1}
        duration={daysDuration}
        initialRemainingTime={remainingTime}>
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Days", getTimeDays(daysDuration - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={timerColors2}
        duration={dayToSeconds}
        initialRemainingTime={remainingTime % dayToSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourToSeconds,
        })}>
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Hours", getTimeHours(dayToSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={timerColors3}
        duration={hourToSeconds}
        initialRemainingTime={remainingTime % hourToSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteToSeconds,
        })}>
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Minutes", getTimeMinutes(hourToSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={timerColors4}
        duration={minuteToSeconds}
        initialRemainingTime={remainingTime % minuteToSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}>
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
