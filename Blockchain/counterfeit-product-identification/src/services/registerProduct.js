import getContract from "./getContract";
import { encrypt } from "../utils/encrypt";
import { catchError, validateTransaction } from "./common";
import { Loading } from "../components/common/loadingScreen";

export default async function registerProduct(data) {
    const contract = getContract("product");

    // Loading();
    const transaction = await callContract(contract, data);
    const isValid = await validateTransaction(transaction);
    Loading();

    return isValid;
}

function encryptProduct(data) {
    const { category, name, manufacturedBy, manufactureDate } = data;
    const details = JSON.stringify({
        category,
        name,
        manufacturedBy,
        manufactureDate
    });

    return encrypt(details);
}

function callContract(contract, data) {
    const { code, manufacturerId } = data;
    const date = new Date().toUTCString();
    const encryptedProduct = encryptProduct(data);

    try {
        return contract.addProduct(
            code,
            manufacturerId,
            date,
            encryptedProduct
        );
        //
    } catch (error) {
        return catchError(error);
    }
}
