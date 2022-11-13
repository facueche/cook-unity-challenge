import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";

export default class CreateMealService
{
    private name: string;
    private chef: User;
    private repository: MealRepository;

    public constructor(name: string, chef: User, repository: MealRepository)
    {
        this.name = name;
        this.chef = chef;
        this.repository = repository;
    }

    public async handle(): Promise<Meal>
    {
        const uuid = this.repository.generateUuid();
        return Meal.register(uuid, this.name, this.chef);
    }
}