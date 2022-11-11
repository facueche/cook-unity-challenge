import { Request, Response } from "express";
import EventManager from "../../../../common/events/Event.manager";
import CustomerRegisterService from "../../../application/auth/CustomerRegister.service";
import UsernameAlreadyRegisteredException from "../../../domain/exceptions/UsernameAlreadyRegistered.exception";
import UserRepository from "../../../domain/repositories/User.repository";
import PrismaUserRepository from "../../repositories/PrismaUser.repository";
import CustomerRegister from "./types/CustomerRegister";

const CustomerRegisterController = async (req: Request, res: Response) => {
    try {
        const { username, password }: CustomerRegister = req.body;
        const repository: UserRepository = new PrismaUserRepository();
        const customerRegisterService: CustomerRegisterService = new CustomerRegisterService(username, password, repository);
    
        await customerRegisterService.handle();
    
        EventManager.commitAll();
    
        const response = {
            message: "Successfully registered"
        };
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof UsernameAlreadyRegisteredException) {
            const response = {
                error: (error as UsernameAlreadyRegisteredException).message,
            };
            res.status(409).json(response);
        }
    }
}

export default CustomerRegisterController;