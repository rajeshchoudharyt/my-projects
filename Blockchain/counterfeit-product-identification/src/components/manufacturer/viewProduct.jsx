import React, { Component } from "react";
import fetchAllProduct from "../../services/retrieveProduct";
import { handleRow, handleStatus } from "../../utils/product";
import { decrypt } from "../../utils/encrypt";

class ViewProduct extends Component {
    state = {
        allProduct: [],
        allStatus: {},
        buttonText: "View All Product",
    };

    getManufacturerId = () => {
        return localStorage.getItem("mfdId") || "";
    };

    handleClick = async () => {
        const manufacturerId = this.getManufacturerId();
        const productData = await fetchAllProduct(manufacturerId);

        const { allProduct, allStatus } = this.restructureData(productData);
        this.setState({ allProduct, allStatus, buttonText: "Refresh" });
    };

    restructureData = (productData) => {
        let allProduct = [];
        if (!productData || productData[0].length === 0) return {};
        let productCodes = [];
        allProduct = productData[0].map((productDetails) => {
            const data = JSON.parse(decrypt(productDetails[3]));
            const product = { ...data };

            product.code = productDetails[0];
            product.manufacturerId = productDetails[1];
            product.date = productDetails[2];

            productCodes.push(product.code);
            return product;
        });

        const status = productData[1];
        let allStatus = {};
        for (let i = 0; i < productCodes.length; i++) {
            allStatus[productCodes[i]] = status[i];
        }

        return { allProduct, allStatus };
    };

    render() {
        const { allProduct, buttonText, allStatus } = this.state;
        return (
            <div className="wrapper">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wizard">
                        <div className="form-footer">
                            <button onClick={this.handleClick}>
                                {buttonText}
                            </button>
                        </div>

                        <div className="form-content">
                            {allProduct ? (
                                allProduct.map((product) => (
                                    <div key={product.code} className="card">
                                        <h6 className="card-header">
                                            {handleRow(
                                                "Product Code",
                                                product.code
                                            )}
                                        </h6>

                                        <div className="card-body">
                                            {handleRow(
                                                "Category",
                                                product.category
                                            )}
                                            {handleRow("Name", product.name)}
                                            {handleRow(
                                                "Manufactured By",
                                                product.manufacturedBy
                                            )}
                                            {handleRow(
                                                "Manufacture Date",
                                                product.manufactureDate
                                            )}
                                            {handleRow(
                                                "Product Added On",
                                                product.date
                                            )}

                                            {handleStatus(
                                                product.code,
                                                allStatus
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="form-header">No product</div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ViewProduct;
