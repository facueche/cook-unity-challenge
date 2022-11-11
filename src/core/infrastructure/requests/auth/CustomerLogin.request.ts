import { checkSchema, Schema } from 'express-validator';

const CustomerLoginRequest: Schema = {
    username: {
        notEmpty: true,
        isString: true,
    },
    password: {
        notEmpty: true,
        isString: true,
    }
}

export default checkSchema(CustomerLoginRequest);