import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/auth-context";

function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function logoutHandler() {
    authCtx.onLogout();
    navigate("/");
  }

  return (
    <div className="navigation-container">
      <div className="nav-title-wrapper">
        {authCtx.isLoggedIn ? (
          <span>Logged in as {authCtx.user.username}</span>
        ) : (
          <span>Welcome!</span>
        )}
      </div>
      <div className="nav-links-wrapper">
        <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/meetups" className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>Meetups</NavLink>
        <NavLink to="/user" className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>User</NavLink>
      </div>
      <div className="nav-auth-wrapper">
        {!authCtx.isLoggedIn ? (
          <>
            <NavLink to="/login" className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>Login</NavLink>
            <NavLink to="/signup" className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>Signup</NavLink>
          </>
        ) : (
          <p onClick={logoutHandler} className="nav-link">Logout</p>
        )}
      </div>
    </div>
  );
}

export default MainNavigation;
