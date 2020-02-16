import React from "react";
import { UserContext } from "../providers/UserProvider.jsx";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withUser = Component => {
  const WrappedComponent = props => {
    return (
      <UserContext.Consumer>
        {user => <Component currentUser={user} {...props} />}
      </UserContext.Consumer>
    );
  };
  WrappedComponent.displayName = `withUser(${getDisplayName(
    WrappedComponent
  )})`;
  return WrappedComponent;
};

export default withUser;
