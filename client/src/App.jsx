import LoginModal from "./components/LoginModal";
import Details from "./components/Details";
import Text from "./components/Text";
import Leaderboard from "./components/Leaderboard";
import { useState } from "react";
import SignUpModal from "./components/SignUpModal";

// Green 1ea54c
// Dark 27323d
// Light dark 2e3e4c
// Light text 4c5660
// Normal text White
// Card 1d2731

function App() {
  const [metrics, setMetrics] = useState({ speed: 0, accuracy: 0 });
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const handleMetrics = (speed, accuracy, wordCounts) => {
    setMetrics({ speed, accuracy, wordCounts });
  };

  const switchModal = () => {
    setIsOpenLogin(!isOpenLogin);
    setIsOpenSignUp(!isOpenSignUp);
  };

  return (
    <div className="bg-[#27323d]">
      <div className="w-3/5 m-auto bg-[#2e3e4c] h-screen">
        <div className="float-right">
          <button
            type="button"
            onClick={() => setIsOpenLogin(true)}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
          <LoginModal
            isOpenLogin={isOpenLogin}
            onClose={() => setIsOpenLogin(false)}
            onSwitch={() => switchModal()}
          />
          <SignUpModal
            isOpenSignUp={isOpenSignUp}
            onClose={() => setIsOpenSignUp(false)}
          />
        </div>
        <h1 className="text-center text-5xl font-mono pt-8 font-semibold">
          How fast can you type?
        </h1>
        <p className="text-center mx-4 mt-16 mb-6">
          Click to show the code snippet and start typing! You can play as a
          guest or create an account to store your information and have a chance
          to be on the leaderboard.
        </p>
        <Details metrics={metrics} />
        <Text onMetricUpdate={handleMetrics} />
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
