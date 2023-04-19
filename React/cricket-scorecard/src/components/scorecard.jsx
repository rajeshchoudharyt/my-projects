import React, { Component } from "react";

class Scorecard extends Component {
    getMatchData = () => {
        const matchData = this.props.series.matches.filter(
            (match) => match.id === parseInt(this.props.match.params.id)
        )[0];
        return matchData;
    };

    //Match function
    calculateTotalScore = (team) => {
        const matchData = this.getMatchData();
        let totalScore = 0;
        const score = matchData.scores[team];
        for (let run of score) totalScore += run.runs;
        totalScore += matchData.extras[team];

        return totalScore;
    };

    //Match function
    calculateTotalWicket = (team) => {
        let wickets = 0;
        const matchData = this.getMatchData();
        const score = matchData.scores[team];
        for (let run of score) if (!run.notOut) wickets++;

        return wickets;
    };

    //Match function
    getScore = (team) => {
        const score = this.calculateTotalScore(team);
        const wicket = this.calculateTotalWicket(team);
        return wicket === 10 ? score : score + "/" + wicket;
    };

    calculateStrikeRate = (runs, balls) => {
        return balls === 0 ? "-" : ((runs / balls) * 100).toFixed(2);
    };

    fetchPlayerName = (id, team) => {
        const { players } = this.props.series;
        for (let player of players[team]) {
            if (player.id === id) return player.name;
        }
        return "";
    };

    getOversAndRunRate = (team) => {
        const matchData = this.getMatchData();
        let str = matchData.oversPlayed[team] / 6;
        str += ` Overs (RR: ${(this.calculateTotalScore(team) / str).toFixed(
            2
        )})`;
        return str;
    };

    render() {
        const matchData = this.getMatchData();
        const { scores } = matchData;

        return (
            <div>
                {["IND", "SL"].map((team) => (
                    <div key={team}>
                        <h5>{team}</h5>
                        <table className="table table-sm table-bordered">
                            <thead className="bg-info">
                                <tr>
                                    <th>Batting</th>
                                    <th>Runs</th>
                                    <th>Balls</th>
                                    <th>Strike Rate</th>
                                </tr>
                            </thead>
                            <tbody className="bg-light">
                                {scores[team].map((player) => (
                                    <tr key={player.id}>
                                        <td>
                                            {this.fetchPlayerName(
                                                player.id,
                                                team
                                            )}
                                            {player.notOut ? "*" : ""}
                                        </td>
                                        <td>{player.runs}</td>
                                        <td>{player.balls}</td>
                                        <td className="text-end">
                                            {this.calculateStrikeRate(
                                                player.runs,
                                                player.balls
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="table-secondary">
                                    <td>Extras</td>
                                    <td colSpan="3">
                                        {matchData.extras[team]}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot className="table-info fw-bold">
                                <tr>
                                    <td>Total</td>
                                    <td>{this.getScore(team)}</td>
                                    <td colSpan="2" className="text-end">
                                        {this.getOversAndRunRate(team)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                ))}
            </div>
        );
    }
}

export default Scorecard;
