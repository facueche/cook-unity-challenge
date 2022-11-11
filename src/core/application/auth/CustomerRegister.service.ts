import UsernameAlreadyRegisteredException from "../../domain/exceptions/UsernameAlreadyRegistered.exception";
import Role from "../../domain/models/Role";
import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/User.repository";

export default class CustomerRegisterService
{
    private username: string;
    private password: string;
    private repository: UserRepository;

    public constructor(username: string, password: string, repository: UserRepository)
    {
        this.username = username;
        this.password = password;
        this.repository = repository;
    }

    public async handle(): Promise<User>
    {
        if (await this.repository.usernameIsAlreadyRegistered(this.username))
            throw new UsernameAlreadyRegisteredException("Username already exists");

        const uuid = this.repository.generateUuid();
        const role = Role.CUSTOMER;

        return User.register(uuid, this.username, this.password, role);
    }
}