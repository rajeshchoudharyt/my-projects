import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../common/navbar";
import ViewProduct from "./viewProduct";
import NewProduct from "./newProduct";
import AddSeller from "./addSeller";
import ViewSeller from "./viewSeller";
import { getUser } from "../../services/retrieveUser";

class Manufacturer extends Component {
    state = {
        data: {
            name: "",
            manufacturerId: "",
            date: "",
            usertype: "manufacturer",
        },
    };

    navbarItems = [
        { label: "View Product", path: "/manufacturer/products" },
        { label: "Add Product", path: "/manufacturer/addProduct" },
        { label: "View Seller", path: "/manufacturer/viewSeller" },
        { label: "Add Seller", path: "/manufacturer/addSeller" },
    ];

    componentDidMount() {
        const name = localStorage.getItem("mfdName") || "";
        const manufacturerId = localStorage.getItem("mfdId") || "";

        if (name && manufacturerId) {
            const data = {
                name,
                manufacturerId,
                date: "",
                usertype: "manufacturer",
            };
            this.setState({ data });
            return;
        }

        this.getManufacturer();
    }

    getManufacturer = async () => {
        const { usertype } = this.state.data;

        const responseData = await getUser(usertype);
        if (!responseData) return;

        const data = {
            name: responseData[0],
            manufacturerId: responseData[1],
            date: responseData[2],
            usertype: "manufacturer",
        };

        this.setState({ data });
    };

    render() {
        return (
            <React.Fragment>
                <Navbar items={this.navbarItems} />
                <Switch>
                    <Route
                        path="/manufacturer/products"
                        component={ViewProduct}
                    />
                    <Route
                        path="/manufacturer/addProduct"
                        component={NewProduct}
                    />
                    <Route
                        path="/manufacturer/addSeller"
                        component={AddSeller}
                    />
                    <Route
                        path="/manufacturer/viewSeller"
                        component={ViewSeller}
                    />
                    <Redirect
                        from="/manufacturer"
                        to="/manufacturer/products"
                    />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Manufacturer;
