import { Request, Response } from "express";
import ChefLogin from "./types/ChefLogin";

const ChefLoginController = async (req: Request, res: Response) => {
    const body: ChefLogin = req.body;
    const response = {
        token: "token"
    };
    res.status(200).json(response);
};

export default ChefLoginController;