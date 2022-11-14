import { PrismaClient } from '@prisma/client';
import Prisma from "../singletons/Prisma";
import Meal from "../../domain/models/Meal";
import MealHasBeenRated from "../../domain/events/MealHasBeenRated";
import Rate from '../../domain/models/Rate';

export default class RateMeal
{
    public static async handle(event: MealHasBeenRated)
    {
        const prisma: PrismaClient = Prisma.getInstance().getClient();
        const rate: Rate = event.getRate();
        const meal: Meal = event.getMeal();

        await prisma.rates.create({
            data: {
                uuid: rate.getUuid(),
                rate: Number(rate.getRate()),
                customer: {
                    connect: {
                        uuid: rate.getCustomer().getUuid(),
                    }
                },
                meal: {
                    connect: {
                        uuid: meal.getUuid(),
                    }
                }
            }
        })
    }
}