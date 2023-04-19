import React from "react";
import { useState } from "react";
import "./loadingScreen.css";

let load;
const LoadingScreen = () => {
    const [loading, setLoading] = useState(false);

    load = function load() {
        setLoading(!loading);
    };

    return (
        <div className="loading-screen">
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export function Loading() {
    load();
}

export default LoadingScreen;
