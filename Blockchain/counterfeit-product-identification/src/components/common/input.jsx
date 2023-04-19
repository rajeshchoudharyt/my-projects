import React from "react";

const Input = ({ name, label, error, disabled, ...rest }) => {
    const styles = disabled
        ? { backgroundColor: "rgba(243, 212, 183, 0.6)" }
        : {};
    return (
        <div className="form-row">
            <label htmlFor={name}>{label}</label>
            <input
                {...rest}
                style={styles}
                name={name}
                id={name}
                disabled={disabled}
                className="form-control"
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
