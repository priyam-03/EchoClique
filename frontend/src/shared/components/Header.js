import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { useGetDetailsQuery } from "../app/services/auth/authService";
import { logout } from "../../features/auth/authActions";
import { setCredentials } from "../../features/auth/authSlice";
// import { store } from "../store/store";
import { store } from "../../store/store";
// import { connect } from "react-redux";
import { getGroup } from "../../api";
import { setGroup } from "../../store/actions/friendsActions";
// import { Dashboard } from "../features/auth/authActions";
import "../../styles/header.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);
  // dispatch(profile());
  // automatically authenticate user if token is found
  // const { data, isFetching } = useGetDetailsQuery("userDetails", {
  //   pollingInterval: 900000, // 15mins
  // });
  const dispatch = useDispatch();
  // const fetch = async () => {
  //   const group = await getGroup();
  //   console.log("group" + group);
  //   store.dispatch(setGroup(group));
  // };
  useEffect(() => {
    // Dispatch the setGroup action when the component mounts
    dispatch(setGroup());
  }, [dispatch]); // Ensure dispatch is added as a dependency

  return (
    <header>
      <div className="header-status">
        {/* <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"} */}
        {/* {userInfo && `Logged in as ${userInfo.email}`}
          {userInfo === null && "You're not logged in"} */}
        {/* </span> */}
        <div className="cta">
          {userInfo ? (
            <div>
              <button className="button" onClick={() => dispatch(logout())}>
                Logout
              </button>
              <img
                className="profile-image"
                src={`http://localhost:4000/${userInfo.user.avatar.filePath}`}
                alt="img"
              />
            </div>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="container navigation">
        <NavLink to="/">Home</NavLink>
        {!userInfo ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/user-profile">Profile</NavLink>
            <NavLink to="/dashboard">Personal Chat</NavLink>
            <NavLink to="/cluster">Cluster Chat</NavLink>
            <NavLink to="/group">New Group</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
