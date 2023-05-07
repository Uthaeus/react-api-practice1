import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/auth-context";

function MainNavigation() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    function logoutHandler() {
        authCtx.onLogout();
        navigate('/');
    }

    return (
        <div>
            navigation
            <NavLink to='/' end>Home</NavLink>
            <NavLink to='/meetups'>Meetups</NavLink>
            <NavLink to='/user'>User</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Signup</NavLink>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default MainNavigation;