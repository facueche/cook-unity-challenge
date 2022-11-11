import Role from "../../domain/models/Role";
import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/User.repository";

export default class ChefRegisterService
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

    public handle(): User
    {
        const uuid = this.repository.generateUuid();
        const role = Role.CHEF;

        return User.register(uuid, this.username, this.password, role);
    }
}