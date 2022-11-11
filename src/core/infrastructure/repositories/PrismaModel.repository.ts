import ModelRepository from "../../domain/repositories/Model.repository";
import { v4 as uuidv4 } from 'uuid';

export default class PrismaModelRepository implements ModelRepository
{
    public generateUuid(): string {
        return uuidv4();
    }
}