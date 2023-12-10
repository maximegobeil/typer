import React from "react";
import Metrics from "./Metrics";
import Options from "./Options";

function Details() {
  return (
    <div className="bg-[#1d2731] mx-4 mb-4 px-4 py-2 drop-shadow-md">
      <Metrics />
      <Options />
    </div>
  );
}

export default Details;
