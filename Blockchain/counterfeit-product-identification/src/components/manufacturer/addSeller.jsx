import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import validateUser from "../../services/validateUser";
import registerUser from "../../services/registerUser";

class AddSeller extends Form {
    state = {
        data: {
            name: "",
            manufacturerId: "",
            username: "",
            password: "",
            sellerId: "",
            usertype: "seller",
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
        manufacturerId: Joi.string().required(),
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
        sellerId: Joi.string().required(),
        usertype: Joi.string().required(),
    };

    generateSellerId = () => {
        return `SL${Math.floor(Math.random() * 10 ** 10)}`;
    };

    getManufacturerId = () => {
        return localStorage.getItem("mfdId") || "";
    };

    componentDidMount() {
        const sellerId = this.generateSellerId();
        const data = { ...this.state.data };
        const manufacturerId = this.getManufacturerId();
        data.sellerId = sellerId;
        data.manufacturerId = manufacturerId;

        this.setState({ data });
    }

    doSubmit = async () => {
        const { username, usertype } = this.state.data;
        const userData = this.state.data;

        const data = {
            name: "",
            manufacturerId: this.getManufacturerId(),
            username: "",
            password: "",
            sellerId: this.generateSellerId(),
            usertype: "seller",
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
                        <div className="form-header">register new seller</div>
                        <div className="form-content">
                            {this.renderInput("name", "Seller Name")}
                            {this.renderInput(
                                "manufacturerId",
                                "Manufacturer ID",
                                "",
                                true
                            )}
                            {this.renderInput("username", "Create Username")}
                            {this.renderInput(
                                "password",
                                "Create Password",
                                "password"
                            )}
                            {this.renderInput(
                                "sellerId",
                                "Seller ID",
                                "",
                                true
                            )}
                        </div>
                        <div className="form-footer">
                            {this.renderButton("Add Seller")}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddSeller;
