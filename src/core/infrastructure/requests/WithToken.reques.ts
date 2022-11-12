import { Request } from "express";

export default interface WithTokenRequest extends Request
{
    token: string;
}