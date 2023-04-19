import React, { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import JSONdata from "../data/runsScoredPerOver.json";

class LineChart extends Component {
    constructor(props) {
        super(props);

        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

        this.state.options = {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Overs",
                        font: { size: 14 },
                    },
                    grid: {
                        display: true,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Run Rate",
                        font: { size: 14 },
                    },
                    grid: {
                        display: true,
                    },
                },
            },
            plugins: {
                legend: {
                    labels: { boxWidth: 10, font: { size: 10 } },
                    position: "top",
                    align: "end",
                },
                title: {
                    display: true,
                    align: "center",
                    text: "Run Rate Graph",
                    font: { size: 16, weight: "bold" },
                },
                tooltip: {
                    callbacks: {
                        title: (data) => `Over: ${data[0].label}`,
                        label: (data) =>
                            ` ${data.dataset.label}: ${Math.round(
                                data.parsed.x * data.parsed.y
                            )} (RR: ${data.parsed.y})`,
                    },
                },
            },
        };
        this.state.data = {
            labels: [...Array(21).keys()],
            datasets: [
                {
                    label: "IND",
                    data: this.graphData()[0],
                    borderColor: "#0A3CF5",
                    backgroundColor: "#0A3CF5",
                },
                {
                    label: "SL",
                    data: this.graphData()[1],
                    borderColor: "#EF1C10",
                    backgroundColor: "#EF1C10",
                },
            ],
        };
    }

    state = {
        options: {},
        data: {},
    };

    parseData = () => {
        const { matchId } = this.props;
        for (let match of JSONdata) if (match.id === matchId) return match;
        return {};
    };

    graphData = () => {
        const runsScoredPerOver = this.parseData();
        const data = ["IND", "SL"].map((team) => {
            let arr = [[0, 0]];
            let overs = 1;
            let sum = 0;
            for (let runs of runsScoredPerOver[team]) {
                sum += runs;
                arr.push([overs, (sum / overs).toFixed(2)]);
                overs++;
            }
            return arr;
        });
        return data;
    };

    render() {
        return <Line options={this.state.options} data={this.state.data} />;
    }
}

export default LineChart;
