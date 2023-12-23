import React, { useContext } from "react";
import { MetricsContext, LoginContext } from "../App";

function Metrics() {
  const [
    metricsAvg,
    setMetricsAvg,
    metrics,
    setMetrics,
    metricsCount,
    setMetricsCount,
  ] = useContext(MetricsContext);
  const [loggedIn] = useContext(LoginContext);

  const currentSpeed = metricsAvg.avgSpeed;
  const currentAccuracy = metricsAvg.avgAccuracy.toFixed(2);
  const wordsTyped = metricsCount;

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
          Accuracy: {currentAccuracy == 0 ? "-- " : currentAccuracy}%
        </p>
        <p className="mr-4">
          Score: {wordsTyped === 1 ? "-- " : calculateScore()}/1000
        </p>
      </div>
      {/* Div to display for logged in user only */}
      {loggedIn && (
        <div className="flex">
          <div className="basis-1/6"></div>
          <p className="mr-6">Avg Speed: {metrics.avgSpeed} wpm</p>
          <p className="mr-6">Avg Accuracy: {metrics.avgAccuracy} %</p>
          <p className="mr-4">Avg Score: {metrics.avgScore} /1000</p>
        </div>
      )}
    </>
  );
}

export default Metrics;
