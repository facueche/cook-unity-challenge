export default class MealAlreadyRatedException extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}