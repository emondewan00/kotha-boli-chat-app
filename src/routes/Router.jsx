import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Inbox from "../pages/Inbox";
import Conversation from "../pages/Conversation";
import Warper from "../pages/Warper";
import PrivateRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/inbox",
    element: (
      <PrivateRoute>
        <Warper />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/inbox",
        element: <Conversation />,
      },
      {
        path: "/inbox/:id",
        element: <Inbox />,
      },
    ],
  },
]);

export default router;
