import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import BoxComponent from "../Common/BoxComponent";

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Header Text */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 700,
          color: "#333",
          marginBottom: 4,
          marginTop: 4,
        }}
      >
        I would like to...
      </Typography>

      {/* Grid Container */}
      <Grid
        container
        spacing={20}
        justifyContent="center"
        alignItems="stretch"
      >
        {/* Create a Request */}
        <Grid item xs={12} sm={6} md={3}>
          <BoxComponent>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 600,
                color: "#333",
                marginBottom: 2,
                marginTop: 2,
              }}
            >
              Create A Request
            </Typography>
            <Typography variant="h4" align="center">
              {String.fromCodePoint(0x1F4DD)}
            </Typography>
          </BoxComponent>
        </Grid>

        {/* View Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <BoxComponent>
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: 600,
                color: "#333",
                marginBottom: 2,
                marginTop: 2,
              }}
            >
              View Requests 
            </Typography>
            <Typography variant="h4" align="center">
              {String.fromCodePoint(0x1F5C4)}
            </Typography>
          </BoxComponent>
        </Grid>

        {/* Manage Site */}
        <Grid item xs={12} sm={6} md={3}>
          <BoxComponent>
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: 600,
                color: "#333",
                marginBottom: 2,
                marginTop: 2,
              }}
            >
              Manage Site 
            </Typography>
            <Typography variant="h4" align="center">
              {String.fromCodePoint(0x1F6E0)}
            </Typography>
          </BoxComponent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
