import { useEffect, useState } from "react";
import Timer from "./Timer";

function Text() {
  const [isBlurred, setIsBlurred] = useState(true);
  const [timerOn, setTimerOn] = useState(false);
  const [resetTimer, setResetTimer] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [pressedKey, setPressedKey] = useState("");
  const [oneMoreKey, setOneMoreKey] = useState(0);

  const textValue =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident amet aut laborum ea impedit, tenetur deleniti, numquam rem ipsa soluta, consectetur quis itaque dolores voluptatem tempora nam a laudantium vitae?";
  const text = textValue.split("");

  const handleStart = () => {
    setIsBlurred(false);
    setTimerOn(true);
    setResetTimer(false);
  };

  const handleReset = () => {
    setIsBlurred(true);
    setTimerOn(false);
    setResetTimer(true);
  };

  const handleStop = () => {
    setTimerOn(false);
  };

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
      setUserInput((prevInput) => [...prevInput, newSpan]);
    }

    setTextIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      setPressedKey(e.key);
      setOneMoreKey((prevKey) => prevKey + 1);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    // This is to prevent the useEffect from running on the first render
    if (oneMoreKey > 0) {
      newLetter();
    }
  }, [oneMoreKey]);

  return (
    <div
      className={`${
        isBlurred ? "blur-sm" : ""
      } bg-[#1d2731] h-1/3 mx-4 px-4 py-2 drop-shadow-md`}
    >
      <button
        className={`${
          isBlurred ? "visible" : "invisible"
        } absolute w-full h-full`}
        onClick={handleStart}
      ></button>
      <div className="relative">
        <div className="z-10 text-slate-400">{textValue}</div>
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
          <Timer timerOn={timerOn} reset={resetTimer} />
        </div>
      </div>
    </div>
  );
}

export default Text;
