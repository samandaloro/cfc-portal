import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import BackButton from '../Common/BackButton';
import BoxComponent from "../Common/BoxComponent";
import FormikMUITextField from '../Common/FormikMUITextField';
import * as Yup from "yup";
import { Formik, Form } from "formik";

const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
  "WI", "WY"];

const MARITAL_STATUSES = [
  "Single", "Married", "Divorced", "Widowed", "Separated", "Other"
];

const TREATMENT_CENTERS = [
  "Hospital A", "Hospital B", "Clinic C", "Center D", "Other"
]

const BILL_TYPES = [
  "Rent", "Utilities", "Insurance", "Medical", "Other"
]

interface Applicant {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  state: string;
  zip_code: string;
  marital_status: string;
  cancer_type: string;
  date_diagnosed: string;
  treatment_location: string;
  doctor_name: string;
  doctor_phone: string;
  household: {
    members: Array<{
      first_name: string;
      last_name: string;
    }>;
  };
  total_supporting_income: number;
}

interface Bill {
  type: string;
  amount_requested: number;
  company_name: string;
  company_street_address_1: string;
  company_street_address_2: string;
  company_city: string;
  company_state: string;
  company_zip_code: string;
  due_date: string;
  attachment: File;
}

interface CreateRequestValues {
  applicant: Applicant;
  bills: Bill[];
  statement_of_need: string;
}

const initialValues: CreateRequestValues = {
  applicant: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    state: "",
    zip_code: "",
    marital_status: "",
    cancer_type: "",
    date_diagnosed: "",
    treatment_location: "",
    doctor_name: "",
    doctor_phone: "",
    household: { members: [] },
    total_supporting_income: 0,
  },
  bills: [],
  statement_of_need: "",
};


const ValidationSchema = Yup.object({
  applicant: Yup.object({
    first_name: Yup.string().required("Required").max(50, "Must be 50 characters or less"),
    last_name: Yup.string().required("Required").max(50, "Must be 50 characters or less"),
    email: Yup.string().email("Invalid email format").required("Required").max(100, "Must be 100 characters or less"),
    phone: Yup.string().required("Required").matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    street_address_1: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
    street_address_2: Yup.string().max(100, "Must be 100 characters or less"),
    city: Yup.string().required("Required").max(50, "Must be 50 characters or less"),
    state: Yup.string().required("Required").max(2, "Must be exactly 2 characters").matches(/^[A-Z]{2}$/, "State must be 2 uppercase letters"),
    zip_code: Yup.string().required("Required").matches(/^\d{5}$/, "Zip code must be 5 digits"),
    marital_status: Yup.string().required("Required").oneOf(MARITAL_STATUSES, "Invalid marital status"),
    cancer_type: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
    date_diagnosed: Yup.string().required("Required").matches(
      /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/,
      "Date must be in MM-DD-YYYY format"
    ),
    treatment_location: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
    doctor_name: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
    doctor_phone: Yup.string().required("Required").matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    household: Yup.object({
      members: Yup.array().of(
        Yup.object({
          name: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
        })
      )
    }),
    total_supporting_income: Yup.number().min(0, "Must be a positive number")
    .max(1000000000, "Income is too high").required("Required"),
  }),
  bills: Yup.array().of(
    Yup.object({
      type: Yup.string().required("Required").oneOf(BILL_TYPES, "Invalid bill type"),
      amount_requested: Yup.number().positive("Must be a positive number")
        .max(500, "Amount cannot exceed $500").required("Required"),
      company_name: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
      company_street_address_1: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
      company_street_address_2: Yup.string().max(100, "Must be 100 characters or less"),
      company_city: Yup.string().required("Required").max(50, "Must be 50 characters or less"),
      company_state: Yup.string().required("Required").oneOf(STATES, "Invalid state"),
      company_zip_code: Yup.string().required("Required").matches(/^\d{5}$/, "Zip code must be 5 digits"),
      due_date: Yup.string().required("Required").matches(
        /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/,
        "Due date must be in MM-DD-YYYY format"
      ),
      attachment: Yup.mixed().required("Required").test("fileSize", "File size must be less than 10MB", (value) => {
        if (!value) return true; // Allow empty file
        return value instanceof File && value.size <= 10 * 1024 * 1024; // 10MB limit
      }
      ).test("fileType", "Unsupported file format", (value) => {
        if (!value) return true; // Allow empty file
        const supportedFormats = ["image/jpeg","image/jpg", "image/png", "application/pdf"];
        return value instanceof File && supportedFormats.includes(value.type);
      }
      )
    })
  ),
  statement_of_need: Yup.string()
    .min(100, "Statement of need must be at least 100 characters")
    .max(1000, "Statement of need must be no more than 1000 characters")
    .required("Required"),
});

const submitRequest = async (values: CreateRequestValues) => {
  console.log(values);
}

