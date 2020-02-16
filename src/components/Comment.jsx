import React from "react";
import User from "./User.jsx";

function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment__header">
        <div className="user">
          <User user={comment.user} theme="comment" />
        </div>
      </div>
      <div className="comment__body">{comment.content}</div>
    </div>
  );
}

export default Comment;
