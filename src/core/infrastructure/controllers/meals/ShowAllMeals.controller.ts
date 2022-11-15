import { Request, Response } from "express";
import ShowAllMealsService from "../../../application/meals/ShowAllMeals.service";
import Meal from "../../../domain/models/Meal";
import MealRepository from "../../../domain/repositories/Meal.repository";
import UserRepository from "../../../domain/repositories/User.repository";
import PrismaMealRepository from "../../repositories/PrismaMeal.repository";
import PrismaUserRepository from "../../repositories/PrismaUser.repository";
import Auth from "./types/Auth";

type Query = {
    chefUuid?: string,
};

const ShowAllMealsController = async (req: Request, res: Response) => {
    const { user }: Auth = req.body;
    const { chefUuid }: Query = req.query as Query;
    const mealRepository: MealRepository = new PrismaMealRepository();
    const showAllMealsService: ShowAllMealsService = new ShowAllMealsService(user, mealRepository);

    if (typeof chefUuid != "undefined") {
        const userRepository: UserRepository = new PrismaUserRepository();
        await showAllMealsService.withChef(chefUuid, userRepository);
    }

    const meals: Meal[] = await showAllMealsService.handle();

    const response = meals.map((meal: Meal) => ({
        uuid: meal.getUuid(),
        meal: meal.getName(),
        chefName: meal.getChef().getUsername(),
        alreadyRated: meal.alreadyHasRates(),
    }));

    res.status(200).json({ data: response });
}

export default ShowAllMealsController;