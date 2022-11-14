export default class MealNotFoundException extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}