import React, { Component } from "react";
import GenerateQR from "../common/generateQR";
import AddProduct from "./addProduct";

class NewProduct extends Component {
    state = { successful: false, value: "" };

    updateQRValue = (value) => {
        const successful = true;
        this.setState({ value, successful });
    };

    handleClick = () => {
        this.setState({ successful: false });
    };

    render() {
        return (
            <div>
                {this.state.successful ? (
                    <GenerateQR
                        value={this.state.value}
                        afterClick={this.handleClick}
                    />
                ) : (
                    <AddProduct QRValue={this.updateQRValue} />
                )}
            </div>
        );
    }
}

export default NewProduct;
