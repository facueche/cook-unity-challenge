export default class InvalidAuthTokenException extends Error
{
    constructor(msg: string) {
        super(msg);
    }
}