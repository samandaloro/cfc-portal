import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikMUITextField from "../../Common/FormikMUITextField";
import Button from "@mui/material/Button";
import { Typography, Alert } from "@mui/material";
import "../AuthStyle.css";
import InfoAlertComponent from "../../Common/InfoAlertComponent";

interface LoginValues {
    username: string;
    password: string;
}

const initialValues: LoginValues = {
    username: "",
    password: "",
};

const login = async (values: LoginValues, setError: (error: string) => void) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const responseData = await response.json();
            const errorMessage = responseData.message;
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        console.log("Login successful");
        console.log("Response:", response.json());
        setError("");
    } catch (error) {
        console.error("Login error:", error);
    }
};

const ValidationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
});

const LoginForm: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string>("");

    const handleForgotPasswordClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (forgotPasswordMessage.length === 0) {
            setForgotPasswordMessage("Please email us at cousinsforcarol@gmail.com to request a temporary password.");
        }
        else {
            setForgotPasswordMessage("");
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
                onSubmit={(values) => login(values, setError)}
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

export default LoginForm;
