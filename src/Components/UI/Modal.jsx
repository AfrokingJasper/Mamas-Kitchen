import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={styles.overlay}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
