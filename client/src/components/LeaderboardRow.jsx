import React from "react";

function LeaderboardRow({
  bg,
  pos,
  playerName,
  avgTypingSpeed,
  avgAccuracy,
  score,
}) {
  return (
    <div className={`flex bg-[#${bg}] py-1 px-2 text-center`}>
      <h4 className="basis-1/12">{pos}</h4>
      <h4 className="basis-3/12">{pos}</h4>
      <h4 className="basis-3/12">{pos}</h4>
      <h4 className="basis-3/12">{pos}</h4>
      <h4 className="basis-2/12">{pos}</h4>
    </div>
  );
}

export default LeaderboardRow;
