import Joi, { ObjectSchema } from "joi";

// Define a validation schema for the request body
const createUserSchema = Joi.object().keys({
    firstName: Joi.string().min(1).max(100),
    lastName: Joi.string().min(1).max(100),
    email: Joi.string().email(),
});

  export default createUserSchema;