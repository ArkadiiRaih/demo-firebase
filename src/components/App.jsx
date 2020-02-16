import React from "react";
import Header from "./Header.jsx";
import { Switch, Route } from "react-router";
import Posts from "./Posts.jsx";
// import Post from "./Post.jsx";
import Profile from "./Profile.jsx";
import PostPage from "./PostPage.jsx";
import CreatePost from "./CreatePost.jsx";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/post/:postId" component={PostPage} />
        <Route exact path="/create_post/" component={CreatePost} />
        <Route exact path="/profile/:uid" component={Profile} />
        {/* <Route exact path="/" */}
      </Switch>
    </>
  );
}

export default App;
