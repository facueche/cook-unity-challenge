import { Request, Response } from "express";
import EventManager from "../../../../common/events/Event.manager";
import CreateMealService from "../../../application/meals/CreateMeal.service";
import MealRepository from "../../../domain/repositories/Meal.repository";
import PrismaMealRepository from "../../repositories/PrismaMeal.repository";
import Auth from "./types/Auth";
import CreateMeal from "./types/CreateMeal";

const CreateMealController = async (req: Request, res: Response) => {
    const { name, user }: CreateMeal & Auth = req.body;
    const repository: MealRepository = new PrismaMealRepository();
    const createMealService: CreateMealService = new CreateMealService(name, user, repository);

    await createMealService.handle();

    EventManager.commitAll();
    
    res.status(201).json({ message: "Meal created" });
}

export default CreateMealController;