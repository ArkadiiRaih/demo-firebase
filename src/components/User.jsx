import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar.jsx";
import FollowButtons from "./FollowButtons.jsx";
import UserStats from "./UserStats.jsx";
import { themeConstants } from "./constants.js";

const themes = {
  [themeConstants.POST]: {
    avatar_size: "m",
    avatar_wrapper: false,
    name_size: "m",
    bio: false,
    stats: false
  },
  [themeConstants.PROFILE]: {
    avatar_size: "xl",
    avatar_wrapper: true,
    name_size: "l",
    bio: true,
    stats: true
  },
  [themeConstants.COMMENT]: {
    avatar_size: "s",
    avatar_wrapper: false,
    name_size: "s",
    bio: false,
    stats: false
  },
  [themeConstants.SUBSCRIPTIONS]: {
    avatar_size: "l",
    avatar_wrapper: true,
    name_size: "l",
    stats: true,
    bio: true
  }
};

function User({ user, theme }) {
  const { avatar_size, name_size, avatar_wrapper, stats, bio } = themes[theme];
  return (
    <>
      <Avatar
        size={avatar_size}
        wrapper={avatar_wrapper}
        photoURL={user.photoURL}
      />
      <div className="user__data wrapper">
        <Link to={`/profile/${user.uid}`} className={`user__name_${name_size}`}>
          {user.displayName}
        </Link>
        {bio ? (
          <div className="user__bio">{user.bio ? user.bio : null}</div>
        ) : null}
        {stats ? (
          <UserStats
            followers={user.followers}
            following={user.following}
            uid={user.uid}
          >
            <FollowButtons uid={user.uid} />
          </UserStats>
        ) : (
          <FollowButtons uid={user.uid} />
        )}
      </div>
    </>
  );
}

export default User;
