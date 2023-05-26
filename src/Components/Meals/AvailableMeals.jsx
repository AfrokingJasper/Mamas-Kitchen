import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://firewars-api-test-default-rtdb.firebaseio.com/food-order-app.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const foodData = await response.json();
      const loadedData = [];

      for (const keys in foodData) {
        loadedData.push({
          id: keys,
          name: foodData[keys].name,
          description: foodData[keys].description,
          price: foodData[keys].price,
        });
      }
      setMeals(loadedData);
      setLoading(false);
    };

    fetchMeals().catch((err) => {
      setErrorMessage(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className={styles.loadingState}>
        <p>LOADING...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className={styles.loadingState}>
        <p>{errorMessage}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      id={meal.id}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={styles.meals}>
      {!loading && (
        <Card>
          <ul>{mealList}</ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
