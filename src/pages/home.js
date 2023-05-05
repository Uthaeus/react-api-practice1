import { useContext } from "react";

import { AuthContext } from "../store/auth-context";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn ? <p>You are logged in</p> : <p>You are logged out</p>}
    </div>
  );
}

export default HomePage;