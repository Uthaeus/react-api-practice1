import { NavLink } from "react-router-dom";

function MainNavigation() {

    return (
        <div>
            navigation
            <NavLink to='/' end>Home</NavLink>
            <NavLink to='/user'>User</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Signup</NavLink>
            <NavLink to='/logout'>Logout</NavLink>
        </div>
    );
}

export default MainNavigation;