import React, { Component } from "react";
import { fetchAllSeller } from "../../services/retrieveUser";
import { handleRow } from "../../utils/product";

class ViewSeller extends Component {
    state = { sellers: [], buttonText: "View All Seller" };

    getManufacturerId = () => {
        return localStorage.getItem("mfdId") || "";
    };

    handleClick = async () => {
        const mfdId = this.getManufacturerId();
        const sellers = await fetchAllSeller(mfdId);

        this.setState({ sellers, buttonText: "Refresh" });
    };

    render() {
        const { sellers, buttonText } = this.state;

        return (
            <div className="wrapper">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wizard">
                        <div className="form-footer">
                            <button onClick={this.handleClick}>
                                {buttonText}
                            </button>
                        </div>

                        <div className="form-content">
                            {sellers.length > 0 ? (
                                sellers.map((seller) => (
                                    <div key={seller[1]} className="card">
                                        <div className="card-body">
                                            {handleRow(
                                                "Seller Name",
                                                seller[0]
                                            )}
                                            {handleRow(
                                                "Manufacturer ID",
                                                seller[1]
                                            )}
                                            {handleRow("Seller ID", seller[2])}
                                            {handleRow(
                                                "Seller Added On",
                                                seller[3]
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : buttonText === "Refresh" ? (
                                <div className="form-header">No Seller</div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ViewSeller;
