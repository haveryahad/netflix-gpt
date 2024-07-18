import { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleSignInForm = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_small.jpg"
          srcset="https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_large.jpg 1800w"
          alt="Background"
        />
      </div>
      <form className="absolute w-3/12 p-8 bg-black my-3 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md mt-[10%]">
        <h1 className="font-bold text-3xl text-center my-2 transition-all">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
        />
        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
          />
        )}
        <button className="p-2 m-2 bg-red-700 block w-full rounded">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p className="mx-2 my-4 text-gray-400">
          {isSignUp ? "Already have an account?" : "New to Netflix?"}
          <span
            className="text-white cursor-pointer hover:underline px-2"
            onClick={toggleSignInForm}
          >
            {isSignUp ? "Sign In Now" : "Sign Up Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
