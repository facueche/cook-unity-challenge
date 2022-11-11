export default class UsernameAlreadyRegisteredException extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}