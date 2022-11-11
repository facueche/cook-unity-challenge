import { checkSchema, Schema } from 'express-validator';

const ChefLoginRequest: Schema = {
    username: {
        notEmpty: true,
        isString: true,
    },
    password: {
        notEmpty: true,
        isString: true,
    }
}

export default checkSchema(ChefLoginRequest);