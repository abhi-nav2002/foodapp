import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState('true');
  const [httpError,setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-45eba-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok)
      {
        throw new Error("Data cannot be fetched !!!");
      }
      const responseData = await response.json();
      const loadMeal = [];
      for (const key in responseData) {
        loadMeal.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadMeal);
      setIsLoading(false);
    };
    fetchMeals().catch(error=> {
      setIsLoading(false);
      setHttpError(error.message)
    });
    
  }, []);
  if(isLoading === 'true')
  {
    return <section className={classes.mealLoading}>
      Loading...
    </section>
  }
  if(httpError)
  {
    return <section className={classes.mealLoadingError}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      id={meal.id}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
