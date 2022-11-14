import EventEmitter from "../../../common/events/Event.emitter";
import MealCreated from "../../domain/events/MealCreated";
import MealHasBeenRated from "../../domain/events/MealHasBeenRated";
import UserRegistered from "../../domain/events/UserRegistered";
import RateMeal from "../listeners/RateMeal";
import StoreMeal from "../listeners/StoreMeal";
import StoreUser from "../listeners/StoreUser";

export default class EventProvider
{
    private events = {
        [UserRegistered.eventName]: [
            StoreUser.handle,
        ],
        [MealCreated.eventName]: [
            StoreMeal.handle,
        ],
        [MealHasBeenRated.eventName]: [
            RateMeal.handle,
        ],
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