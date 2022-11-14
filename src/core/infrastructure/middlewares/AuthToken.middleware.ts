import { NextFunction, Request, Response } from "express";
import VerifyAuthTokenService from "../../application/auth/VerifyAuthToken.service";
import InvalidAuthTokenException from "../../domain/exceptions/InvalidAuthToken.exception";
import UserNotFoundException from "../../domain/exceptions/UserNotFound.exception";
import UserRepository from "../../domain/repositories/User.repository";
import PrismaUserRepository from "../repositories/PrismaUser.repository";

const AuthTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerHeader: string | undefined = req.headers["authorization"];
    
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            
            const userRepository: UserRepository = new PrismaUserRepository();
            const verifyToken: VerifyAuthTokenService = new VerifyAuthTokenService(bearerToken, userRepository);

            const user = await verifyToken.handle();
    
            req.body = { ...req.body, user }
    
            next();
        } else {
            res.status(401).json({ message: "Unauthenticated" });
        }
    } catch (error) {
        if (error instanceof InvalidAuthTokenException) {
            res.status(401).json({ message: (error as InvalidAuthTokenException).message });
        } else if (error instanceof UserNotFoundException) {
            res.status(404).json({ message: (error as UserNotFoundException).message });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default AuthTokenMiddleware;