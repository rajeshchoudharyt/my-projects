import React from "react";
import PropTypes from "prop-types";

const Pagination = (props) => {
    let { itemsCount, pageSize, currentPage, onPageChange } = props;
    if (typeof itemsCount !== "number") itemsCount = 0;
    if (typeof pageSize !== "number") pageSize = 0;
    if (typeof currentPage !== "number") currentPage = 0;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = [...Array(pagesCount).keys()].map((i) => i + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? "page-item active"
                                : "page-item"
                        }>
                        <a
                            href="http://"
                            className="page-link shadow-none"
                            onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
