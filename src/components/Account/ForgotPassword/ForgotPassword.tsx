import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikMUITextField from "../../Common/FormikMUITextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import "../AuthStyle.css"

interface ForgotPasswordValues {
    email: string
    code: string
    newPassword: string
    newPasswordConfirm: string
}

const initialValues: ForgotPasswordValues = {
    email: "",
    code: "",
    newPassword: "",
    newPasswordConfirm: ""
};

const login = async (values: ForgotPasswordValues, setError: (error: string) => void) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/forgotPassword", {
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
        console.log("Forgot password successful");
        console.log("Response:",response.json());
        setError("");
    } catch (error) {
        console.error("Forgot password error:", error);
    }
};

const ValidationSchema = Yup.object({
    email: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
});

const ForgotPassword: React.FC = () => {
    const [error, setError] = useState<string>("");

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
            Enter your email
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
                                label="Email" 
                                name="email" 
                                type="text"
                                placeholder="Email"
                                required 
                                fullWidth
                            />
                        </div>

                        <div className="field">
                            <FormikMUITextField 
                                label="Code"
                                name="code"
                                placeholder="Code"
                                type="text"
                                required
                                fullWidth
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>
                            Send me a code
                        </Button>
                        {error && <div className="error-message">{error}</div>}
                    </Form>

                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;
