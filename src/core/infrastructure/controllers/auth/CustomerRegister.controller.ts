import { Request, Response } from "express";
import CustomerRegister from "./types/CustomerRegister";

const CustomerRegisterController = async (req: Request, res: Response) => {
    const body: CustomerRegister = req.body;
    const response = {
        message: "Successfully registered"
    };
    res.status(201).json(response);
}

export default CustomerRegisterController;