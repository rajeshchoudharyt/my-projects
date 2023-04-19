import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import Navbar from "../common/navbar";
import AddAdmin from "./addAdmin";
import AddManufacturer from "./addManufacturer";

class Admin extends Component {
    state = {};

    navbarItems = [
        { label: "Add Admin", path: "/admin/addAdmin" },
        { label: "Add Manufacturer", path: "/admin/addManufacturer" },
    ];

    render() {
        return (
            <React.Fragment>
                <Navbar items={this.navbarItems} />
                <Switch>
                    <Route path="/admin/addAdmin" component={AddAdmin} />
                    <Route
                        path="/admin/addManufacturer"
                        component={AddManufacturer}
                    />
                    <Redirect from="/admin" to="/admin/addAdmin" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Admin;
