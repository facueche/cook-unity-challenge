import Event from "../../../common/events/Event";
import EventPayload from "../../../common/events/types/EventPayload";
import Meal from "../models/Meal";
import Rate from "../models/Rate";

export default class MealHasBeenRated extends Event
{
    public static eventName: string = "meal.rated";
    private meal: Meal;
    private rate: Rate;

    public constructor(meal: Meal, rate: Rate)
    {
        super();
        this.meal = meal;
        this.rate = rate;
    }

    public getTopic(): string
    {
        return "meal";
    }

    public getName(): string
    {
        return "meal.rated";
    }

    public getPayload(): EventPayload
    {
        return {
            uuid: this.rate.getUuid(),
            rate: this.rate.getRate(),
            customerUuid: this.rate.getCustomer().getUuid(),
            mealUuid: this.meal.getUuid(),
        }; 
    }

    public getMeal(): Meal
    {
        return this.meal;
    }

    public getRate(): Rate
    {
        return this.rate;
    }
}