import { Request, Response } from "express"
import EventManager from "../../../../common/events/Event.manager";
import RateMealService from "../../../application/meals/RateMeal.service";
import MealAlreadyRatedException from "../../../domain/exceptions/MealAlreadyRated.exception";
import MealNotFoundException from "../../../domain/exceptions/MealNotFound.exception";
import MealRepository from "../../../domain/repositories/Meal.repository";
import PrismaMealRepository from "../../repositories/PrismaMeal.repository";
import Auth from "./types/Auth";
import RateMeal from "./types/RateMeal";

type Params = {
    uuid: string,
};

const RateMealController = async (req: Request, res: Response) => {
    try {
        const { rate, user }: RateMeal & Auth = req.body;
        const { uuid }: Params = req.params as Params;
        const mealRepository: MealRepository = new PrismaMealRepository();
        const rateMealService: RateMealService = new RateMealService(uuid, user, rate, mealRepository);
    
        await rateMealService.handle();

        EventManager.commitAll();
    
        res.status(201).json({ message: "Rate registered" });
    } catch (error) {
        if (error instanceof MealNotFoundException)
            res.status(404).json({ error: (error as MealNotFoundException).message });
        else if (error instanceof MealAlreadyRatedException)
            res.status(409).json({ error: (error as MealAlreadyRatedException).message });
        else
            res.status(400).json({ error: (error as Error).message });
    }
}

export default RateMealController;