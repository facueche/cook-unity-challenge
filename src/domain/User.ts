import Role from "./Role";

export default class User
{
    private uuid: string = "";
    private username: string = "";
    private password: string = "";
    private role: Role;

    private constructor(uuid: string, username: string, password: string, role: Role)
    {
        this.assertUuidIsValid(uuid);
        this.assertUsernameIsValid(username);
        this.assertPasswordIsValid(password);
        this.role = role;
    }

    private assertUuidIsValid(uuid: string)
    {
        if (uuid == "" || uuid === undefined)
            throw new Error("Uuid is required");

        this.uuid = uuid;
    }

    private assertUsernameIsValid(username: string)
    {
        if (username == "" || username === undefined)
            throw new Error("Username is required");

        this.username = username;
    }

    private assertPasswordIsValid(password: string)
    {
        if (password == "" || password === undefined)
            throw new Error("Password is required");

        this.password = password;
    }

    public static register(uuid: string, username: string, password: string, role: Role): User
    {
        return new User(uuid, username, password,role);
    }

    public getUuid(): string
    {
        return this.uuid;
    }

    public getUsername(): string
    {
        return this.username;
    }

    public getRole(): Role
    {
        return this.role;
    }
}