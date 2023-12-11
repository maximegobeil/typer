import React, { useEffect, useState } from "react";

function Timer({ timerOn }) {
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

  return (
    <div className="place-self-end">{timerOn ? counter : <p>Timer</p>}</div>
  );
}

export default Timer;
