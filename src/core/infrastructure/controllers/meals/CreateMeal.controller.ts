import { Request, Response } from "express";

const CreateMealController = (req: Request, res: Response) => {
    res.status(201).json({ message: "Meal created" });
}

export default CreateMealController;