import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
    state = {};
    render() {
        return (
            <div>
                <h2>Homepage</h2>
                <Link to="/login" className="btn btn-primary my-2">
                    Register
                </Link>
            </div>
        );
    }
}

export default Homepage;
