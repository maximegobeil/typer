import LoginModal from "./components/LoginModal";
import Details from "./components/Details";
import Text from "./components/Text";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState, createContext } from "react";
import SignUpModal from "./components/SignUpModal";
import { baseUrl } from "./shared";

// Green 1ea54c
// Dark 27323d
// Light dark 2e3e4c
// Light text 4c5660
// Normal text White
// Card 1d2731

export const LoginContext = createContext();
export const MetricsContext = createContext();

function App() {
  const [metrics, setMetrics] = useState({
    speed: 0,
    accuracy: 0,
  });
  const [metricsAvg, setMetricsAvg] = useState({
    avgSpeed: 0,
    avgAccuracy: 0,
    avgScore: 0,
  });
  const [metricsCount, setMetricsCount] = useState(1);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const switchModal = () => {
    setIsOpenLogin(!isOpenLogin);
    setIsOpenSignUp(!isOpenSignUp);
  };

  useEffect(() => {
    const minute = 1000 * 60;
    function refreshToken() {
      if (localStorage.refresh) {
        const url = baseUrl + "/auth/jwt/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      } else {
        setLoggedIn(false);
      }
    }
    refreshToken();
    setInterval(refreshToken, minute * 14);
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <MetricsContext.Provider
        value={{
          metricsAvg,
          setMetricsAvg,
          metrics,
          setMetrics,
          metricsCount,
          setMetricsCount,
        }}
      >
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
              guest or create an account to store your information and have a
              chance to be on the leaderboard.
            </p>
            <Details />
            <Text />
            <Leaderboard />
          </div>
        </div>
      </MetricsContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
