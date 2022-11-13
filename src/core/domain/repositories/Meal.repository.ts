import Meal from "../models/Meal";
import User from "../models/User";
import ModelRepository from "./Model.repository";

export default interface MealRepository extends ModelRepository
{
    fetchByChefWithRateAverage(chef: User): Promise<Meal[]>;
    fetchAllWithRegisteredRateVerification(customer: User): Promise<Meal[]>;
}