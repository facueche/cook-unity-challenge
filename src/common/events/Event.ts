import EventPayload from "./types/EventPayload";

export default abstract class Event
{
    private occurredAt: Date;

    protected constructor()
    {
        this.occurredAt = new Date();
    }

    public abstract getTopic(): string;
    public abstract getName(): string;
    public abstract getPayload(): EventPayload;

    public getOccurredAt(): Date
    {
        return this.occurredAt;
    }
}