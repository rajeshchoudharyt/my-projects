import React from "react";
import { useMsal } from "@azure/msal-react";

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/",
            });
            localStorage.removeItem("token");
        }
    };

    return (
        <button
            className="btn bg-secondary"
            onClick={() => handleLogout("popup")}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
