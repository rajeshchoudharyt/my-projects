import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import validateUser from "../services/validateUser";
import registerUser from "../services/registerUser";

class Register extends Form {
    state = {
        data: {
            name: "",
            username: "",
            password: "",
            usertype: "customer",
        },
        errors: {},
    };

    schema = {
        name: Joi.string()
            .required()
            .min(3)
            .max(50)
            .trim()
            .regex(this.namePattern)
            .options(this.options)
            .label("Customer Name"),
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
        usertype: Joi.string().required(),
    };

    doSubmit = async (e) => {
        e.preventDefault();

        const { username, usertype } = this.state.data;
        const userData = this.state.data;

        const data = {
            name: "",
            username: "",
            password: "",
            usertype: "customer",
        };
        this.setState({ data });

        const isValid = await validateUser(username, usertype);
        if (!isValid) return;

        await registerUser(userData);
    };

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.doSubmit}>
                    <div className="wizard">
                        <div className="form-header">
                            Customer Registeration
                        </div>
                        <div className="form-content">
                            {this.renderInput("name", "Customer Name")}
                            {this.renderInput("username", "Create Username")}
                            {this.renderInput(
                                "password",
                                "Create Password",
                                "password"
                            )}
                        </div>
                        <div className="form-footer">
                            {this.renderButton("Register")}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
