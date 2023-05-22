import React from "react";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  const price = props.price.toFixed(2);

  return (
    <li className={styles.content}>
      <div className={styles["right-content"]}>
        <div className={styles.title}>
          <h3>{props.name}</h3>
        </div>
        <div className={styles["sub-right"]}>
          <span className={styles.amount}>${price}</span>
          <span className={styles.number}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.action}>
        <button>-</button>
        <button>+</button>
      </div>
    </li>
  );
};

export default CartItem;
