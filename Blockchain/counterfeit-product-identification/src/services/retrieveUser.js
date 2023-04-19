import getContract from "./getContract";
import { checkNetwork, toBytes } from "../utils/encrypt";
import { toast } from "react-toastify";
import { catchError } from "./common";
import { Loading } from "../components/common/loadingScreen";

const manufacturer = "manufacturer";
const seller = "seller";

export async function getUser(usertype) {
    const isOnline = checkNetwork();
    if (!isOnline) return false;

    const username = localStorage.getItem("username");
    if (!username) return false;

    const contract = getContract(usertype);

    const responseData = await callContract(contract, username, usertype);

    if (responseData.length === 0) {
        toast.warn("Failed to fetch " + usertype + " ID");
        return false;
    }

    if (usertype === manufacturer) {
        localStorage.setItem("mfdName", responseData[0]);
        localStorage.setItem("mfdId", responseData[1]);
    } else {
        localStorage.setItem("sellerName", responseData[0]);
        localStorage.setItem("sellerId", responseData[2]);
    }

    return responseData;
}

function callContract(contract, username, usertype) {
    const usernameBytes = toBytes(username);

    try {
        if (usertype === manufacturer)
            return contract.getManufacturer(usernameBytes);

        if (usertype === seller) return contract.getSeller(usernameBytes);
        //
    } catch (error) {
        console.log(error);
        toast.warn("Something went wrong");
        return false;
    }
}

export async function fetchAllSeller(mfdId) {
    const isOnline = checkNetwork();
    if (!isOnline) return false;

    const contract = getContract(manufacturer);

    Loading();
    const responseData = await callContract_1(contract, mfdId);
    Loading();

    return responseData;
}

function callContract_1(contract, mfdId) {
    try {
        return contract.getAllSeller(mfdId);
        //
    } catch (error) {
        return catchError(error);
    }
}
