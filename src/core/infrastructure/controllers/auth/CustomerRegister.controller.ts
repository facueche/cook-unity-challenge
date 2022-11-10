import { Request, Response } from "express";

const CustomerRegisterController = async (req: Request, res: Response) => {
    const response = {
        message: "message"
    };
    res.status(201).json(response);
}

export default CustomerRegisterController;