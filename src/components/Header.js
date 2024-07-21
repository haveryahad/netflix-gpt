import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="fixed w-screen flex justify-between z-10">
      <div className="px-8 p-2 bg-gradient-to-b from-black">
        <img
          className="w-52"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
