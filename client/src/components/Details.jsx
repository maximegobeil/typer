import React from "react";
import Metrics from "./Metrics";
import Options from "./Options";

function Details({ metrics }) {
  return (
    <div className="bg-[#1d2731] mx-4 mb-4 px-4 py-2 drop-shadow-md z-50">
      <Metrics metrics={metrics} />
      <Options />
    </div>
  );
}

export default Details;
