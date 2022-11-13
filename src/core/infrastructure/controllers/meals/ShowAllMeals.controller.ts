import { Request, Response } from "express";

const ShowAllMealsController = (req: Request, res: Response) => {
    res.status(200).json({ data: [] });
}

export default ShowAllMealsController;