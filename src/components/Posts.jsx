import React, { useContext } from "react";
import Post from "./Post.jsx";
import { PostsContext } from "../providers/PostsProvider.jsx";

function Posts() {
  const posts = useContext(PostsContext);
  if (!posts) return <div>loading...</div>;
  return (
    <main className="layout mt_m">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

export default Posts;