const CreateRequest: React.FC = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BackButton />
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          background: 'transparent', 
          mb: 4, 
          borderRadius: 2 
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 1 
          }}
        >
          Create New Request
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Submit a new request for assistance
        </Typography>
        
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitRequest(values)}
          validationSchema={ValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Container maxWidth="sm">
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    mt: 3
                  }}
                >
                  {String.fromCodePoint(0x1F464)} Applicant Information
                </Typography>
                <BoxComponent>
                  <div className="grouped">
                    <div className="field-grouped">
                      <FormikMUITextField 
                        label="First Name" 
                        name="applicant.first_name" 
                        type="text"
                        placeholder="First Name"
                        required
                        fullWidth
                      />
                    </div>
                    <div className="field-grouped">
                      <FormikMUITextField
                        label="Last Name" 
                        name="applicant.last_name" 
                        type="text"
                        placeholder="Last Name"
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="field">
                    <FormikMUITextField 
                      label="Email"
                      name="applicant.email"
                      placeholder="Email Address"
                      type="email"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="field">
                    <FormikMUITextField 
                      label="Phone"
                      name="applicant.phone"
                      placeholder="Phone Number"
                      type="tel"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="field">
                    <FormikMUITextField 
                      label="Street Address"
                      name="applicant.street_address_1"
                      placeholder="Street Address"
                      type="text"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="field">
                    <FormikMUITextField 
                      label="Street Address 2"
                      name="applicant.street_address_2"
                      placeholder="Apartment, Suite, Unit, etc. (Optional)"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="grouped">
                    <div className="field-grouped">
                      <FormikMUITextField 
                        label="City"
                        name="applicant.city"
                        placeholder="City"
                        type="text"
                        required
                        fullWidth
                      />
                    </div>
                    <div className="field-grouped">
                      <FormikMUITextField 
                        label="State"
                        name="applicant.state"
                        placeholder="State"
                        type="text"
                        required
                        fullWidth
                      />
                    </div>
                    <div className="field-grouped">
                      <FormikMUITextField 
                        label="Zip Code"
                        name="applicant.zip_code"
                        placeholder="Zip Code"
                        type="text"
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                </BoxComponent>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    mt: 3
                  }}
                >
                  {String.fromCodePoint(0x1F3E0)} Household
                </Typography>
                <BoxComponent>
                <div className="field">
                    <FormikMUITextField 
                      label="Marital Status"
                      name="applicant.marital_status"
                      placeholder="Marital Status"
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="field">
                    <FormikMUITextField 
                      label="Total Supporting Income"
                      name="applicant.total_supporting_income"
                      placeholder="Total Supporting Income"
                      type="number"
                      fullWidth
                    />
                  </div>
                </BoxComponent>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    mt: 3
                  }}
                >
                  {String.fromCodePoint(0x1F3E5)} Treatment
                </Typography>
                <BoxComponent>
                <div className="grouped">
                <div className="field-grouped">
                    <FormikMUITextField 
                      label="Cancer Diagnosis"
                      name="applicant.cancer_type"
                      placeholder="Cancer Diagnosis"
                      type="text"
                      fullWidth
                    />
                </div>
                <div className="field-grouped">
                    <FormikMUITextField 
                      label="Date Diagnosed"
                      name="applicant.date_diagnosed"
                      placeholder="mm-dd-yyyy"
                      type="string"
                      fullWidth
                    />
                </div>
                </div>
                <div className="field">
                    <FormikMUITextField 
                      label="Treatment Location"
                      name="applicant.treatment_location"
                      placeholder="Treatment Location"
                      type="text"
                      fullWidth
                    />
                </div>
                <div className="grouped">
                <div className="field-grouped">
                    <FormikMUITextField 
                      label="Doctor Name"
                      name="applicant.doctor_name"
                      placeholder="Doctor Name"
                      type="text"
                      fullWidth
                    />
                </div>
                <div className="field-grouped">
                    <FormikMUITextField 
                      label="Doctor Phone"
                      name="applicant.doctor_phone"
                      placeholder="Doctor Phone"
                      type="text"
                      fullWidth
                    />
                </div>
                </div>
                </BoxComponent>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    mt: 3
                  }}
                >
                  {String.fromCodePoint(0x1F9FE)} Requested Aid
                </Typography>
                <BoxComponent>
                  {/* Bills section would go here */}
                </BoxComponent>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    mt: 3
                  }}
                >
                  {String.fromCodePoint(0x270D)} Statement of Need
                </Typography>
                <BoxComponent>
                  <div className="field">
                    <FormikMUITextField 
                      label="Statement of Need"
                      name="statement_of_need"
                      placeholder="Please describe your need for assistance (100-1000 characters)"
                      type="text"
                      multiline
                      rows={6}
                      required
                      fullWidth
                    />
                  </div>
                </BoxComponent>
              </Container>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default CreateRequest;