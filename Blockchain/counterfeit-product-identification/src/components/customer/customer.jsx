import React, { Component } from "react";
import ScanProduct from "../scanProduct";
import Navbar from "../common/navbar";

class Customer extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <ScanProduct />
            </React.Fragment>
        );
    }
}

export default Customer;
