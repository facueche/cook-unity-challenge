import { Request } from "express";
import User from "../../domain/models/User";

export default interface WithAuthRequest extends Request
{
    user: User;
}