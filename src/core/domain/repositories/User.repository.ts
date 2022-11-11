import ModelRepository from "./Model.repository";

export default interface UserRepository extends ModelRepository
{
    usernameIsAlreadyRegistered(username: string): Promise<boolean>;
}