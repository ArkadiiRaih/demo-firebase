import React from "react";
import { Link } from "react-router-dom";
import User from "./User.jsx";
import { themeConstants } from "./constants";

const themes = {
  [themeConstants.POST]: {
    showUser: true,
    showStats: true
  },
  [themeConstants.MAIN]: {
    showUser: true,
    showStats: false
  },
  [themeConstants.PROFILE]: {
    showUser: false,
    showStats: true
  }
};

function Post({ post, theme = themeConstants.POST }) {
  const { showUser, showStats } = themes[theme];
  return (
    <div className="post">
      <div className="post__header user">
        {showUser ? (
          <User theme={themeConstants.POST} user={post.user} />
        ) : null}
      </div>
      <Link to={`/post/${post.id}`} className="post__body">
        <p className="post__title">{post.title}</p>
        <div className="post__content">{post.content}</div>
      </Link>
      <div className="post__footer">
        <ul className="tags">
          {post.tags &&
            post.tags.map(tag => (
              <li key={tag} className="tags__item">
                {tag}
              </li>
            ))}
        </ul>
        {showStats ? (
          <div className="post__stats">
            <span>
              <i className="far fa-comments"></i>
              Comments: {post.comments}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Post;
