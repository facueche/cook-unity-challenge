import { Request, Response } from "express";
import ShowChefMealsService from "../../../application/meals/ShowChefMeals.service";
import Meal from "../../../domain/models/Meal";
import MealRepository from "../../../domain/repositories/Meal.repository";
import PrismaMealRepository from "../../repositories/PrismaMeal.repository";
import Auth from "./types/Auth";

const ShowChefMealsController = async (req: Request, res: Response) => {
    const { user }: Auth = req.body;
    const repository: MealRepository = new PrismaMealRepository();
    const showChefMealsService: ShowChefMealsService = new ShowChefMealsService(user, repository);

    const meals: Meal[] = await showChefMealsService.handle();
    console.log("HEREEEE", meals);

    res.status(200).json({ data: meals });
}

export default ShowChefMealsController;