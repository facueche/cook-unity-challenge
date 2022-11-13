import Event from "../../../common/events/Event";
import EventPayload from "../../../common/events/types/EventPayload";
import Meal from "../models/Meal";

export default class MealCreated extends Event
{
    public static eventName: string = "meal.created";
    private meal: Meal;

    public constructor(meal: Meal)
    {
        super();
        this.meal = meal;
    }

    public getTopic(): string
    {
        return "meal";
    }

    public getName(): string
    {
        return "meal.created";
    }

    public getPayload(): EventPayload
    {
        return {
            uuid: this.meal.getUuid(),
            name: this.meal.getName(),
            userUuid: this.meal.getChef().getUuid()
        }; 
    }

    public getMeal(): Meal
    {
        return this.meal;
    }
}