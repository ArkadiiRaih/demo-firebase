import React, { useContext } from "react";
import Post from "./Post.jsx";
import { PostsContext } from "../providers/PostsProvider.jsx";
import Loader from "./Loader.jsx";

function Posts() {
  const posts = useContext(PostsContext);
  if (!posts) return <Loader />;
  return (
    <main className="layout mt_m">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

export default Posts;
