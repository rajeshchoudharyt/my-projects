import React from "react";
import NavBar from "./components/navBar";
import OneNote from "./components/oneNote";
import "./App.css";

function App() {
    return (
        <React.Fragment>
            <NavBar />
            <OneNote />
        </React.Fragment>
    );
}

export default App;
