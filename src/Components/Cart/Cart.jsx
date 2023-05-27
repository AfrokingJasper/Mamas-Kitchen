import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import OrderDetails from "./OrderDetails";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const itemInCart = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles["cart-summary"]}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={styles["cart-button"]}>
        <button className={styles["close-btn"]} onClick={props.onClose}>
          Close
        </button>
        {itemInCart && <button>Order</button>}
      </div>
      <OrderDetails />
    </Modal>
  );
};

export default Cart;
