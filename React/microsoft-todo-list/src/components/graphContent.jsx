import React, { useState } from "react";
import { callApi, loginRequest } from "../authConfig";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import PageLayout from "./pageLayout";

const GraphContent = () => {
    const [graphData, setGraphData] = useState(null);
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    async function requestGraphData() {
        if (!isAuthenticated) {
            instance
                .loginPopup(loginRequest)
                .then((response) =>
                    localStorage.setItem("token", response.accessToken)
                )
                .catch((ex) => ex);
        } else {
            const token = localStorage.getItem("token");
            callApi(token).then((response) =>
                response ? setGraphData(response.value) : null
            );
        }
    }

    return (
        <React.Fragment>
            <button className="btn btn-primary" onClick={requestGraphData}>
                View all Todo Lists
            </button>
            {isAuthenticated ? (
                <button
                    className="btn btn-info mx-2"
                    onClick={requestGraphData}>
                    Refresh
                </button>
            ) : (
                ""
            )}
            {!graphData ? (
                ""
            ) : (
                <PageLayout data={graphData} onUpdate={requestGraphData} />
            )}
        </React.Fragment>
    );
};

export default GraphContent;
