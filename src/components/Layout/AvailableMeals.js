import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setIsloading(true);
    async function fetchData() {
      const response = await fetch(
        "https://react-http-9eaad-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsloading(false);
    }
    fetchData().catch((error) => {
      setIsloading(false);
      console.log(error.message);
      setError(error.message);
    });
  }, []);

  if (isloading) {
    return (
      <section className={classes.loading}>
        <p>loading</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.loading}>
        <p>{error}</p>
      </section>
    );
  }
  const mealList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}
