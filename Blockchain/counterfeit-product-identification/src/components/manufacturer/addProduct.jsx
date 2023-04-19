import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import verifyProduct from "../../services/verifyProduct";
import registerProduct from "../../services/registerProduct";
import GenerateQR from "../common/generateQR";
import { encrypt } from "../../utils/encrypt";

class AddProduct extends Form {
    state = {
        data: {
            category: "",
            code: "",
            name: "",
            manufacturedBy: "",
            manufactureDate: "",
            manufacturerId: "",
        },
        errors: {},
        successful: false,
    };

    schema = {
        category: Joi.string().required().label("Product Category"),
        code: Joi.string()
            .required()
            .alphanum()
            .min(6)
            .max(20)
            .label("Product Code"),
        name: Joi.string()
            .required()
            .min(3)
            .max(50)
            .regex(this.namePattern)
            .options(this.options)
            .label("Product Name"),
        manufacturedBy: Joi.string().required(),
        manufactureDate: Joi.string().required().label("Manufacture Date"),
        manufacturerId: Joi.string().required(),
    };

    componentDidMount() {
        const { name, manufacturerId } = this.getManufacturer();
        const data = { ...this.state.data };
        data.manufacturedBy = name;
        data.manufacturerId = manufacturerId;
        this.setState({ data });
    }

    getManufacturer = () => {
        const name = localStorage.getItem("mfdName") || "";
        const manufacturerId = localStorage.getItem("mfdId") || "";
        return { name, manufacturerId };
    };

    doSubmit = async () => {
        const { code } = this.state.data;
        const userData = this.state.data;
        const { name: manufacturedBy, manufacturerId } = this.getManufacturer();

        const data = {
            category: "",
            code: "",
            name: "",
            manufacturedBy,
            manufactureDate: "",
            manufacturerId,
        };

        this.setState({ data });

        const isValid = await verifyProduct(code);
        if (!isValid) return;

        const successful = await registerProduct(userData);
        if (successful) {
            const encryptedQR = encrypt(userData.code);
            this.props.QRValue(encryptedQR);
        }
    };

    render() {
        const { code } = this.state.data;
        const { successful } = this.state;

        return (
            <div className="wrapper">
                {successful ? (
                    <GenerateQR value={code} />
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <div className="wizard">
                            <div className="form-header">add product</div>
                            <div className="form-content">
                                {this.renderSelect(
                                    "category",
                                    "Product Category",
                                    [
                                        { label: "Footwear", id: "Footwear" },
                                        { label: "Clothing", id: "Clothing" },
                                        {
                                            label: "Electronics",
                                            id: "Electronics",
                                        },
                                    ]
                                )}

                                {this.renderInput("code", "Product Code")}
                                {this.renderInput("name", "Product Name")}
                                {this.renderInput(
                                    "manufacturedBy",
                                    "Manufactured By",
                                    "",
                                    true
                                )}
                                {this.renderInput(
                                    "manufactureDate",
                                    "Manufacture Date",
                                    "date"
                                )}
                                {this.renderInput(
                                    "manufacturerId",
                                    "Manufacturer Id",
                                    "",
                                    true
                                )}
                            </div>
                            <div className="form-footer">
                                {this.renderButton("Add Product")}
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default AddProduct;
