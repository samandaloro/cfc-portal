import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikMUITextField from "../../Common/FormikMUITextField";
import Button from "@mui/material/Button";
import "../AuthStyle.css"
import { Typography, Alert } from "@mui/material";
import InfoAlertComponent from "../../Common/InfoAlertComponent";

interface SignupValues {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    job_title: string;
    organization: string;
    password: string;
    password_confirm: string;
}

const initialValues: SignupValues = {
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    organization: "",
    username: "",
    password: "",
    password_confirm: "",
};

const signup = async (values: SignupValues, setError: (error: string) => void) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/signup", {
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
        console.log("Sign Up successful");
        console.log("Response:",response.json()); 
        setError(""); 
    } catch (error) {
        console.error("Sign Up error:", error);
    }
};

const ValidationSchema = Yup.object({
    username: Yup.string().required("Required"),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    job_title: Yup.string().required("Required"),
    organization: Yup.string().required("Required"),
    password: Yup.string().required("Required").min(8, "Password too short"),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), undefined], "Passwords must match")
});

const SignupForm: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [cantCreateAccountMessage, setCantCreateAccountMessage] = useState<string>("");
    
        const handleCantCreateAccountClick = (e: React.MouseEvent) => {
            e.preventDefault();
            if (cantCreateAccountMessage.length === 0) {
                setCantCreateAccountMessage("We allow accounts for verified Social Workers and Healthcare Providers in our network. If "
                    + " you fall into this category, please email cousinsforcarol@gmail.com to request permission");
            }
            else {
                setCantCreateAccountMessage("");
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
            Create your account {String.fromCodePoint(0x1F680)}
        </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => signup(values, setError)}
                validationSchema={ValidationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="grouped">
                            <div className="field-grouped">
                                <FormikMUITextField 
                                    label="First Name" 
                                    name="first_name" 
                                    type="text"
                                    placeholder="First Name"
                                    required 
                                />
                            </div>
                            <div className="field-grouped">
                                <FormikMUITextField 
                                    label="Last Name" 
                                    name="last_name" 
                                    type="text"
                                    placeholder="Last Name"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <FormikMUITextField 
                                label="Username" 
                                name="username" 
                                type="text"
                                placeholder="First Name"
                                required
                                fullWidth
                            />
                        </div>

                        <div className="field">
                            <FormikMUITextField 
                                label="Email"
                                name="email"
                                placeholder="Email"
                                type="text"
                                required
                                fullWidth
                            />
                        </div>

                        <div className="field">
                            <FormikMUITextField
                                label="Organization/Company"
                                name="organization"
                                placeholder="Organization/Company"
                                type="text"
                                required
                                fullWidth
                            />
                        </div>

                        <div className="field">
                            <FormikMUITextField 
                                label="Job Title"
                                name="job_title"
                                placeholder="(e.g. Social Worker, Health Care Professional, etc.)"
                                type="text"
                                required
                                fullWidth
                            />
                        </div>
                        <div className="grouped">
                            <div className="field-grouped">
                                <FormikMUITextField 
                                    label="Password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="field-grouped">
                                <FormikMUITextField 
                                    label="Confirm Password"
                                    name="password_confirm"
                                    placeholder="Confirm Password"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>
                            Sign Up
                        </Button>

                        <a
                            href="#"
                            style={{ color: "#1e88e5", margin: "20px", display: "inline-block" }}
                            onClick={handleCantCreateAccountClick}
                        >
                            Why can't I create an account?
                        </a>

                        {error && 
                        <Alert severity="error" variant="outlined" sx={{ bgcolor: 'background.paper' }}> 
                            {error} 
                        </Alert>}
                        {cantCreateAccountMessage && 
                            <InfoAlertComponent>
                                {cantCreateAccountMessage}
                            </InfoAlertComponent>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignupForm;
