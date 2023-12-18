import React, { useEffect, useState } from "react";
import axios from "axios";

function LeaderboardRow({ pos, playerName, speed, accuracy, score }) {
  const bg = pos % 2 === 0 ? "2e3e4c" : "27323d";

  return (
    <div className={`flex bg-[#${bg}] py-1 px-2 text-center`}>
      <h4 className="basis-1/12">{pos}</h4>
      <h4 className="basis-3/12">{playerName}</h4>
      <h4 className="basis-3/12">{speed}</h4>
      <h4 className="basis-3/12">{accuracy}</h4>
      <h4 className="basis-2/12">{score}</h4>
    </div>
  );
}

export default LeaderboardRow;
