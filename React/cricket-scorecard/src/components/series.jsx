import React, { Component } from "react";
import Match from "./match";

class Series extends Component {
    render() {
        const { series } = this.props;
        return (
            <React.Fragment>
                {series.matches.map((match) => (
                    <Match
                        key={match.id}
                        players={series.players}
                        matchData={match}
                        {...this.props}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default Series;
