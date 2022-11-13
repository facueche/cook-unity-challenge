import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";
import Prisma from "../singletons/Prisma";
import PrismaModelRepository from "./PrismaModel.repository";
import { PrismaClient } from '@prisma/client'
import UserRepository from "../../domain/repositories/User.repository";
import PrismaUserRepository from "./PrismaUser.repository";
import Role from "../../domain/models/Role";

export default class PrismaMealRepository extends PrismaModelRepository implements MealRepository
{
    private prisma: PrismaClient;

    public constructor()
    {
        super();
        this.prisma = Prisma.getInstance().getClient();
    }

    public async fetchByChefWithRateAverage(chef: User): Promise<Meal[]>
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
        });
    }

    public async fetchAllWithRegisteredRateVerification(customer: User): Promise<Meal[]>
    {
        const meals: Array<any> = await this.prisma.$queryRaw`
            SELECT "Meals"."uuid", "Meals"."name", "Meals"."chefId", "Users"."username" AS chef_username, "Users"."password" AS chef_password, "Users"."role" AS chef_role, (
                SELECT COUNT("Rates"."uuid")
                FROM "Rates"
                WHERE "Rates"."customerId" = ${customer.getUuid()}
                AND "Rates"."mealId" = "Meals"."uuid"
            ) AS votes
            FROM "Meals"
            INNER JOIN "Users" ON "Meals"."chefId" = "Users"."uuid"
        `;

        return (meals as Array<any>).map(mealData => {
            const chef: User = User.make(mealData.chefId, mealData.chef_username, mealData.chef_password, mealData.chef_role as Role);
            const meal: Meal = Meal.make(mealData.uuid, mealData.name, chef);
            const hasRates: boolean = mealData.votes > 0;
            if (hasRates)
                meal.assertHasRates();
            return meal;
        });
    }
}