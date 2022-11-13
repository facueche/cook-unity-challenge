import { Request, Response } from "express";

const ShowChefMealsController = (req: Request, res: Response) => {
    res.status(200).json({ data: [] });
}

export default ShowChefMealsController;