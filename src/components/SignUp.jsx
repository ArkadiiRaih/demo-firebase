import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../firestore";
import { withRouter } from "react-router";

function SignOut(props) {
  const [authData, setAuthData] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password, displayName } = authData;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      setAuthData({ displayName: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = e => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="form modal__body"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <label className="form__label" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        type="text"
        name="displayName"
        placeholder="name"
        value={authData.name}
      />
      <label className="form__label" htmlFor="email">
        Name
      </label>
      <input
        className="form__input"
        type="text"
        name="email"
        placeholder="email"
        value={authData.email}
      />
      <label className="form__label" htmlFor="password">
        Password{" "}
      </label>
      <input
        className="form__input"
        type="password"
        name="password"
        placeholder="password"
        value={authData.password}
      />
      <button name="submitBtn" className="button form__submit" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignOut;
