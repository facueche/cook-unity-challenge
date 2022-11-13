import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";
import Prisma from "../singletons/Prisma";
import PrismaModelRepository from "./PrismaModel.repository";
import { PrismaClient } from '@prisma/client'

export default class PrismaMealRepository extends PrismaModelRepository implements MealRepository
{
    private prisma: PrismaClient;

    public constructor()
    {
        super();
        this.prisma = Prisma.getInstance().getClient();
    }

    public async fetchByChef(chef: User): Promise<Meal[]>
    {
        const meals = await this.prisma.$queryRaw`
            SELECT "Meals"."uuid", "Meals"."name", "Meals"."chefId", COALESCE(FLOOR(AVG("Rates"."rate")), 0) AS rateAverage
            FROM "Meals"
            LEFT JOIN "Rates" ON "Meals"."uuid" = "Rates"."mealId"
            WHERE "Meals"."chefId" = ${chef.getUuid()}
            GROUP BY "Meals"."uuid"
        `;

        return (meals as Array<any>).map(mealData => {
            const meal = Meal.make(mealData.uuid, mealData.name, chef);
            meal.withAverageRate(mealData.rateaverage);
            return meal;
        })
    }
}