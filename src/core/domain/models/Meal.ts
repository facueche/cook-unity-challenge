import User from "./User";

export default class Meal
{
    private uuid: string = "";
    private name: string = "";
    private chef: User;

    private constructor(uuid: string, name: string, chef: User)
    {
        this.assertUuidIsValid(uuid);
        this.assertNameIsValid(name);
        this.chef = chef;
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
        const meal = new Meal(uuid, name, chef);
        return meal;
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
}