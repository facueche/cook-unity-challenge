import Event from "../../../common/events/Event";
import EventPayload from "../../../common/events/types/EventPayload";
import User from "../models/User";

export default class UserRegistered extends Event
{
    public static eventName: string = "user.registered";
    private user: User;

    public constructor(user: User)
    {
        super();
        this.user = user;
    }

    public getTopic(): string
    {
        return "auth";
    }

    public getName(): string
    {
        return "user.registered";
    }

    public getPayload(): EventPayload
    {
        return {
            uuid: this.user.getUuid(),
            username: this.user.getUsername(),
            role: this.user.getRole()
        }
    }

    public getUser(): User
    {
        return this.user;
    }
}