import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/root";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import Login from "./auth/login";
import Logout from "./auth/logout";
import Signup from "./auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
