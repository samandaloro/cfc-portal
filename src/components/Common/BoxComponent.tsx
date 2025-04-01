import React from "react";
import { Box } from "@mui/material";

interface BoxComponentProps {
    children?: React.ReactNode;
}

const BoxComponent: React.FC<BoxComponentProps> = ({ children }) => {
    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 5,
                padding: 2,
                bgcolor: "#f4f4f4",
                border: "2px solid grey",
                boxShadow: 10,
            }}
        >
            {children}
        </Box>
    );
};

export default BoxComponent;
