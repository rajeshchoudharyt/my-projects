import React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import authenticateUser from "../services/authService";
import { encrypt, toBytes } from "../utils/encrypt";

class Login extends Form {
    state = {
        data: {
            username: "",
            password: "",
            usertype: "",
        },
        errors: {},
        isLoading: false,
    };

    schema = {
        username: Joi.string()
            .required()
            .min(5)
            .max(50)
            .regex(this.pattern, { invert: true })
            .options(this.options)
            .label("Username"),
        password: Joi.string()
            .required()
            .min(8)
            .max(31)
            .regex(this.pattern, { invert: true })
            .options(this.options)
            .label("Password"),
        usertype: Joi.string().required().label("Login As"),
    };

    doSubmit = async (e) => {
        e.preventDefault();

        const { username, usertype, password } = this.state.data;

        const data = { username: "", password: "", usertype: "" };
        this.setState({ data });

        const isValid = await authenticateUser(username, password, usertype);
        if (!isValid) return;

        const { history, setUser } = this.props;
        localStorage.setItem("username", username);
        localStorage.setItem("usertype", encrypt(usertype));
        setUser(toBytes(username), usertype);
        history.replace(usertype);
    };

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.doSubmit}>
                    <div className="wizard">
                        <div className="form-header">LOGIN</div>
                        <div className="form-content">
                            {this.renderInput("username", "Username")}
                            {this.renderInput(
                                "password",
                                "Password",
                                "password"
                            )}
                            {this.renderSelect("usertype", "Login As", [
                                { label: "Admin", id: "admin" },
                                {
                                    label: "Manufacturer",
                                    id: "manufacturer",
                                },
                                { label: "Seller", id: "seller" },
                                { label: "Customer", id: "customer" },
                            ])}
                        </div>
                        <div className="form-footer">
                            {this.renderButton("Login")}
                            <h5>or</h5>
                            <Link className="signup" to="/register">
                                Signup
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
