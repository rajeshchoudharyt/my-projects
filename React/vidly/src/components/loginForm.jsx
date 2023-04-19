import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import authService, { login } from "../services/authService";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import MicrosoftLogin from "./microsoftLogin";

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            const { state } = this.props.location;
            localStorage.setItem("token", "token");
            localStorage.setItem("email", data.username);
            window.location = state ? state.from.pathname : "/";
            await login(data.username, data.password);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        const msalInstance = new PublicClientApplication(msalConfig);
        if (authService.getCurrentUser()) return <Redirect to="/" />;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
                <h5>or</h5>
                <MsalProvider instance={msalInstance}>
                    <MicrosoftLogin {...this.props} />
                </MsalProvider>
            </div>
        );
    }
}

export default LoginForm;
