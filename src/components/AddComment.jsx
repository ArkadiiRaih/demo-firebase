import React, { useState } from "react";
import withUser from "./withUser.jsx";
import User from "./User.jsx";
import { themeConstants } from "./constants.js";

function AddComment({ currentUser, commentsRef }) {
  const [comment, setComment] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.content.length == 0) return;
    commentsRef.add({ content: comment, user: currentUser });
    setComment("");
  };

  if (!currentUser) {
    return <h1>loading...</h1>;
  }
  return (
    <form className="comment" onSubmit={handleSubmit}>
      <div className="comment__header user">
        <User user={currentUser} theme={themeConstants.COMMENT} />
      </div>
      <div className="comment__body">
        <textarea
          className="form__input_fill post__content mb_s"
          name="content"
          placeholder="Your comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="comment__footer">
        <button type="submit" className="button_fill">
          Publish comment
        </button>
      </div>
    </form>
  );
}

export default withUser(AddComment);
