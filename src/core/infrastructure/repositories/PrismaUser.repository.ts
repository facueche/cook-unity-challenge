import UserRepository from "../../domain/repositories/User.repository";
import PrismaModelRepository from "./PrismaModel.repository";
import { PrismaClient } from '@prisma/client'
import User from "../../domain/models/User";
import UserNotFoundException from "../../domain/exceptions/UserNotFound.exception";
import Role from "../../domain/models/Role";

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

    public async findByUsernameAndPassword(username: string, password: string): Promise<User>
    {
        const user = await this.prisma.users.findFirst({
            where: {
                username,
                password    // This should be comparing the hashes
            }
        });

        if (user === null)
            throw new UserNotFoundException("User not found");

        return User.make(user.uuid, user.username, user.password, user.role as Role);
    }

    public async findeByUuid(uuid: string): Promise<User>
    {
        const user = await this.prisma.users.findFirst({
            where: {
                uuid
            }
        });

        if (user === null)
            throw new UserNotFoundException("User not found");

        return User.make(user.uuid, user.username, user.password, user.role as Role);
    }
}