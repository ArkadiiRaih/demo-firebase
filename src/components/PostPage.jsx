import React, { useState, useEffect } from "react";
import Post from "./Post.jsx";
import { firestore } from "../firestore";
import { collectIdsAndDocs } from "../utilities";
import Comments from "./Comments.jsx";
import AddComment from "./AddComment.jsx";
import { useParams } from "react-router";
import Loader from "./Loader.jsx";

function PostPage() {
  const [post, setPost] = useState(null);
  const [isLoadingPost, setLoadingPost] = useState(true);

  const { postId } = useParams();
  const postRef = (() => firestore.doc(`/posts/${postId}`))();

  useEffect(() => {
    const unsubscribeFromPost = postRef.onSnapshot(snapshot => {
      const post = collectIdsAndDocs(snapshot);
      setPost(post);
      setLoadingPost(false);
    });

    return unsubscribeFromPost;
  }, [postRef]);

  return (
    <div className="flex-wrapper_column flex-wrapper_height_100vh">
      <main className="layout mt_m">
        {isLoadingPost ? <Loader /> : <Post post={post} theme="main" />}
      </main>
      <div className="gray_wrapper flex-wrapper__rest">
        <Comments postRef={postRef}>
          {commentsRef => <AddComment commentsRef={commentsRef} />}
        </Comments>
      </div>
    </div>
  );
}

export default PostPage;
