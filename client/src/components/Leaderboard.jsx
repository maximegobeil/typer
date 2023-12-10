import React from "react";
import LeaderboardRow from "./LeaderboardRow";

function Leaderboard() {
  return (
    <>
      <h4 className="font-semibold pl-6 mt-6 mb-1">Leaderboard:</h4>
      <div className="mx-4 border border-[#1ea54c]">
        <div className="flex bg-[#1ea54c] py-1 px-2">
          <p className="font-semibold">POS</p>
          <p className="font-semibold">PLAYER</p>
          <p className="font-semibold">TYPING SPEED</p>
          <p className="font-semibold">ACCURACY</p>
        </div>

        <LeaderboardRow />
        <LeaderboardRow bg="27323d" />
        <LeaderboardRow />
        <LeaderboardRow bg="27323d" />
        <LeaderboardRow />
      </div>
    </>
  );
}

export default Leaderboard;
