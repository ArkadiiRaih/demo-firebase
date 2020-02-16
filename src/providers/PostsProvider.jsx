import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firestore";
import { collectIdsAndDocs } from "../utilities";

export const PostsContext = createContext([]);

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsibscribeFromFirestore = firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot(snapshot => {
        const apiPosts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(apiPosts);
      });
    return unsibscribeFromFirestore;
  }, []);
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
}

export default PostsProvider;
