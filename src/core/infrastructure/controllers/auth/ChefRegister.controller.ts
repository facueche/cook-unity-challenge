import { Request, Response } from "express";
import EventManager from "../../../../common/events/Event.manager";
import ChefRegisterService from "../../../application/auth/ChefRegister.service";
import UserRepository from "../../../domain/repositories/User.repository";
import PrismaUserRepository from "../../repositories/PrismaUser.repository";
import ChefRegister from "./types/ChefRegister";

const ChefRegisterController = async (req: Request, res: Response) => {
    const { username, password }: ChefRegister = req.body;
    const repository: UserRepository = new PrismaUserRepository();
    const chefRegisterService: ChefRegisterService = new ChefRegisterService(username, password, repository);

    chefRegisterService.handle();

    EventManager.commitAll();

    const response = {
        message: "Successfully registered",
    };
    res.status(201).json(response);
};

export default ChefRegisterController;