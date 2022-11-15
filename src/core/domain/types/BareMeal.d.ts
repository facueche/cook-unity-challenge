type BareMeal = {
    meal_id: string,
    chef_name: string,
    meal: string,
};

type withRating = {
    rating: number,
};

type WithAverageRate = {
    average_rating: number,
};

export type BareMealWithRating = BareMeal & withRating;
export type BareMealWithAverageRating = BareMeal & WithAverageRate;