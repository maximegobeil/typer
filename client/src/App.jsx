import Login from "./components/Login";
import Details from "./components/Details";
import Text from "./components/Text";
import Leaderboard from "./components/Leaderboard";

// Green 1ea54c
// Dark 27323d
// Light dark 2e3e4c
// Light text 4c5660
// Normal text White
// Card 1d2731

function App() {
  return (
    <div className="bg-[#27323d]">
      <div className="w-3/5 m-auto bg-[#2e3e4c] h-screen">
        <Login />
        <h1 className="text-center text-5xl font-mono pt-8">
          How fast can you type?
        </h1>
        <p className="text-center mx-4 mt-16 mb-6">
          Click to show the code snippet and start typing! You can play as a
          guest or create an account to store your information and have a chance
          to be on the leaderboard.
        </p>
        <Details />
        <Text />
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
