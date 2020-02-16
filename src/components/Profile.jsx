import React, { useState, useEffect } from "react";
import { getUserDocument, firestore } from "../firestore.js";
import User from "./User.jsx";
import Post from "./Post.jsx";
import { themeConstants } from "./constants.js";
import Loader from "./Loader.jsx";
import { collectIdsAndDocs } from "../utilities.js";

function Profile({ match: { params } }) {
  const [loadingUser, setLoadingUser] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userProfileRef = getUserDocument(params.uid);
    const unsubscribeFromUserProfile = userProfileRef.onSnapshot(snapshot => {
      setUserProfile({ uid: snapshot.id, ...snapshot.data() });
      setLoadingUser(false);
    });
    return unsubscribeFromUserProfile;
  }, [params.uid]);

  useEffect(() => {
    const postsRef = firestore
      .collection("posts")
      .where("user.uid", "==", params.uid)
      .limit(10);

    postsRef
      .get()
      .then(snaps => {
        const apiPosts = [];
        snaps.forEach(doc => apiPosts.push(collectIdsAndDocs(doc)));
        return apiPosts;
      })
      .then(posts => setPosts(posts));
  }, [params.uid]);

  return (
    <div className="flex-wrapper_column flex-wrapper_height_100vh">
      <main className="layout mt_m flex-s_justify-center layout_fill-s">
        <div className="flex-wrapper flex-wrapper_row-reverse profile">
          {loadingUser ? (
            <Loader />
          ) : (
            <User user={userProfile} theme="profile" />
          )}
        </div>
      </main>
      <div className="gray_wrapper flex-wrapper__rest">
        <div className="list layout">
          <h2 className="list__title">Posts</h2>
          {!posts ? (
            <Loader />
          ) : (
            posts.map(post => (
              <Post key={post.id} post={post} theme={themeConstants.PROFILE} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
