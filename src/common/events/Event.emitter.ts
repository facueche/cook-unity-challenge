import { EventEmitter2 } from "eventemitter2";

export default class EventEmitter
{
    private static eventEmitter: EventEmitter2;
    private constructor() {};

    public static getInstance(): EventEmitter2
    {
        if (!this.eventEmitter) {
            this.eventEmitter = new EventEmitter2();
        }
        return this.eventEmitter;
    }
}