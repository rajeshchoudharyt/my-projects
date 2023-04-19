import getContract from "./getContract";
import { checkNetwork, toBytes } from "../utils/encrypt";
import { toast } from "react-toastify";
import { Loading } from "../components/common/loadingScreen";
import { catchError } from "./common";

export default async function validateUser(username, usertype, id = "") {
    const isOnline = checkNetwork();
    if (!isOnline) return false;

    const contract = getContract(usertype);

    Loading();
    const responseMessage = await callContract(
        contract,
        username,
        usertype,
        id
    );
    Loading();

    return validateMessage(responseMessage, usertype);
}

function validateMessage(responseMessage, usertype) {
    if (responseMessage === "Valid user") return true;
    else {
        if (responseMessage === "ID already exist")
            toast.error(usertype + " " + responseMessage);
        else toast.error(responseMessage);
        return false;
    }
}

function callContract(contract, username, usertype, id) {
    const usernameBytes = toBytes(username);

    try {
        if (usertype === "admin") return contract.validateAdmin(usernameBytes);

        if (usertype === "manufacturer")
            return contract.validateManufacturer(id, usernameBytes);

        if (usertype === "seller")
            return contract.validateSeller(id, usernameBytes);

        if (usertype === "customer")
            return contract.validateCustomer(usernameBytes);
        //
    } catch (error) {
        return catchError(error);
    }
}
