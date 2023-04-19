import React from "react";
import "@coreui/icons/css/flag.css";

const Flag = ({ countryCode }) => {
    return <i className={"cif-" + countryCode} />;
};

export default Flag;
