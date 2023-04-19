import React, { Component } from "react";
import QrReader from "react-qr-scanner";
import { toast } from "react-toastify";
import { fetchProduct } from "../services/retrieveProduct";
import { decrypt } from "../utils/encrypt";
import { displayProduct } from "../utils/product";

class ScanProduct extends Component {
    state = {
        product: {},
        status: {},
        scanning: false,
        exist: true,
    };

    scanned = true;
    handleScan = (data) => {
        if (this.scanned && this.state.scanning) {
            if (data && data !== "") {
                this.restructureData(data.text);
                this.setState({ scanning: false });
                this.scanned = false;
            }
        }
    };

    restructureData = async (code) => {
        const productData = await fetchProduct(code);
        if (!productData) return false;

        if (productData[0].length === 0) {
            this.setState({ exist: false });
            return false;
        }

        const data = productData[0];
        const details = JSON.parse(decrypt(data[3]));
        const product = {
            code: data[0],
            mfdId: data[1],
            date: data[2],
            ...details,
        };

        this.setState({
            product,
            exist: true,
            status: { [data[0]]: productData[1] },
        });
    };

    handleError = async () => {
        const permission = await navigator.permissions.query({
            name: "camera",
        });
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .catch(() => toast.error("Camera not found"));
        if (permission.state === "denied")
            toast.error("Camera permission required");
    };

    handleClick = () => {
        this.scanned = true;
        this.setState({
            scanning: true,
            exist: true,
            product: {},
            status: {},
        });
    };

    handleCancel = () => {
        this.setState({ scanning: false });
    };

    render() {
        const { scanning, product, status, exist } = this.state;
        return (
            <div className="wrapper">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wizard">
                        <div className="text-center">
                            {scanning ? (
                                <React.Fragment>
                                    <QrReader
                                        delay={1000}
                                        style={{
                                            height: "20rem",
                                            width: "20rem",
                                            objectFit: "cover",
                                        }}
                                        onScan={this.handleScan}
                                        onError={this.handleError}
                                    />
                                    <div className="form-footer">
                                        <button onClick={this.handleCancel}>
                                            Cancel
                                        </button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div className="form-footer">
                                    <button onClick={this.handleClick}>
                                        Scan
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="form-content">
                            {Object.keys(product).length > 0 ? (
                                displayProduct(product, status)
                            ) : !exist ? (
                                <div className="form-header">
                                    product does not exist
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ScanProduct;
