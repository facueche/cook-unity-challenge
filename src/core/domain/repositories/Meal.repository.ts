import Meal from "../models/Meal";
import User from "../models/User";
import ModelRepository from "./Model.repository";

export default interface MealRepository extends ModelRepository
{
    fetchByChefWithRateAverage(chef: User): Promise<Meal[]>;
    fetchAllWithRegisteredRateVerification(customer: User): Promise<Meal[]>;
    fetchAllWithRegisteredRateVerificationByChef(customer: User, chef: User): Promise<Meal[]>;
    findByUuid(uuid: string): Promise<Meal>;
    customerAlreadyRatedMeal(customer: User, meal: Meal): Promise<boolean>;
}