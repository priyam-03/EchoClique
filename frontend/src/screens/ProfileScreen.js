import { useSelector, useDispatch } from "react-redux";
import "../styles/profile.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { profile } from "../features/auth/authActions";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(profile());
  }, []);
  console.log(userInfo);
  return (
    <div>
      <figure>
        <img
          className="profile-image"
          src={`http://localhost:4000/${userInfo.user.avatar.filePath}`}
          alt="img"
        />
      </figure>
      <span>
        Welcome <strong>{userInfo.user?.name}!</strong>
        Welcome <strong>{userInfo.user?.email}!</strong>
      </span>
      <Link to="/updatePassword">Update Password</Link>
      <Link to="/updateProfile">Update Profile</Link>
    </div>
  );
};

export default ProfileScreen;
