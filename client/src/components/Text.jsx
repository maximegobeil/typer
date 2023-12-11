import React, { useState } from "react";
import Timer from "./Timer";

function Text() {
  const [isBlurred, setIsBlurred] = useState(true);
  const [timerOn, setTimerOn] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [errorCount, setErrorCount] = useState(0);

  const textValue =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident amet aut laborum ea impedit, tenetur deleniti, numquam rem ipsa soluta, consectetur quis itaque dolores voluptatem tempora nam a laudantium vitae?";

  const handleStart = () => {
    setIsBlurred(false);
    setTimerOn(true);
  };

  return (
    <div
      className={`${
        isBlurred ? "blur-sm" : ""
      } flex flex-col bg-[#1d2731] h-1/3 mx-4 px-4 py-2 drop-shadow-md z-10`}
      onClick={handleStart}
    >
      <div>{textValue}</div>
      <Timer timerOn={timerOn} />
    </div>
  );
}

export default Text;
