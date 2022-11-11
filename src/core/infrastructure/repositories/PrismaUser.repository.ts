import UserRepository from "../../domain/repositories/User.repository";
import PrismaModelRepository from "./PrismaModel.repository";
import { PrismaClient } from '@prisma/client'
import User from "../../domain/models/User";

export default class PrismaUserRepository extends PrismaModelRepository implements UserRepository
{
    private prisma: PrismaClient;

    public constructor()
    {
        super();
        this.prisma = new PrismaClient()
    }

    public async usernameIsAlreadyRegistered(username: string): Promise<boolean>
    {
        const user = await this.prisma.users.findFirst({
            where: {
                username
            }
        })

        return user !== null;
    }
}