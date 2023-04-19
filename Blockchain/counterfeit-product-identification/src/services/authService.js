import getContract from "./getContract";
import { decrypt, toBytes } from "../utils/encrypt";
import { toast } from "react-toastify";
import { Loading } from "../components/common/loadingScreen";
import { catchError } from "./common";

export default async function authenticateUser(username, password, usertype) {
    const contract = getContract(usertype);

    Loading();
    const encryptedPassword = await callContract(username, usertype, contract);
    Loading();

    if (!encryptedPassword) return false;
    return validatePassword(password, encryptedPassword);
}

function callContract(username, usertype, contract) {
    const usernameBytes = toBytes(username);

    try {
        if (usertype === "admin")
            return contract.authenticateAdmin(usernameBytes);

        if (usertype === "manufacturer")
            return contract.authenticateManufacturer(usernameBytes);

        if (usertype === "seller")
            return contract.authenticateSeller(usernameBytes);

        if (usertype === "customer")
            return contract.authenticateCustomer(usernameBytes);
        //
    } catch (error) {
        return catchError(error);
    }
}

function validatePassword(password, encryptedPassword) {
    if (encryptedPassword === "Invalid username") {
        toast.error(encryptedPassword);
        return false;
    }

    const decryptedPassword = decrypt(encryptedPassword);
    if (decryptedPassword !== password) {
        toast.error("Wrong password");
        return false;
    }

    return true;
}
