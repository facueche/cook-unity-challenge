import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";
import UserRepository from "../../domain/repositories/User.repository";

export default class ShowAllMealsService
{
    private customer: User;
    private mealRepository: MealRepository;
    private chef?: User;

    public constructor(customer: User, mealRepository: MealRepository)
    {
        this.customer = customer;
        this.mealRepository = mealRepository;
    }

    public async withChef(chefUuid: string, userRepository: UserRepository)
    {
        this.chef = await userRepository.findByUuid(chefUuid);
    }

    public async handle(): Promise<Meal[]>
    {
        let meals: Meal[];
        
        if (typeof this.chef == "undefined")
            meals = await this.mealRepository.fetchAllWithRegisteredRateVerification(this.customer);
        else
            meals = await this.mealRepository.fetchAllWithRegisteredRateVerificationByChef(this.customer, this.chef)

        return meals;
    }
}