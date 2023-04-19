import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { decrypt } from "../../utils/encrypt";

const GenerateQR = ({ value, afterClick }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center wizard">
            <QRCodeCanvas id="QR-Code" value={value} size="250" />
            <div className="form-footer">
                <button
                    style={{ margin: "1.5rem auto 0" }}
                    onClick={() => handleClick(value, afterClick)}>
                    Download
                </button>
            </div>
        </div>
    );
};

const handleClick = (value, afterClick) => {
    const canvas = document.getElementById("QR-Code");
    const element = document.createElement("a");
    element.href = canvas.toDataURL();
    const decryptedValue = decrypt(value);
    element.download = `${decryptedValue}.png`;
    element.click();
    afterClick();
};

export default GenerateQR;
