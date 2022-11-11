import { checkSchema, Schema } from 'express-validator';

const CustomerRegisterRequest: Schema = {
    username: {
        notEmpty: true,
        isString: true,
    },
    password: {
        notEmpty: true,
        isString: true,
    }
}

export default checkSchema(CustomerRegisterRequest);