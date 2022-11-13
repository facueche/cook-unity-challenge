import { NextFunction, Request, Response } from "express";
import VerifyAuthTokenService from "../../application/auth/VerifyAuthToken.service";
import InvalidAuthTokenException from "../../domain/exceptions/InvalidAuthToken.exception";
import UserRepository from "../../domain/repositories/User.repository";
import PrismaUserRepository from "../repositories/PrismaUser.repository";
import WithAuthRequest from "../requests/WithAuth.request";

const AuthTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerHeader: string | undefined = req.headers["authorization"];
    
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            
            const userRepository: UserRepository = new PrismaUserRepository();
            const verifyToken: VerifyAuthTokenService = new VerifyAuthTokenService(bearerToken, userRepository);

            const user = await verifyToken.handle();
    
            const request: WithAuthRequest = req as WithAuthRequest;
            request.user = user;
    
            next();
        } else {
            res.status(401).json({ message: "Unauthenticated" });
        }
    } catch (error) {
        if (error instanceof InvalidAuthTokenException) {
            res.status(401).json({ message: "Unauthenticated" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default AuthTokenMiddleware;