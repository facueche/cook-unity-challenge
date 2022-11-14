import EventManager from "../../../common/events/Event.manager";
import MealCreated from "../events/MealCreated";
import MealHasBeenRated from "../events/MealHasBeenRated";
import Rate from "./Rate";
import User from "./User";

export default class Meal
{
    private uuid: string = "";
    private name: string = "";
    private chef: User;

    private hasRates: boolean;
    private averageRate?: number;

    private constructor(uuid: string, name: string, chef: User)
    {
        this.assertUuidIsValid(uuid);
        this.assertNameIsValid(name);
        this.chef = chef;

        this.hasRates = false;
    }

    private assertUuidIsValid(uuid: string)
    {
        if (uuid == "" || uuid === undefined)
            throw new Error("Uuid is required");

        this.uuid = uuid;
    }

    private assertNameIsValid(name: string)
    {
        if (name == "" || name === undefined)
            throw new Error("Name is required");

        this.name = name;
    }

    public static register(uuid: string, name: string, chef: User): Meal
    {
        const meal = Meal.make(uuid, name, chef);

        EventManager.dispatch(new MealCreated(meal));

        return meal;
    }

    public static make(uuid: string, name: string, chef: User): Meal
    {
        return new Meal(uuid, name, chef);
    }

    public addRate(rate: Rate)
    {
        EventManager.dispatch(new MealHasBeenRated(this, rate));
    }

    public getUuid(): string
    {
        return this.uuid;
    }

    public getName(): string
    {
        return this.name;
    }

    public getChef(): User
    {
        return this.chef;
    }

    public withAverageRate(averageRate: number)
    {
        this.averageRate = averageRate;
    }

    public getAverageRate(): number | undefined
    {
        return this.averageRate;
    }

    public assertHasRates()
    {
        this.hasRates = true;
    }
}