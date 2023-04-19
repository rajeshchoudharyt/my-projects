import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import MatchDetails from "./components/matchDetails";
import Series from "./components/series";
import seriesData from "./data/seriesData.json";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { series: {} };
    }

    componentWillMount() {
        this.setState({ series: seriesData });
    }

    render() {
        return (
            <div>
                {/* Navbar */}

                <Switch>
                    <Route
                        path="/match-details/:id"
                        render={(props) => (
                            <MatchDetails
                                series={this.state.series}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/"
                        render={(props) => (
                            <Series series={this.state.series} {...props} />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
