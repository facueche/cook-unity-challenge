import { Request, Response } from "express";

const CustomerRegisterController = async (req: Request, res: Response) => {
    const response = {
        message: "Successfully registered"
    };
    res.status(201).json(response);
}

export default CustomerRegisterController;