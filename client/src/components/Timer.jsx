import React, { useEffect, useState } from "react";

function Timer({ timerOn, reset }) {
  const [counter, setCounter] = useState(0);

  //  Maybe add a timeout to stop the timer after a certain amount of time
  useEffect(() => {
    if (timerOn) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerOn]);

  useEffect(() => {
    if (reset) {
      setCounter(0);
    }
  }, [reset]);

  return <div className="">{counter}</div>;
}

export default Timer;
