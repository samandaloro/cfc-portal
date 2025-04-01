import React, { useState } from "react";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import { Container, Tab, Tabs } from "@mui/material";
import BoxComponent from "../Common/BoxComponent";

const AuthForm: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Container maxWidth="xs">
            <BoxComponent>
                <Tabs value={currentTab} onChange={handleTabChange} centered>
                    <Tab label="Returning User" />
                    <Tab label="New User" />
                </Tabs>
                { currentTab === 0 ? <LoginForm /> : <SignupForm /> }
            </BoxComponent>
        </Container>
    );
};

export default AuthForm;
