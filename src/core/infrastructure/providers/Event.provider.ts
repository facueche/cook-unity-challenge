import EventEmitter from "../../../common/events/Event.emitter";
import UserRegistered from "../../domain/events/UserRegistered";
import StoreUser from "../listeners/StoreUser";

export default class EventProvider
{
    private events = {
        [UserRegistered.eventName]: [
            StoreUser.handle
        ]
    }

    public constructor()
    {
        for (const eventName in this.events) {
            this.events[eventName].forEach((eventHandler) => {
                EventEmitter.getInstance().on(eventName, eventHandler);
            })
        }
    }
}