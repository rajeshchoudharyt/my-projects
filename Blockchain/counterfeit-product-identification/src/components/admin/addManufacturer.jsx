import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import validateUser from "../../services/validateUser";
import registerUser from "../../services/registerUser";

class AddManufacturer extends Form {
    state = {
        data: {
            name: "",
            username: "",
            password: "",
            manufacturerId: "",
            usertype: "manufacturer",
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
            .label("Manufacturer Name"),
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
        manufacturerId: Joi.string().required(),
        usertype: Joi.string().required(),
    };

    componentDidMount() {
        const manufacturerId = "MF" + Math.floor(Math.random() * 10 ** 10);
        const data = { ...this.state.data };
        data.manufacturerId = manufacturerId;
        this.setState({ data });
    }

    doSubmit = async () => {
        const { username, usertype } = this.state.data;
        const userData = this.state.data;

        const data = {
            name: "",
            username: "",
            password: "",
            manufacturerId: "",
            usertype: "manufacturer",
        };
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
                        <div className="form-header">register manufacturer</div>
                        <div className="form-content">
                            {this.renderInput("name", "Manufacturer Name")}
                            {this.renderInput("username", "Create Username")}
                            {this.renderInput(
                                "password",
                                "Create Password",
                                "password"
                            )}
                            {this.renderInput(
                                "manufacturerId",
                                "Manufacturer Id",
                                "",
                                true
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

export default AddManufacturer;
