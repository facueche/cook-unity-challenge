import { Request, Response } from "express";

const CustomerLoginController = async (req: Request, res: Response) => {
    const body: CustomerLogin = req.body;
    const response = {
        token: "token"
    };
    res.status(200).json(response);
};

export default CustomerLoginController;