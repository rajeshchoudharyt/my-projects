import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance
                .loginPopup(loginRequest)
                .then((response) =>
                    localStorage.setItem("token", response.accessToken)
                )
                .catch((ex) => ex);
        }
    };

    return (
        <button
            className="btn btn-secondary"
            onClick={() => handleLogin("popup")}>
            Sign In using Microsoft
        </button>
    );
};

export default SignInButton;
