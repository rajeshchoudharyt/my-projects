import { Component } from "react";
import { MsalContext } from "@azure/msal-react";
import auth from "../services/authService";

class Logout extends Component {
    static contextType = MsalContext;

    componentDidMount() {
        const email = localStorage.getItem("email");
        if (email) {
            auth.logout();
            window.location = "/";
        }
    }

    render() {
        return null;
    }
}

export default Logout;
