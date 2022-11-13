import User from "../models/User";
import ModelRepository from "./Model.repository";

export default interface UserRepository extends ModelRepository
{
    usernameIsAlreadyRegistered(username: string): Promise<boolean>;
    findByUsernameAndPassword(username: string, password: string): Promise<User>;
    findeByUuid(uuid: string): Promise<User>;
}