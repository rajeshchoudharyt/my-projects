import getContract from "./getContract";
import { encrypt, toBytes } from "../utils/encrypt";
import { catchError, validateTransaction } from "./common";
import { Loading } from "../components/common/loadingScreen";

export default async function registerUser(data) {
    const { usertype } = data;

    const contract = getContract(usertype);

    Loading();
    const transaction = await callContract(contract, data);
    const isValid = await validateTransaction(transaction);
    Loading();

    return isValid;
}

function callContract(contract, data) {
    const { username, password, usertype } = data;

    const usernameBytes = toBytes(username);
    const encryptedPassword = encrypt(password);

    try {
        if (usertype === "admin")
            return contract.addAdmin(usernameBytes, encryptedPassword);

        const { name } = data;
        if (usertype === "customer") {
            return contract.addCustomer(name, usernameBytes, encryptedPassword);
        }

        const { manufacturerId } = data;
        const date = new Date().toUTCString();
        if (usertype === "manufacturer") {
            return contract.addManufacturer(
                name,
                usernameBytes,
                encryptedPassword,
                manufacturerId,
                date
            );
        }

        const { sellerId } = data;
        if (usertype === "seller") {
            return contract.addSeller(
                name,
                usernameBytes,
                encryptedPassword,
                manufacturerId,
                sellerId,
                date
            );
        }
        //
    } catch (error) {
        return catchError(error);
    }
}
