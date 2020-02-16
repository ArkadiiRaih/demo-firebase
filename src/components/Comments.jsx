import React, { useState, useEffect } from "react";
import Comment from "./Comment.jsx";
import { collectIdsAndDocs } from "../utilities.js";

function Comments({ postRef, children }) {
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setLoadingComments] = useState(true);

  const commentsRef = (() => postRef.collection("comments"))();

  useEffect(() => {
    const unsubscribeFromComments = commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      setComments(comments);
      setLoadingComments(false);
    });
    return unsubscribeFromComments;
  }, []);

  return (
    <div className="comments layout">
      <p className="comments__title">Comments</p>
      {children(commentsRef)}
      {isLoadingComments ? (
        <p>Loading comments...</p>
      ) : (
        comments.map(comment => <Comment key={comment.id} comment={comment} />)
      )}
    </div>
  );
}

export default Comments;
