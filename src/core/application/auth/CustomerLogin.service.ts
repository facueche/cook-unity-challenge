import UserNotFoundException from "../../domain/exceptions/UserNotFound.exception";
import Role from "../../domain/models/Role";
import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/User.repository";
import AuthService from "./Auth.service";

export default class CustomerLoginService extends AuthService
{
    private username: string;
    private password: string;
    private repository: UserRepository;

    public constructor(username: string, password: string, repository: UserRepository)
    {
        super();
        this.username = username;
        this.password = password;
        this.repository = repository;
    }

    public async handle(): Promise<string>
    {
        const user: User = await this.repository.findByUsernameAndPassword(this.username, this.password);

        if (user.getRole() !== Role.CUSTOMER)
            throw new UserNotFoundException("User not found");

        return this.attemptToLogin(user);
    }
}