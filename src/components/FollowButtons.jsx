import React, { useEffect, useState } from "react";
import withUser from "./withUser.jsx";
import { belongsToCurrentUser } from "../utilities.js";
import { getUserDocument } from "../firestore.js";
import { firestore } from "firebase";

function FollowButtons({ currentUser, uid }) {
  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const getFollowing = () => currentUser.following || [];

    setFollowing(getFollowing().includes(uid));
  }, [currentUser, setFollowing, isFollowing, uid]);

  const handleFollow = () => {
    const userRef = getUserDocument(currentUser.uid);
    if (isFollowing) {
      userRef.update({
        following: firestore.FieldValue.arrayRemove(uid)
      });
    } else {
      userRef.update({
        following: firestore.FieldValue.arrayUnion(uid)
      });
    }
  };

  return (
    <>
      {currentUser && !belongsToCurrentUser(currentUser, { uid }) ? (
        isFollowing ? (
          <button className="button_following" onClick={handleFollow}>
            following
          </button>
        ) : (
          <button className="button_follow" onClick={handleFollow}>
            follow
          </button>
        )
      ) : null}
    </>
  );
}

export default withUser(FollowButtons);
