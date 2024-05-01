import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage.jsx";
import TalkDetails from "./pages/TalkDetails.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Dashboard from "./pages/Dashboard.jsx";
import TalksAdminPage from "./pages/TalksAdminPage.jsx";
import AddTalksPage from "./pages/AddTalksPage.jsx";
import MembersPage from "./pages/MembersPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/review-cfp",
        element: <ReviewPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/talk-details",
        element: <TalkDetails />,
      },
      {
        path: "/talks",
        element: <TalksAdminPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/addTalks",
        element: <AddTalksPage />,
      },
      {
        path: "/members",
        element: <MembersPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
);
