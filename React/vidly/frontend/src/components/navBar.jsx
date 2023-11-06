import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import MicrosoftLogout from "./microsoftLogout";

const NavBar = ({ user }) => {
    const msalInstance = new PublicClientApplication(msalConfig);

    return (
        <nav className="navbar bg-light justify-content-start px-3">
            <Link className="navbar-brand" to="/">
                Vidly
            </Link>
            <div className="navbar-nav flex-row">
                <NavLink className="nav-link" to="/movies">
                    Movies
                </NavLink>
                <NavLink className="nav-link mx-2" to="/customers">
                    Customers
                </NavLink>
                <NavLink className="nav-link" to="/rentals">
                    Rentals
                </NavLink>
                {!user && (
                    <React.Fragment>
                        <NavLink className="nav-link mx-2" to="/login">
                            Login
                        </NavLink>
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                    </React.Fragment>
                )}
                {user && (
                    <React.Fragment>
                        <NavLink className="nav-link mx-2" to="/profile">
                            <b>Welcome</b>
                        </NavLink>
                        <MsalProvider instance={msalInstance}>
                            <MicrosoftLogout />
                        </MsalProvider>
                    </React.Fragment>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
