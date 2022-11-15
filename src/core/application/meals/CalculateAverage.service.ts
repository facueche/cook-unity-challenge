import { BareMealWithRating, BareMealWithAverageRating } from "../../domain/types/BareMeal";

type MealsGruoped = {
    [mealName: string]: BareMealWithRating[]
}

export default class CalculateAverageService
{
    private meals: BareMealWithRating[];
    private chefName: string;

    public constructor(meals: BareMealWithRating[], chefName: string)
    {
        this.meals = meals;
        this.chefName = chefName;
    }

    public handle(): BareMealWithAverageRating[]
    {
        const chefMeals: BareMealWithRating[] = this.meals.filter((meal: BareMealWithRating) => meal.chef_name === this.chefName);
        const mealsGrouped: MealsGruoped = this.groupBy(chefMeals, "meal");
        const mealsAveragedRating: BareMealWithAverageRating[] = this.averageMealsRate(mealsGrouped);

        return mealsAveragedRating;
    }

    private groupBy(meals: BareMealWithRating[], key: string): MealsGruoped
    {
        return meals.reduce((prev: MealsGruoped, curr: BareMealWithRating) => {
            return {
                ...prev,
                [curr[key as keyof BareMealWithRating]]: [
                    ...(prev[curr[key as keyof BareMealWithRating]] || []),
                    curr,
                ]
            }    
        }, {})
    }

    private averageMealsRate(mealsGrouped: MealsGruoped): BareMealWithAverageRating[]
    {
        let averagedMeals: BareMealWithAverageRating[] = [];

        let mealName: keyof typeof mealsGrouped;
        for (mealName in mealsGrouped) {
            const group: BareMealWithRating[] = mealsGrouped[mealName];
            const firstMeal = group[0];    // At least it has one
            const averageRating: number = Math.floor(group.map((meal: BareMealWithRating) => meal.rating).reduce((prev: number, curr: number) => prev + curr, 0) / group.length);
            
            averagedMeals.push({
                meal_id: firstMeal.meal_id,
                chef_name: firstMeal.chef_name,
                meal: firstMeal.meal,
                average_rating: averageRating,
            })
        }

        return averagedMeals;
    }
}