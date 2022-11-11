import UserRepository from "../../domain/repositories/User.repository";
import PrismaModelRepository from "./PrismaModel.repository";

export default class PrismaUserRepository extends PrismaModelRepository implements UserRepository
{
    //
}