import React from "react";

function Avatar({ size, photoURL, wrapper }) {
  return wrapper ? (
    <div className={`avatar avatar_${size}`}>
      <img className="user__avatar" src={photoURL} alt="avatar" />
    </div>
  ) : (
    <img className={`user__avatar_${size}`} src={photoURL} alt="avatar" />
  );
}

export default Avatar;
