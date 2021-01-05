import React from "react";
import { render } from "react-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import SignUpForm from '../components/SignUp'

const options = {
    timeout: 5000,
    position: positions.TOP_CENTER
};


export default function SignUp() {
    return (
    <Provider template={AlertTemplate} {...options}>
        <SignUpForm/>
    </Provider>
    );
};