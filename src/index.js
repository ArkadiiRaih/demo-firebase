import React from "react";
import { render } from "react-dom";

import "./sass/all.scss";

import App from "./components/App.jsx";
import UserProvider from "./providers/UserProvider.jsx";

import { BrowserRouter as Router } from "react-router-dom";
import PostsProvider from "./providers/PostsProvider.jsx";

render(
  <Router>
    <UserProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
