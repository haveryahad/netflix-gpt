import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe to onAuthStateChanged when component will Unmount
    return () => unsubscribe();
  }, []);
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="fixed w-screen flex justify-between z-10">
      <div className="px-8 p-2 bg-gradient-to-b from-black">
        <img
          className="w-52"
          src={LOGO}
          alt="logo"
        />
      </div>
      {user && (
        <div className="flex">
          <img
            className="w-14 h-14 m-2"
            src={user?.photoURL}
            alt="user-avatar"
          ></img>
          <div>
            <p className="p-2">Hello {user?.displayName}</p>
            <button
              className="font-bold p-2"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
