import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../common/navbar";
import UpdateProduct from "./updateProduct";
import ScanProduct from "../scanProduct";
import { getUser } from "../../services/retrieveUser";

class Seller extends Component {
    state = {
        data: {
            name: "",
            manufacturerId: "",
            sellerId: "",
            date: "",
            usertype: "seller",
        },
    };

    navbarItems = [
        { label: "Scan Product", path: "/seller/scanProduct" },
        { label: "Update Product", path: "/seller/updateProduct" },
    ];

    componentDidMount() {
        const name = localStorage.getItem("sellerName") || "";
        const sellerId = localStorage.getItem("sellerId") || "";

        if (sellerId && name) {
            const data = {
                name,
                manufacturerId: "",
                sellerId,
                date: "",
                usertype: "seller",
            };
            this.setState({ data });
            return;
        }

        this.getSeller();
    }

    getSeller = async () => {
        const { usertype } = this.state.data;

        const responseData = await getUser(usertype);
        if (!responseData) return;

        const data = {
            name: responseData[0],
            manufacturerId: responseData[1],
            sellerId: responseData[2],
            date: responseData[3],
            usertype: "seller",
        };

        this.setState({ data });
    };

    render() {
        return (
            <React.Fragment>
                <Navbar items={this.navbarItems} />
                <Switch>
                    <Route
                        path="/seller/updateProduct"
                        component={UpdateProduct}
                    />
                    <Route path="/seller/scanProduct" component={ScanProduct} />
                    <Redirect from="/seller" to="/seller/scanProduct" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Seller;
