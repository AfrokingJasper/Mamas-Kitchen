import React from "react";
import styles from "./Header.module.css";
import HeaderCart from "./HeaderCart";
import IMG from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h2>Mama's-Kitchen.</h2>
        <HeaderCart onShow={props.onShowCart} />
      </header>

      <div className={styles["main-image"]}>
        <img src={IMG} alt="A Table full of delicious meals" />
      </div>
    </React.Fragment>
  );
};

export default Header;
