import { checkSchema, Schema } from 'express-validator';

const RateMealRequest: Schema = {
    rate: {
        notEmpty: true,
        isNumeric: true,
        isInt: true,
    }
}

export default checkSchema(RateMealRequest);