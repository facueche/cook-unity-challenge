import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";

export default class ShowChefMealsService
{
    private chef: User;
    private repository: MealRepository;

    public constructor(chef: User, repository: MealRepository)
    {
        this.chef = chef;
        this.repository = repository;
    }

    public async handle(): Promise<Meal[]>
    {
        return this.repository.fetchByChefWithRateAverage(this.chef);
    }
}