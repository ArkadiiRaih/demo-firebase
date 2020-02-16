import React from "react";
import { Link } from "react-router-dom";

function UserStats({ children, followers, following }) {
  return (
    <div className="user__stats">
      <Link to="/followers">Followers: {followers.length}</Link>
      <Link to="/following">Folowing: {following.length}</Link>
      {children}
    </div>
  );
}

export default UserStats;
