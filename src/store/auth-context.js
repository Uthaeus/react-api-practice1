import { useState, createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {}
});

function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function logoutHandler() {
        setIsLoggedIn(false);
    }

    function loginHandler() {
        setIsLoggedIn(true);
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
