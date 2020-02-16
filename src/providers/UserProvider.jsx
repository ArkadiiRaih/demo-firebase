import React, { createContext, useState, useEffect } from "react";

import { auth, createUserProfileDocument } from "../firestore";

export const UserContext = createContext({ user: null });

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setUser({ uid: snapshot.id, ...snapshot.data() });
        });
      }
      setUser(userAuth);
    });
    // do subscribe to firestore
    return unsubscribeFromAuth;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
