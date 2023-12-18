import React, { useEffect, useState } from "react";
import LeaderboardRow from "./LeaderboardRow";
import axios from "axios";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/scores/");
        setLeaderboardData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

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
        {leaderboardData.map((data, index) => (
          <LeaderboardRow
            key={index}
            pos={index + 1}
            playerName={data.username}
            speed={data.speed.toFixed(2)}
            accuracy={data.accuracy.toFixed(2)}
            score={data.score.toFixed(2)}
          />
        ))}
      </div>
    </>
  );
}

export default Leaderboard;
