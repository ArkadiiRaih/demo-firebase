import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, theme = "" }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    div.classList.add(
      "modal__content",
      theme == "form" ? ("modal__content_auth", "form__wrapper") : ""
    );
    elRef.current = div;
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.classList.add("modal_opened");
    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
      modalRoot.classList.remove("modal_opened");
    };
  }, []);
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
