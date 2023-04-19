import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
    state = { data: {}, options: {}, totalScore: 0 };
    constructor(props) {
        super(props);
        const score = this.data();
        const sum = () => {
            let sum = 0;
            for (let runs of score) sum += runs;
            return sum;
        };

        const maxRuns = () => {
            const max = Math.max(...score);
            let arr = [];
            for (let i of score) i === max ? arr.push(40) : arr.push(0);
            return arr;
        };

        ChartJS.register(ArcElement, Tooltip, Legend);
        this.state.data = {
            labels: this.labels(),
            datasets: [
                {
                    data: score,
                    backgroundColor: this.getColors(),
                    tooltip: {
                        callbacks: {
                            label: (value) =>
                                ` ${value.parsed} runs (${(
                                    (value.parsed / sum()) *
                                    100
                                ).toFixed(2)}%)`,
                        },
                    },
                    borderWidth: 1,
                    offset: maxRuns(),
                    hoverOffset: 25,
                },
            ],
        };
        this.state.options = {
            plugins: {
                legend: {
                    labels: { boxWidth: 10, font: { size: 10 } },
                    position: "right",
                    align: "start",
                },
                title: {
                    display: true,
                    align: "start",
                    text: `Team ${this.props.team}`,
                    font: { size: 16, weight: "bold" },
                },
            },
        };
    }

    getColors = () => [
        "#845EC2",
        "#D65DB1",
        "#FF6F91",
        "#FF9671",
        "#FFC75F",
        "#5AB7D4",
        "#008F7A",
        "#2C73D2",
        "#00C9A7",
        "#C34A36",
        "#FFAB79",
    ];

    labels = () => {
        const { team, series, matchId } = this.props;
        const seriesPlayers = series.players[team];
        const matchData = series.matches.filter(
            (match) => match.id === matchId
        )[0];
        const playersName = [];
        for (let matchPlayer of matchData.scores[team]) {
            playersName.push(
                seriesPlayers.filter(
                    (seriesP) => seriesP.id === matchPlayer.id
                )[0].name
            );
        }
        return playersName;
    };

    data = () => {
        const { team, series, matchId } = this.props;
        const matchData = series.matches.filter(
            (match) => match.id === matchId
        )[0];
        const scores = matchData.scores[team].map(
            (playerScore) => playerScore.runs
        );
        return scores;
    };

    render() {
        return <Pie data={this.state.data} options={this.state.options} />;
    }
}

export default PieChart;
