import * as Joi from "joi";

export const CreateDoctorSchema = Joi.object({
    email: Joi.string().email().required(),

    private_id: Joi.string().length(11).required(),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).*$/,
            "password"
        )
        .messages({
            "string.min": "Password must be at least {#limit} characters long",
            "string.max": "Password cannot exceed {#limit} characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        }),

    age: Joi.number().min(18).required(),

    gender: Joi.boolean().required(),

    experience_in_years: Joi.number().min(1).required(),

    price_in_dollars: Joi.number().required(),

    specialty: Joi.string().required(),

    city: Joi.string().required()
});
