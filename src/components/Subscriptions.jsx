import React, { useState, useEffect, useContext, useCallback } from "react";
import User from "./User.jsx";
import { themeConstants } from "./constants.js";
import { UserContext } from "../providers/UserProvider.jsx";
import { getUserDocument, firestore } from "../firestore.js";
import { collectIdsAndDocs } from "../utilities.js";

function Subscriptions({ match: { params } }) {
  const user = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserProfile = useCallback(() => {
    if (user.uid === params.uid) {
      return Promise.resolve(user);
    } else {
      return getUserDocument(params.uid)
        .get()
        .then(snap => snap.data());
    }
  }, [params.uid, user]);

  useEffect(() => {
    getUserProfile()
      .then(user => user[params.mode])
      .then(uids => uids.map(uid => firestore.doc(`users/${uid}`).get()))
      .then(proms =>
        proms.map(prom =>
          prom
            .then(snap => ({ uid: snap.id, ...snap.data() }))
            .then(user => {
              setUsers(users => [...users, user]);
              if (!loading) setLoading(false);
            })
        )
      );
  }, [getUserProfile, params.mode, setLoading, loading]);
  return (
    <div className="layout mt_m">
      {loading ? (
        users.map(user => (
          <div
            key={user.uid}
            className="flex-wrapper flex-wrapper_row-reverse profile profile_border"
          >
            <User theme={themeConstants.SUBSCRIPTIONS} user={user} />
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Subscriptions;
