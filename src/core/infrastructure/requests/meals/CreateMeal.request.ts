import { checkSchema, Schema } from 'express-validator';

const ChefLoginRequest: Schema = {
    name: {
        notEmpty: true,
        isString: true,
    }
}

export default checkSchema(ChefLoginRequest);