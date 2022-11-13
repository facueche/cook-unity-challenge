import jwt from "jsonwebtoken";
import User from "../../domain/models/User";
import Authenticable from "./types/Authenticable";

export default class AuthService
{
    public constructor () {}

    public attemptToLogin(user: User): string
    {
        const auth: Authenticable = {
            uuid: user.getUuid(),
            username: user.getUsername(),
            role: user.getRole(),
        }

        const token: string = jwt.sign(auth, "privateKey");
        return token;
    }
}