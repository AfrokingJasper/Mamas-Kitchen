import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCart.module.css";

const HeaderCart = (props) => {
  const [btnIsActive, setBntIsActive] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfItems = cartCtx.items.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsActive ? styles.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBntIsActive(true);

    const timer = setTimeout(() => {
      setBntIsActive(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button onClick={props.onShow} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.label}>Your Cart</span>
      <span className={styles.count}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCart;
