import Authenticable from "./types/Authenticable";
import jwt from 'jsonwebtoken';
import UserRepository from "../../domain/repositories/User.repository";
import User from "../../domain/models/User";
import InvalidAuthTokenException from "../../domain/exceptions/InvalidAuthToken.exception";
import UserNotFoundException from "../../domain/exceptions/UserNotFound.exception";

export default class VerifyAuthTokenService
{
    private token: string;
    private userRepository: UserRepository;

    public constructor(token: string, userRepository: UserRepository)
    {
        this.token = token;
        this.userRepository = userRepository;
    }

    public async handle(): Promise<User>
    {
        try {
            const authUser: Authenticable = jwt.verify(this.token, "privateKey") as Authenticable;
            return await this.userRepository.findByUuid(authUser.uuid);
        } catch (error) {
            if (error instanceof UserNotFoundException)
                throw error;
                
            throw new InvalidAuthTokenException("Invalid token");
        }
    }
}