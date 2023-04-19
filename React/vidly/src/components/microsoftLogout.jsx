import React from "react";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import auth from "../services/authService";

const MicrosoftLogout = () => {
    const { instance } = useMsal();
    const email = localStorage.getItem("email");

    function handleLogout() {
        if (!email) {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: window.location.href,
            });
            auth.logout();
        }
    }
    return (
        <NavLink className="nav-link" to="/logout" onClick={handleLogout}>
            Logout
        </NavLink>
    );
};

export default MicrosoftLogout;
