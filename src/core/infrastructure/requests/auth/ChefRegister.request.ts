import { checkSchema, Schema } from 'express-validator';

const ChefRegisterRequest: Schema = {
    username: {
        notEmpty: true,
        isString: true,
    },
    password: {
        notEmpty: true,
        isString: true,
    }
}

export default checkSchema(ChefRegisterRequest);