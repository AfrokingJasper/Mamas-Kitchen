import React, { useRef, useState } from "react";
import styles from "./OrderDetails.module.css";

const isFiveChar = (value) => value.length === 5;
const isEmpty = (value) => value.trim() === "";
const emailValidity = (value) => value.includes("@");
const OrderDetails = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    postal: true,
    city: true,
    street: true,
  });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const postalRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const emailIsValid = emailValidity(enteredEmail);
    const postalIsValid = isFiveChar(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);
    const streetIsValid = !isEmpty(enteredStreet);

    setFormValidity({
      name: nameIsValid,
      email: emailIsValid,
      postal: postalIsValid,
      city: cityIsValid,
      street: streetIsValid,
    });

    const formIsValid =
      nameIsValid &&
      emailIsValid &&
      postalIsValid &&
      cityIsValid &&
      streetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      enteredName,
      enteredEmail,
      enteredCity,
      enteredStreet,
      enteredPostal,
    });
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles["order-form"]}>
      <div className={styles.details}>
        <label htmlFor="name">Your Full Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValidity.name && (
          <p className={styles.error}>Please add your name</p>
        )}
      </div>
      <div className={styles.details}>
        <label htmlFor="email">Your Email Adress</label>
        <input ref={emailInputRef} type="email" id="email" />
        {!formValidity.email && (
          <p className={styles.error}>Please add a valid email</p>
        )}
      </div>
      <div className={styles.location}>
        <div className={styles.city}>
          <label htmlFor="city">City</label>
          <input ref={cityInputRef} type="text" id="city" />
        </div>
        <div className={styles.details}>
          <label htmlFor="street">Street</label>
          <input ref={streetInputRef} type="text" id="street" />
        </div>
      </div>
      {!formValidity.city ||
        (!formValidity.street && (
          <p className={styles.error}>Please add a valid city and street</p>
        ))}
      <div className={styles.details}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formValidity.postal && (
          <p className={styles.error}>Please add a valid postal code</p>
        )}
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.cancel} onClick={props.onClose}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default OrderDetails;
