import React from "react";

interface InfoAlertComponentProps {
    children?: React.ReactNode;
}

const InfoAlertComponent: React.FC<InfoAlertComponentProps> = ({ children }) => {
    return (
        <div className="info-message" style={{ 
            backgroundColor: "#e3f2fd",
            color: "#1e88e5",
            textAlign: "center",
            border: "1px solid #64b5f6",
            borderRadius: "5px",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "5px"
            }}>
            {children}
        </div>
    );
};

export default InfoAlertComponent;
