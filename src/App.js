
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/root";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import Login from "./auth/login";
import Signup from "./auth/signup";
import UserPage from "./pages/user";
import MeetupLayout from "./meetups/meetup-layout";
import MeetupsPage from "./meetups/meetups";
import NewMeetup from "./meetups/new-meetup";
import EditMeetup from "./meetups/edit-meetup";
import MeetupDetail from "./meetups/meetup-detail";

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
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  },
  {
    path: "/meetups",
    element: <MeetupLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MeetupsPage />
      },
      {
        path: "/meetups/new",
        element: <NewMeetup />
      },
      {
        path: "/meetups/:meetupId/edit",
        element: <EditMeetup />
      },
      {
        path: "/meetups/:meetupId",
        element: <MeetupDetail />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
