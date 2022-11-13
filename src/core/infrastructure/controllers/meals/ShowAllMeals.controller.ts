import { Request, Response } from "express";
import ShowAllMealsService from "../../../application/meals/ShowAllMeals.service";
import Meal from "../../../domain/models/Meal";
import MealRepository from "../../../domain/repositories/Meal.repository";
import PrismaMealRepository from "../../repositories/PrismaMeal.repository";
import Auth from "./types/Auth";

const ShowAllMealsController = async (req: Request, res: Response) => {
    const { user }: Auth = req.body;
    const repository: MealRepository = new PrismaMealRepository();
    const showAllMealsService: ShowAllMealsService = new ShowAllMealsService(user, repository);

    const meals: Meal[] = await showAllMealsService.handle();

    res.status(200).json({ data: meals });
}

export default ShowAllMealsController;