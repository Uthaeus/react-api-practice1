import { useState, createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    onLogout: () => {},
    onLogin: () => {},
    initUser: (data) => {}
});

function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    function logoutHandler() {
        setIsLoggedIn(false);
        setUser(null);
    }

    function loginHandler() {
        setIsLoggedIn(true);
    }

    function initUser(data) {
        setUser(data);
        loginHandler();
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        user: user,
        initUser: initUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
