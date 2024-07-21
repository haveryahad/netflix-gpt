import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { DEFAULT_AVATAR, LOGIN_BACKGROUND } from "../utils/constants";
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEmailValid, setisEmailValid] = useState(true);
  const [isPasswordValid, setisPasswordValid] = useState(true);
  const [isInvalidCreds, setIsInvalidCreds] = useState(false);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignUp(!isSignUp);
    setisEmailValid(true);
    setisPasswordValid(true);
  };
  const handleButtonClick = () => {
    setIsInvalidCreds(false);
    const { emailValid, passwordValid } = checkValidData(
      email.current.value,
      password.current.value
    );
    setisEmailValid(emailValid);
    setisPasswordValid(passwordValid);
    console.log(emailValid, passwordValid);
    if (!emailValid && !passwordValid) return;

    if (isSignUp) {
      //Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: { DEFAULT_AVATAR },
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      //Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsInvalidCreds(true);
          console.log(errorCode, errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={`${LOGIN_BACKGROUND}_small.jpg`}
          srcSet={`${LOGIN_BACKGROUND}_small.jpg 1000w, ${LOGIN_BACKGROUND}_medium.jpg 1500w, ${LOGIN_BACKGROUND}_large.jpg 1800w`}
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-8 bg-black my-3 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md mt-[10%]"
      >
        <h1 className="font-bold text-3xl text-center my-2 transition-all">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
        />
        {!isEmailValid && (
          <p className="px-3 mx-1 text-red-600 font-semibold drop-shadow-xl transition-all">
            Please enter a valid email address
          </p>
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
        />
        {!isPasswordValid && (
          <p className="px-3 mx-1 text-red-600 font-semibold drop-shadow-xl">
            Please enter a valid password
          </p>
        )}
        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-400 bg-opacity-80"
          />
        )}
        {isInvalidCreds && (
          <p className="px-3 mx-1 text-red-600 font-semibold drop-shadow-xl">
            You have entered invalid credentials. Please check your email and
            password again.
          </p>
        )}
        <button
          className="p-2 m-2 bg-red-700 block w-full rounded"
          onClick={handleButtonClick}
        >
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
