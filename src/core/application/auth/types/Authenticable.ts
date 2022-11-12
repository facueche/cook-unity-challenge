import Role from "../../../domain/models/Role";

type Authenticable = {
    uuid: string,
    username: string,
    role: string,
}

export default Authenticable;