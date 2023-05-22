import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCart.module.css";

const HeaderCart = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfItems = cartCtx.items.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  return (
    <button onClick={props.onShow} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.label}>Your Cart</span>
      <span className={styles.count}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCart;
