import React from 'react';
import { Field, getIn } from 'formik';
import TextField from '@mui/material/TextField';

interface FormikMUITextFieldProps {
    label: string;
    name: string;
    type?: string;
    [x: string]: any;
}

const FormikMUITextField: React.FC<FormikMUITextFieldProps> = ({ label, name, type = 'text', ...props }) => (
    <div className="field">
        <Field name={name}>
            {({ field, form }: any) => {
                // Use getIn to handle nested field paths
                const fieldError = getIn(form.errors, name);
                const fieldTouched = getIn(form.touched, name);
                
                return (
                    <TextField
                        {...field}
                        label={label}
                        type={type}
                        error={fieldTouched && Boolean(fieldError)}
                        helperText={fieldTouched && fieldError}
                        FormHelperTextProps={{ sx: { minHeight: "20px" } }}
                        {...props}
                    />
                );
            }}
        </Field>
    </div>
);

export default FormikMUITextField;