import useHttp from "../hooks/use-http";

import MealItem from "./item";
import Error from "../error";

import { MEALS_BASE_API_URL } from "../../constants/api-endpoints";

const CONFIG_OBJ = {}; //this is just to show the importance of extracting out objects from component, you can omit as well

const MealsList = () => {
  const {
    data: meals,
    error,
    isLoading,
  } = useHttp(MEALS_BASE_API_URL, CONFIG_OBJ, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  if (meals.length === 0) return null;

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} {...meal} />
      ))}
    </ul>
  );
};

export default MealsList;
