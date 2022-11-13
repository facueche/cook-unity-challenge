import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";

export default class ShowAllMealsService
{
    private customer: User;
    private mealRepository: MealRepository;

    public constructor(customer: User, mealRepository: MealRepository)
    {
        this.customer = customer;
        this.mealRepository = mealRepository;
    }

    public async handle(): Promise<Meal[]>
    {
        return this.mealRepository.fetchAllWithRegisteredRateVerification(this.customer);
    }
}