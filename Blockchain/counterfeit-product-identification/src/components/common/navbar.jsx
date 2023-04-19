import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./logout";

const Navbar = ({ items }) => {
    return (
        <nav className="navbar sticky-top">
            <div className="navbar-nav flex-row">
                {items
                    ? items.map((item) => (
                          <NavLink
                              key={item.label}
                              className="nav-link"
                              to={item.path}>
                              {item.label}
                          </NavLink>
                      ))
                    : ""}
            </div>
            <Logout />
        </nav>
    );
};

export default Navbar;
