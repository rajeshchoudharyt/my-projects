import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notfound";
import Login from "./components/login";
import Register from "./components/customerRegisteration";
import Manufacturer from "./components/manufacturer/manufacturer";
import Seller from "./components/seller/seller";
import Customer from "./components/customer/customer";
import Admin from "./components/admin/admin";
import LoadingScreen from "./components/common/loadingScreen";
import { decrypt } from "./utils/encrypt";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
    state = { username: "", usertype: "" };

    constructor() {
        super();
        const usertype = localStorage.getItem("usertype") || "";
        if (usertype) this.state.usertype = decrypt(usertype);
    }

    handleUser = (username, usertype) => {
        this.setState({ username, usertype });
    };

    renderRoute = () => {
        const { usertype } = this.state;

        if (usertype === "admin")
            return <Route path="/admin" component={Admin} />;

        if (usertype === "manufacturer")
            return <Route path="/manufacturer" component={Manufacturer} />;

        if (usertype === "seller")
            return <Route path="/seller" component={Seller} />;

        if (usertype === "customer")
            return <Route path="/customer" component={Customer} />;

        return "";
    };

    render() {
        const { usertype } = this.state;
        return (
            <React.Fragment>
                <LoadingScreen />
                <ToastContainer autoClose={2000} theme="dark" />
                <Switch>
                    {this.renderRoute()}
                    {!usertype ? (
                        <Route path="/register" component={Register} />
                    ) : (
                        ""
                    )}
                    {!usertype ? (
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login {...props} setUser={this.handleUser} />
                            )}
                        />
                    ) : (
                        ""
                    )}
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/login" />
                    <Redirect to="/not-found" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
