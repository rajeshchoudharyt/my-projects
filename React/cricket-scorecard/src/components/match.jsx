import React, { Component } from "react";
import Flag from "./common/flag";
import "../App.css";

class Match extends Component {
    calculateTotalScore = (team) => {
        const { matchData } = this.props;
        let totalScore = 0;
        const score = matchData.scores[team];
        for (let run of score) totalScore += run.runs;
        totalScore += matchData.extras[team];

        return totalScore;
    };

    calculateTotalWicket = (team) => {
        let wickets = 0;
        const score = this.props.matchData.scores[team];
        for (let run of score) if (!run.notOut) wickets++;

        return wickets;
    };

    getScore = (team) => {
        const score = this.calculateTotalScore(team);
        const wicket = this.calculateTotalWicket(team);
        return wicket === 10 ? score : score + "/" + wicket;
    };

    calculateWinner = () => {
        const totalScore = ["IND", "SL"].map((team) =>
            this.calculateTotalScore(team)
        );
        const winner = totalScore[0] - totalScore[1];
        let winnerTeam = "";
        if (winner > 0) winnerTeam = `India won by ${winner} runs`;
        else if (winner < 0)
            winnerTeam = `Sri Lanka won by ${Math.abs(winner)} runs`;
        else winnerTeam = "Match Draw";

        return winnerTeam;
    };

    handleClick = (matchId) => {
        this.props.history.push(`/match-details/${matchId}/scorecard`);
    };

    render() {
        const { matchData } = this.props;

        return (
            <div
                className="card mb-4 matchCard"
                onClick={() => this.handleClick(this.props.matchData.id)}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6>{matchData.date}</h6>
                    <p className="card-subtitle">
                        <b>{matchData.type}</b> - Match {matchData.id}
                    </p>
                </div>
                <div className="card-body hover-shadow">
                    {["IND", "SL"].map((team) => (
                        <div
                            key={team}
                            className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                                <Flag
                                    countryCode={team === "IND" ? "in" : "lk"}
                                />
                                <div className="fw-bold mx-2">{team}</div>
                            </div>
                            <div className="fw-bold">{this.getScore(team)}</div>
                        </div>
                    ))}
                    <div className="mt-2">{this.calculateWinner()}</div>
                </div>
            </div>
        );
    }
}

export default Match;
