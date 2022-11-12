export default class UserNotFoundException extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}