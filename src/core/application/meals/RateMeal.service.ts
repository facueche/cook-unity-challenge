import MealAlreadyRatedException from "../../domain/exceptions/MealAlreadyRated.exception";
import Meal from "../../domain/models/Meal";
import Rate from "../../domain/models/Rate";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";
import ModelRepository from "../../domain/repositories/Model.repository";

export default class RateMealService
{
    private mealUuid: string;
    private customer: User;
    private rate: number;
    private mealRepository: MealRepository;

    public constructor(mealUuid: string, customer: User, rate: number, mealRepository: MealRepository)
    {
        this.mealUuid = mealUuid;
        this.customer = customer;
        this.rate = rate;
        this.mealRepository = mealRepository;
    }

    public async handle()
    {
        const meal: Meal = await this.mealRepository.findByUuid(this.mealUuid);

        if (await this.mealRepository.customerAlreadyRatedMeal(this.customer, meal))
            throw new MealAlreadyRatedException("Meal already rated");
            
        const rateUuid: string = (this.mealRepository as ModelRepository).generateUuid();
        const rate: Rate = Rate.make(rateUuid, this.customer, this.rate);

        meal.addRate(rate);
    }
}