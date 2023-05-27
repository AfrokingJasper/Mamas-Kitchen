import React from "react";
import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  return (
    <form className={styles["order-form"]}>
      <div className={styles.details}>
        <label htmlFor="name">Your Full Name</label>
        <input type="text" id="name" />
      </div>
      <div className={styles.details}>
        <label htmlFor="email">Your Email Adress</label>
        <input type="text" id="email" />
      </div>
      <div className={styles.details}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={styles.details}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.cancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default OrderDetails;
