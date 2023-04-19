import getContract from "./getContract";
import { checkNetwork, decrypt } from "../utils/encrypt";
import { Loading } from "../components/common/loadingScreen";
import { catchError } from "./common";

export default async function fetchAllProduct(manufacturerId) {
    const isOnline = checkNetwork();
    if (!isOnline) return false;

    const contract = getContract("product");

    Loading();
    const response = await callContract(contract, manufacturerId);
    Loading();

    return response;
}

function callContract(contract, data, type = false) {
    try {
        if (type) {
            const decryptedCode = decrypt(data);
            return contract.getProduct(decryptedCode);
        }

        return contract.getAllProduct(data);
        //
    } catch (error) {
        return catchError(error);
    }
}

export async function fetchProduct(code) {
    const isOnline = checkNetwork();
    if (!isOnline) return false;

    const contract = getContract("product");

    Loading();
    const response = await callContract(contract, code, true);
    Loading();

    return response;
}
