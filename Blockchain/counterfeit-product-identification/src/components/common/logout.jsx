import React from "react";

const Logout = () => {
    function handleLogout() {
        localStorage.removeItem("usertype");
        localStorage.removeItem("username");
        localStorage.removeItem("mfdName");
        localStorage.removeItem("sellerName");
        localStorage.removeItem("mfdId");
        localStorage.removeItem("sellerId");
        window.location.replace("/");
    }

    return (
        <button className="logoutBtn" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
