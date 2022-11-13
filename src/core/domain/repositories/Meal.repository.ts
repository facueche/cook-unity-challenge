import Meal from "../models/Meal";
import User from "../models/User";
import ModelRepository from "./Model.repository";

export default interface MealRepository extends ModelRepository
{
    fetchByChef(chef: User): Promise<Meal[]>;
}