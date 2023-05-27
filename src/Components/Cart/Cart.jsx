import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import OrderDetails from "./OrderDetails";

const Cart = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const itemInCart = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartClearHandler = () => {
    cartCtx.clearCart();
  };

  const displayOrderForm = () => {
    setDisplayForm(true);
  };

  const submitHandler = async (userdData) => {
    setIsSubmitting(true);

    await fetch(
      "https://firewars-api-test-default-rtdb.firebaseio.com/order-history.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userdData,
          items: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setIsSubmitted(true);
    cartClearHandler();
  };

  const submitting = <p>Submitting...</p>;
  const submitted = <p>Order Successfully Submitted</p>;

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

  const cartMakrkups = (
    <React.Fragment>
      {cartItems}
      <div className={styles["cart-summary"]}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {!displayForm && (
        <div className={styles["cart-button"]}>
          <button className={styles["close-btn"]} onClick={props.onClose}>
            Close
          </button>
          {itemInCart && <button onClick={displayOrderForm}>Order</button>}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && cartMakrkups}
      {displayForm && !isSubmitting && !isSubmitted && (
        <OrderDetails onConfirm={submitHandler} onClose={props.onClose} />
      )}

      {isSubmitting && submitting}
      {isSubmitted && submitted}
    </Modal>
  );
};

export default Cart;
