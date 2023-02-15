import * as Joi from "joi";


export const JoiValidationSchema = Joi.object({
    MYSQL_ROOT_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    PORT_MYSQL: Joi.number().default(5432),
    PORT_SERVER: Joi.number().default(3000),
    MYSQL_HOST: Joi.string().required(),
    EMAIL_HOST: Joi.string().required(),
    EMAIL_PORT: Joi.number().default(587),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),
    EMAIL_FROM: Joi.string().required(),
    URL_FRONT: Joi.string().required(),
    URL_CONFIRMATION: Joi.string().required(),
});
