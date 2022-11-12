import { Request, Response } from "express";
import CustomerLoginService from "../../../application/auth/CustomerLogin.service";
import UserNotFoundException from "../../../domain/exceptions/UserNotFound.exception";
import UserRepository from "../../../domain/repositories/User.repository";
import PrismaUserRepository from "../../repositories/PrismaUser.repository";
import CustomerLogin from "./types/CustomerLogin";

const CustomerLoginController = async (req: Request, res: Response) => {
    try {
        const { username, password }: CustomerLogin = req.body;
        const repository: UserRepository = new PrismaUserRepository();
        const chefLoginService: CustomerLoginService = new CustomerLoginService(username, password, repository);
        
        const token: string = await chefLoginService.handle();
    
        const response = { token };
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof UserNotFoundException) {
            const response = { error: (error as UserNotFoundException).message };
            res.status(404).json(response);
        }
    }
};

export default CustomerLoginController;