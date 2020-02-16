import React from "react";
import { Link } from "react-router-dom";

function UserStats({ children, followers, following, uid }) {
  return (
    <div className="user__stats">
      <Link to={`/subscriptions/followers/${uid}`}>
        Followers: {followers.length}
      </Link>
      <Link to={`/subscriptions/following/${uid}`}>
        Folowing: {following.length}
      </Link>
      {children}
    </div>
  );
}

export default UserStats;
