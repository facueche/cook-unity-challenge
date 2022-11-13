import MealCreated from "../../domain/events/MealCreated";
import { PrismaClient } from '@prisma/client';
import Prisma from "../singletons/Prisma";
import Meal from "../../domain/models/Meal";

export default class StoreMeal
{
    public static async handle(event: MealCreated)
    {
        const prisma: PrismaClient = Prisma.getInstance().getClient();
        const meal: Meal = event.getMeal();

        await prisma.meals.create({
            data: {
                uuid: meal.getUuid(),
                name: meal.getName(),
                chef: {
                    connect: {
                        uuid: meal.getChef().getUuid()
                    }
                }
            }
        })
    }
}