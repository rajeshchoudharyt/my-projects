import React, { Component } from "react";
import LineChart from "./lineChart";
import PieChart from "./pieChart";

class Statistics extends Component {
    render() {
        const matchId = parseInt(this.props.match.params.id);
        return (
            <div>
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "50rem",
                    }}>
                    <LineChart matchId={matchId} />
                </div>
                <h5 className="mt-4">Players Contribution - Runs Scored</h5>
                <div
                    className="row p-2"
                    style={{
                        position: "relative",
                        gap: 10,
                    }}>
                    {["IND", "SL"].map((team) => (
                        <div className="col border" key={team}>
                            <PieChart
                                matchId={matchId}
                                team={team}
                                series={this.props.series}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Statistics;
