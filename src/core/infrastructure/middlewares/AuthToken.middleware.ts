import { NextFunction, Request, Response } from "express";
import WithTokenRequest from "../requests/WithToken.reques";

const AuthTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader: string | undefined = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        
        const request: WithTokenRequest = req as WithTokenRequest;
        request.token = bearerToken;

        next();
    } else {
        res.status(401).json({ message: "Unauthenticated" });
    }
}

export default AuthTokenMiddleware;