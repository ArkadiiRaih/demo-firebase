import React, { useState } from "react";
import { signInWithGoogle, signInWithEmailAndPassword } from "../firestore";

function SignIn() {
  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = authData;
    if (!email || !password) return;

    signInWithEmailAndPassword(email, password);
    setAuthData({ email: "", password: "" });
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
        Email
      </label>
      <input
        className="form__input"
        type="email"
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
      <div style={{ alignSelf: "center" }}>
        <button name="submitBtn" className="button form__submit" type="submit">
          Sign In
        </button>
        <button className="button form__submit" onClick={signInWithGoogle}>
          g
        </button>
      </div>
    </form>
  );
}

export default SignIn;
