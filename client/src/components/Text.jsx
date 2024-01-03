import { useContext, useEffect, useState } from "react";
import Timer from "./Timer";
import { MetricsContext } from "../App";

function Text() {
  const { metrics, setMetrics, metricsCount, setMetricsCount } =
    useContext(MetricsContext);

  const [isBlurred, setIsBlurred] = useState(true);
  const [timerOn, setTimerOn] = useState(false);
  const [resetTimer, setResetTimer] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [pressedKey, setPressedKey] = useState("");
  const [oneMoreKey, setOneMoreKey] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [snippet, setSnippet] = useState("");
  const [wordCounts, setWordCounts] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerCounter, setTimerCounter] = useState(0);
  const [timer, setTimer] = useState(false);

  const text = snippet.split("");

  const handleStart = () => {
    setIsBlurred(false);
    setTimerOn(true);
    setResetTimer(false);
    setGameStarted(true);
  };

  const handleReset = () => {
    setIsBlurred(true);
    setTimerOn(false);
    setResetTimer(true);
    fetchSnippet();
    setTextIndex(0);
    setUserInput("");
    setMistakeCount(0);
    setGameStarted(false);
    setTimer(false);
  };

  const handleStop = () => {
    setTimerOn(false);
    setGameStarted(false);
  };

  const handleTimer = (counter) => {
    setTimerCounter(counter);
    console.log(metrics);

    const accuracy = ((text.length - mistakeCount) / text.length) * 100; // Calculate accuracy
    setMetrics({
      speed: counter,
      accuracy: accuracy,
    });
    setMetricsCount(counter);
  };

  /*const updateMetrics = () => {
    const accuracy = ((text.length - mistakeCount) / text.length) * 100; // Calculate accuracy
    setMetrics({
      speed: timerCounter,
      accuracy: accuracy,
    });
    setMetricsCount(timerCounter);
  };*/

  // Change text color based on user input
  const newLetter = () => {
    if (pressedKey === text[textIndex]) {
      const newSpan = (
        <span key={textIndex} className="text-green-600">
          {text[textIndex]}
        </span>
      );
      setUserInput((prevInput) => [...prevInput, newSpan]);
    } else {
      const newSpan = (
        <span key={textIndex} className="text-red-600">
          {text[textIndex]}
        </span>
      );
      setMistakeCount((prevCount) => prevCount + 1);
      setUserInput((prevInput) => [...prevInput, newSpan]);
    }
    if (textIndex < text.length - 1) {
      setTextIndex((prevIndex) => prevIndex + 1);
    } else {
      setTimerOn(false);
      setGameStarted(false);
      //updateMetrics();
      setTimer(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      setPressedKey(e.key);
      setOneMoreKey((prevKey) => prevKey + 1);
    };
    if (gameStarted) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      if (gameStarted) {
        document.removeEventListener("keydown", handleKeyPress);
      }
    };
  });

  useEffect(() => {
    // This is to prevent the useEffect from running on the first render
    if (oneMoreKey > 0) {
      newLetter();
    }
  }, [oneMoreKey]);

  // Fetch api to get the text snippet
  const fetchSnippet = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/snippets/");
      const data = await response.json();
      setSnippet(data.text);
      setWordCounts(data.word_count);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchSnippet();
  }, []);

  return (
    <div
      className={`${
        isBlurred ? "blur-sm" : ""
      } bg-[#1d2731] h-1/3 mx-4 px-4 py-2 drop-shadow-md`}
    >
      {snippet && (
        <button
          className={`${
            isBlurred ? "visible" : "invisible"
          } absolute w-full h-full`}
          onClick={handleStart}
        ></button>
      )}
      <div className="relative">
        <div className="z-10 text-slate-400">{snippet}</div>
        <div className="h-full w-full absolute left-0 top-0 z-50">
          {userInput}
        </div>
      </div>
      <div
        className={`${
          isBlurred ? "invisible" : "visible"
        } flex absolute inset-x-0 bottom-0 mx-4 mb-2`}
      >
        <button onClick={handleReset}>Reset</button>
        <button className="ml-6" onClick={handleStop}>
          Stop
        </button>
        <div className="ml-auto">
          <Timer
            timerOn={timerOn}
            reset={resetTimer}
            timer={timer}
            onCounterUpdate={handleTimer}
          />
        </div>
      </div>
    </div>
  );
}

export default Text;
