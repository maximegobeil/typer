import React, { useEffect, useState } from "react";

function Timer({ timerOn, reset, timer, onCounterUpdate }) {
  const [counter, setCounter] = useState(0);

  //  Maybe add a timeout to stop the timer after a certain amount of time
  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const updatedCounter = prevCounter + 1;

          return updatedCounter;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [timerOn]);

  useEffect(() => {
    if (reset) {
      setCounter(0);
    }
  }, [reset]);

  useEffect(() => {
    if (timer) {
      onCounterUpdate(counter);
    }
  }, [timer]);

  return (
    <div className="">
      <span>{("0" + Math.floor((counter / 6000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((counter / 100) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((counter / 1) % 100)).slice(-2)}</span>
    </div>
  );
}

export default Timer;
