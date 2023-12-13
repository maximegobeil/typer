import React, { useState } from "react";

function Options() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // add 5 programming languages
  const options = ["Python", "Javascript", "C++", "Java", "C#"];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex mt-4">
      <p className="basis-1/6">Options:</p>
      <button className="">Line</button>
      <p className="mx-4">/</p>
      <button className="">Underline</button>
      {/*<p className="ml-12 mr-4">Programming Language: </p>
      <div className="relative">
        <button onClick={toggleOptions}>
          {selectedOption || "select an option"}
        </button>

        <div
          className={`${
            isOpen ? "visible" : "invisible"
          } absolute bg-white shadow-md`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </div>
          ))}
        </div>
      </div>*/}
    </div>
  );
}

export default Options;
