import { Request, NextFunction, Response } from "express";
import Role from "../../domain/models/Role";
import WithAuthRequest from "../requests/WithAuth.request";

const RoleMiddleware = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { user }: WithAuthRequest = req.body;
        if (user.getRole().valueOf() !== role.valueOf())
            res.status(403).json({ error: "Unauthorized" });
        else {
            next();
        }
    }
}

export default RoleMiddleware;