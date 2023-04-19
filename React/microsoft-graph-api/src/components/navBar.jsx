import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import SignInButton from "./signInButton";
import SignOutButton from "./signOutButton";

const NavBar = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <nav className="navbar bg-info px-2">
            <a href="/" className="navbar-brand">
                Microsoft Graph API
            </a>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </nav>
    );
};

export default NavBar;
