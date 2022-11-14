import User from "./User";

export default class Rate
{
    private uuid: string = "";
    private customer: User;
    private rate: number = 0;

    private constructor(uuid: string, customer: User, rate: number)
    {
        this.assertUuidIsValid(uuid);
        this.assertRateIsValid(rate);
        this.customer = customer;
    }

    private assertUuidIsValid(uuid: string)
    {
        if (uuid == "" || uuid === undefined)
            throw new Error("Uuid is required");

        this.uuid = uuid;
    }

    private assertRateIsValid(rate: number)
    {
        if (isNaN(rate) || rate < 1 || rate >5)
            throw new Error("Rate is invalid");

        this.rate = rate;
    }

    public static make(uuid: string, customer: User, rate: number): Rate
    {
        return new Rate(uuid, customer, rate);
    }

    public getUuid(): string
    {
        return this.uuid;
    }

    public getCustomer(): User
    {
        return this.customer;
    }

    public getRate(): number
    {
        return this.rate;
    }
}