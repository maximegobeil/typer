import React from "react";

function Metrics({ metrics }) {
  const currentSpeed = metrics.speed;
  const currentAccuracy = metrics.accuracy.toFixed(2);
  const wordsTyped = metrics.wordCounts;
  const userLoggedIn = true;

  const calculateWPM = () => {
    const wpm = wordsTyped / (currentSpeed / 100 / 60);
    return wpm.toFixed(2);
  };

  const calculateScore = () => {
    const wpmWeight = 0.4;
    const accuracyWeight = 0.6;
    const maxWPM = 180;
    const normalizedAccuracy = currentAccuracy / 100;
    const score =
      ((calculateWPM() / maxWPM) * wpmWeight +
        normalizedAccuracy * accuracyWeight) *
      1000;
    return score.toFixed();
  };

  return (
    <>
      <div className="flex">
        <p className="basis-1/6">Metrics:</p>
        <p className="mr-6">
          Speed: {currentSpeed === 0 ? "-- " : calculateScore()}wpm
        </p>
        <p className="mr-6">
          Accuracy: {isNaN(currentAccuracy) ? "-- " : currentAccuracy}%
        </p>
        <p className="mr-4">
          Score: {wordsTyped === 1 ? "-- " : calculateScore()}/1000
        </p>
      </div>
      {/* Div to display for logged in user only */}
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
