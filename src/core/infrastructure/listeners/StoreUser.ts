import UserRegistered from "../../domain/events/UserRegistered";
import { PrismaClient } from '@prisma/client';
import User from "../../domain/models/User";

export default class StoreUser
{
    public static async handle(event: UserRegistered)
    {
        const prisma = new PrismaClient();
        const user: User = event.getUser();

        await prisma.users.create({
            data: {
                uuid: user.getUuid(),
                username: user.getUsername(),
                password: user.getPassword(),   // This should be hashed
                role: user.getRole(),
            }
        });
    }
}