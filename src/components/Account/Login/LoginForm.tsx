import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikMUITextField from "../../Common/FormikMUITextField";
import Button from "@mui/material/Button";
import { Typography, Alert } from "@mui/material";
import "../AuthStyle.css";
import InfoAlertComponent from "../../Common/InfoAlertComponent";
import { useAuth } from "../../../context/AuthContext";

interface LoginValues {
    username: string;
    password: string;
}

const initialValues: LoginValues = {
    username: "",
    password: "",
};

const LoginForm: React.FC = () => {
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string>("");
    const { login, error } = useAuth();

    const handleForgotPasswordClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (forgotPasswordMessage.length === 0) {
            setForgotPasswordMessage("Please email us at cousinsforcarol@gmail.com to request a temporary password.");
        }
        else {
            setForgotPasswordMessage("");
        }
    };

    const handleSubmit = async (values: LoginValues) => {
        try {
            await login(values.username, values.password);
        } catch (err) {
            // Error is handled by the auth context
            console.error("Login error:", err);
        }
    };

    return (
        <div>
            <Typography
                variant="h5"
                align="center"
                sx={{
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: 2,
                    marginTop: 2
                }}
            >
                Log in to your account {String.fromCodePoint(0x1F511)}
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={ValidationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="field">
                            <FormikMUITextField
                                label="Username or Email"
                                name="username"
                                type="text"
                                placeholder="Username or Email"
                                required
                                fullWidth
                            />
                        </div>

                        <div className="field">
                            <FormikMUITextField
                                label="Password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                required
                                fullWidth
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>
                            Log In
                        </Button>

                        <a
                            href="#"
                            style={{ color: "#1e88e5", margin: "20px", display: "inline-block" }}
                            onClick={handleForgotPasswordClick}
                        >
                            Forgot Password?
                        </a>

                        {forgotPasswordMessage && 
                            <InfoAlertComponent>
                                {forgotPasswordMessage}
                            </InfoAlertComponent>
                        }
                        {error && 
                            <Alert severity="error" variant="outlined" sx={{ bgcolor: 'background.paper' }}> 
                                {error} 
                            </Alert>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const ValidationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
});

export default LoginForm;
