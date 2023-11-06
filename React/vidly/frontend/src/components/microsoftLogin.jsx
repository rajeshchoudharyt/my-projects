import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const MicrosoftLogin = (props) => {
    const { instance } = useMsal();

    async function handleLogin() {
        const { state } = props.location;
        await instance
            .loginPopup(loginRequest)
            .then((response) =>
                localStorage.setItem("token", response.accessToken)
            )
            .catch((ex) => console.log(ex));
        const token = localStorage.getItem("token");
        if (token) window.location = state ? state.from.pathname : "/";
    }

    return (
        <button className="btn btn-secondary" onClick={handleLogin}>
            Login using Microsoft
        </button>
    );
};

export default MicrosoftLogin;
