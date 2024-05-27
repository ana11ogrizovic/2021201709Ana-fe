import * as yup from "yup";

export const loginSchema = yup.object().shape({
    password: yup.string().required().label("Password"),
    email: yup.string().email().required().label("Email"),
}).required();