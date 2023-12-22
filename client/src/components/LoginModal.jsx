import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";

function LoginModal({ isOpenLogin, onClose, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  if (!isOpenLogin) return null;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // display waiting for server
    setSpinner(true);
    // log the user using axios
    // if successful, display success and store token
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/jwt/create",
        {
          username,
          password,
        }
      );
      // if successful, display success and store token
      localStorage.setItem("token", response.data.access);
      console.log(response.data.access);
      setSpinner(false);

      // if unsuccessful, display error
      // close the modal
      onClose();
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 "
      />
      <div className="fixed w-96 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#2e3e4c] p-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-xl text-gray-600 hover:bg-gray-600 hover:text-gray-500"
        >
          X
        </button>
        {spinner && (
          <div classname="fixed top-1/2 left-1/2 border-gray-500 h-20 w-20 animate-spin rounded-full border-8 border-t-[#1ea54c]" />
        )}
        <form name="login" onSubmit={handleFormSubmit}>
          <h3 className="text-2xl font-bold mb-4 text-center">Sign In</h3>
          <div className="text-center mb-4">
            Not registered yet?
            <span
              onClick={onSwitch}
              className="ml-2 text-[#1ea54c] cursor-pointer"
            >
              Sign Up
            </span>
          </div>
          <div className="mb-4 mt-8">
            <label className="block">Username:</label>
            <input
              className="bg-gray-400 text-gray-800 placeholder:text-gray-800 p-2 mt-1 w-full"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block">Password:</label>
            <input
              className="bg-gray-400 placeholder:text-gray-800 p-2 mt-1 w-full"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className=" font-semibold bg-[#1ea54c] px-3 py-1.5 grow hover:bg-[#15612d]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default LoginModal;
