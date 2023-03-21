import * as Yup from "yup"

export const signUpSchema = Yup.object().shape({
    name: Yup.string().min(3).max(25).required("Required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    username: Yup.string().min(5).required("Required"),
    password: Yup.string().min(8).required("Required")
});