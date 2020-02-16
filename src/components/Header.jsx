import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import Modal from "./Modal.jsx";
import { UserContext } from "../providers/UserProvider.jsx";
import { debounce } from "../utilities.js";
import { signOut } from "../firestore.js";

function Header() {
  const user = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setSticky(!sticky);
      }
      if (window.scrollY < 20) {
        setSticky(!sticky);
      }
    };
    window.addEventListener("scroll", debounce(handleScroll)());
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        ref={headerRef}
        className={`header ${sticky ? "header_sticky" : ""}`}
      >
        <div className="header__layout">
          <Link to="/" className="logo">
            Logo
          </Link>
          <nav className="nav">
            {user ? (
              <>
                <Link to="/create_post" className="nav__link">
                  New Post
                </Link>
                <Link to={`/profile/${user.uid}`} className="nav__link">
                  {user.displayName}
                </Link>
                <button className="nav__link" onClick={signOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <button className="nav__link" onClick={toggleModal}>
                Log in
              </button>
            )}
          </nav>
        </div>
      </header>
      {showModal ? (
        <Modal theme="form">
          <div className="modal__header">
            <button className="modal__close" onClick={toggleModal}>
              &times;
            </button>
            <h2 className="form__title">Sign in</h2>
          </div>
          <SignIn />
          <SignUp />
        </Modal>
      ) : null}
    </>
  );
}

export default Header;
