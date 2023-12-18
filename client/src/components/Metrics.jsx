import React from "react";

function Metrics({ metrics }) {
  const currentSpeed = metrics.speed;
  const currentAccuracy = metrics.accuracy.toFixed(2);
  const currentScore = 895;
  const userLoggedIn = true;

  return (
    <>
      <div className="flex">
        <p className="basis-1/6">Metrics:</p>
        <p className="mr-6">Speed: {currentSpeed}wpm</p>
        <p className="mr-6">Accuracy: {currentAccuracy}%</p>
        <p className="mr-4">Score: {currentScore}/1000</p>
      </div>
      {/* Div to display for logged in user */}
      {userLoggedIn && (
        <div className="flex">
          <div className="basis-1/6"></div>
          <p className="mr-6">Avg Speed: -- wpm</p>
          <p className="mr-6">Avg Accuracy: -- %</p>
          <p className="mr-4">Avg Score: -- /1000</p>
        </div>
      )}
    </>
  );
}

export default Metrics;
