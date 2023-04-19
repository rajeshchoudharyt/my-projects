import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import validateUser from "../../services/validateUser";
import registerUser from "../../services/registerUser";

class AddAdmin extends Form {
    state = {
        data: {
            username: "",
            password: "",
            usertype: "admin",
        },
        errors: {},
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
        usertype: Joi.string().required(),
    };

    doSubmit = async () => {
        const { username, usertype } = this.state.data;
        const userData = this.state.data;

        const data = { username: "", password: "", usertype: "admin" };
        this.setState({ data });

        const isValid = await validateUser(username, usertype);
        if (!isValid) return;

        await registerUser(userData);
    };

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div className="wizard">
                        <div className="form-header">register new admin</div>
                        <div className="form-content">
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

export default AddAdmin;
