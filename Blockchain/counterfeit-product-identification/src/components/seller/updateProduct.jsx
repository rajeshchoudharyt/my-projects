import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import updateProduct from "../../services/updateProductStatus";

class Updateproduct extends Form {
    state = {
        data: {
            code: "",
            status: "",
            sellerId: "",
        },
        errors: {},
    };

    schema = {
        code: Joi.string()
            .alphanum()
            .required()
            .min(6)
            .max(20)
            .label("Product Code"),
        status: Joi.string().required().label("Update Status"),
        sellerId: Joi.string().required(),
    };

    componentDidMount() {
        const sellerId = this.getSellerId();
        const data = { ...this.state.data };
        data.sellerId = sellerId;
        this.setState({ data });
    }

    getSellerId = () => {
        return localStorage.getItem("sellerId") || "";
    };

    doSubmit = async () => {
        const isValid = await updateProduct(this.state.data);
        if (!isValid) return;

        const sellerId = this.getSellerId();
        const data = {
            code: "",
            status: "",
            sellerId,
        };
        this.setState({ data });
    };

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div className="wizard">
                        <div className="form-header">update product</div>
                        <div className="form-content">
                            {this.renderInput("code", "Product Code")}
                            {this.renderSelect("status", "Update Status", [
                                { label: "Received", id: "Received" },
                                { label: "OnSale", id: "OnSale" },
                                { label: "Sold", id: "Sold" },
                            ])}
                            {this.renderInput(
                                "sellerId",
                                "Seller Id",
                                "",
                                true
                            )}
                        </div>
                        <div className="form-footer">
                            {this.renderButton("Update")}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Updateproduct;
