import React from 'react';
import { Field } from 'formik';
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
            {({ field, form }: any) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    error={form.touched[name] && Boolean(form.errors[name])}
                    helperText={form.touched[name] && form.errors[name]}
                    FormHelperTextProps={{ sx: { minHeight: "20px" } }}
                    {...props}
                />
            )}
        </Field>
    </div>
);

export default FormikMUITextField;
