import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            label: "Title",
            content: (movie) => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: (movie) => (
                <Like
                    onClick={() => this.props.onLike(movie)}
                    liked={movie.liked}
                />
            ),
        },
    ];

    deleteColumn = {
        key: "delete",
        content: (movie) => (
            <button
                className="btn btn-danger btn-sm"
                onClick={() => this.props.onDelete(movie)}>
                Delete
            </button>
        ),
    };

    constructor() {
        super();
        this.columns.push(this.deleteColumn);
    }

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return (
            <Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default MoviesTable;
