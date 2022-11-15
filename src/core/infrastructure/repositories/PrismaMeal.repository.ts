import Meal from "../../domain/models/Meal";
import User from "../../domain/models/User";
import MealRepository from "../../domain/repositories/Meal.repository";
import Prisma from "../singletons/Prisma";
import PrismaModelRepository from "./PrismaModel.repository";
import { PrismaClient } from '@prisma/client'
import Role from "../../domain/models/Role";
import MealNotFoundException from "../../domain/exceptions/MealNotFound.exception";
import { BareMealWithAverageRating, BareMealWithRating } from "../../domain/types/BareMeal";
import CalculateAverageService from "../../application/meals/CalculateAverage.service";

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
        // THE TASK

        let meals: BareMealWithRating[] = await this.prisma.$queryRaw`
            SELECT
                "Meals"."uuid" AS meal_id,
                "Users"."username" AS chef_name,
                "Meals"."name" AS meal,
                "Rates"."rate" AS rating
            FROM "Rates"
            INNER JOIN "Meals" ON "Rates"."mealId" = "Meals"."uuid"
            INNER JOIN "Users" ON "Meals"."chefId" = "Users"."uuid"
        `;

        const calculateAverageService: CalculateAverageService = new CalculateAverageService(meals, chef.getUsername());
        const averagedMeals: BareMealWithAverageRating[] = calculateAverageService.handle();

        // END THE TASK

        /* const deprecatedMeals = await this.prisma.$queryRaw`
            SELECT "Meals"."uuid", "Meals"."name", "Meals"."chefId", COALESCE(FLOOR(AVG("Rates"."rate")), 0) AS rateAverage
            FROM "Meals"
            LEFT JOIN "Rates" ON "Meals"."uuid" = "Rates"."mealId"
            WHERE "Meals"."chefId" = ${chef.getUuid()}
            GROUP BY "Meals"."uuid"
        `; */

        return (averagedMeals).map(mealData => {
            const meal = Meal.make(mealData.meal_id, mealData.meal, chef);
            meal.withAverageRate(mealData.average_rating);
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

        return this.buildMealsWithRegisteredRateVerification(meals);
    }

    public async fetchAllWithRegisteredRateVerificationByChef(customer: User, chef: User): Promise<Meal[]>
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
            WHERE "Meals"."chefId" = ${chef.getUuid()}
        `;

        return this.buildMealsWithRegisteredRateVerification(meals);
    }

    private buildMealsWithRegisteredRateVerification(meals: Array<any>): Meal[]
    {
        return (meals).map(mealData => {
            const chef: User = User.make(mealData.chefId, mealData.chef_username, mealData.chef_password, mealData.chef_role as Role);
            const meal: Meal = Meal.make(mealData.uuid, mealData.name, chef);
            const hasRates: boolean = mealData.votes > 0;
            if (hasRates)
                meal.assertHasRates();
            return meal;
        });
    }

    public async findByUuid(uuid: string): Promise<Meal>
    {
        const meal = await this.prisma.meals.findFirst({
            where: {
                uuid
            },
            include: {
                chef: true
            }
        });

        if (meal === null)
            throw new MealNotFoundException("Meal not found");

        const chef: User = User.make(meal.chef.uuid, meal.chef.username, meal.chef.password, meal.chef.role as Role);
        return Meal.make(meal.uuid, meal.name, chef);
    }

    public async customerAlreadyRatedMeal(customer: User, meal: Meal): Promise<boolean>
    {
        const rate = await this.prisma.rates.findFirst({
            where: {
                customerId: customer.getUuid(),
                mealId: meal.getUuid(),
            }
        });

        return rate !== null;
    }
}