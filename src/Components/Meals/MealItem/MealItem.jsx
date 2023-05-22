import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={styles["item-container"]}>
      <div>
        <p className={styles["item-name"]}>{props.name}</p>
        <em>{props.description}</em>
        <p className={styles["item-price"]}>{price}</p>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
