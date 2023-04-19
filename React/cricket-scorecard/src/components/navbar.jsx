import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { matchId, selectedItem, onItemSelect } = props;
    const linkName = ["scorecard", "statistics"];

    return (
        <nav className="nav bg-light border border-0 my-4">
            <ul className="nav nav-pills fw-bold" id="navBar">
                <li>
                    <Link
                        to={`/match-details/${matchId}/scorecard`}
                        onClick={() => onItemSelect(linkName[0])}
                        className={
                            linkName[0] === selectedItem
                                ? "nav-link rounded-0 active"
                                : "nav-link rounded-0"
                        }>
                        Scorecard
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/match-details/${matchId}/statistics`}
                        onClick={() => onItemSelect(linkName[1])}
                        className={
                            linkName[1] === selectedItem
                                ? "nav-link rounded-0 active"
                                : "nav-link rounded-0"
                        }>
                        Statistics
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
