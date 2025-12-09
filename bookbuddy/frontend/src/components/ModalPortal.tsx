import React from "react";
import ReactDOM from "react-dom";

type ModalPortalProps = {
  children: React.ReactNode;
};

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  // Guard in case of SSR or non-DOM environment
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(children, document.body);
};

export default ModalPortal;
