import React from "react";
import LeaderboardRow from "./LeaderboardRow";

function Leaderboard() {
  return (
    <>
      <h4 className="font-semibold pl-6 mt-6 mb-1">Leaderboard:</h4>
      <div className="mx-4 border border-[#1ea54c]">
        <div className="flex bg-[#1ea54c] py-1 px-2 text-center">
          <p className="font-semibold basis-1/12">POS</p>
          <p className="font-semibold basis-3/12">PLAYER</p>
          <p className="font-semibold basis-3/12">TYPING SPEED</p>
          <p className="font-semibold basis-3/12">ACCURACY</p>
          <p className="font-semibold basis-2/12">SCORE</p>
        </div>
        {/* Need to be generated dynamictly when we get data */}
        <LeaderboardRow pos={"#1"} />
        <LeaderboardRow bg="27323d" pos={"#2"} />
        <LeaderboardRow pos={"#3"} />
        <LeaderboardRow bg="27323d" pos={"#4"} />
        <LeaderboardRow pos={"#5"} />
      </div>
    </>
  );
}

export default Leaderboard;
