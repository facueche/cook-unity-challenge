import { PrismaClient } from '@prisma/client';

export default class Prisma
{
    private static prisma: Prisma | null = null;
    private prismaClient: PrismaClient;

    private constructor()
    {
        this.prismaClient = new PrismaClient();
    }

    public getClient(): PrismaClient
    {
        return this.prismaClient;
    }

    public static getInstance(): Prisma
    {
        if (this.prisma === null)
            this.prisma = new Prisma();
        return this.prisma;
    }
}