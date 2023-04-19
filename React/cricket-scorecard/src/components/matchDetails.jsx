import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./navbar";
import Scorecard from "./scorecard";
import Statistics from "./statistics";

class MatchDetails extends Component {
    state = {
        active: "",
    };

    componentDidMount() {
        const active = this.props.location.pathname.includes("scorecard");
        this.setState({ active: active ? "scorecard" : "statistics" });
    }

    handleSelect = (item) => {
        this.setState({ active: item });
    };

    render() {
        const matchId = this.props.match.params.id;
        return (
            <div>
                <Navbar
                    matchId={matchId}
                    selectedItem={this.state.active}
                    onItemSelect={this.handleSelect}
                />
                <div>
                    <Switch>
                        <Route
                            path={`/match-details/:id/scorecard`}
                            render={(props) => (
                                <Scorecard
                                    series={this.props.series}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            path={`/match-details/:id/statistics`}
                            render={(props) => (
                                <Statistics
                                    series={this.props.series}
                                    {...props}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default MatchDetails;
