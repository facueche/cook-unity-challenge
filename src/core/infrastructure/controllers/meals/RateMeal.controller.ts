import { Request, Response } from "express"

const RateMealController = (req: Request, res: Response) => {
    res.status(201).json({ message: "Rate registered" });
}

export default RateMealController;