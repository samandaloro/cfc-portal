import React from "react";
import { Grid } from "@mui/material";
import AuthForm from "../Account/AuthForm";
import CFC from './CFC';

const HomePage: React.FC = () => {
  return (
    <Grid 
        container 
        marginTop="10%"
        >

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CFC />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
        
          justifyContent: "center",
        }}
      >
          <AuthForm />
      </Grid>
    </Grid>
  );
};

export default HomePage;
